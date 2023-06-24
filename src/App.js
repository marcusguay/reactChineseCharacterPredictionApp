import Canvas from "./Canvas";
import './App.css'
import { Component, useRef } from "react";
import CustomPanel from "./CustomPanel"
import Panel from "./CustomPanel";
import React from 'react'
import ReactDOM from 'react-dom'
import * as tf from '@tensorflow/tfjs';
import { Color } from "paper/dist/paper-core";
import { Container } from "@mui/material";




var model = null;
var charArray = null;
var pArray = [];







 class MyApp extends Component{

 constructor(props){
  super(props);
  this.state = {
     panelArray : [],
  }

this.loadModel();

 }

  childRef= React.createRef();


  componentDidMount() {
    
  }





async loadModel(){


  const response = await fetch('/GetCharData');
  const json = await response.json();
  charArray = json['array'];


  if(!model) 
    model = await tf.loadLayersModel('model.json');
  }


 sendData(){
  this.setState({panelArray : Array},() => {
    console.log("in thing" + pArray);
    this.childRef.current.setData(pArray);
   })
 }


 async ServerRequest(file){
  
    if(model){
     const tensor = tf.browser.fromPixels (file, 1).expandDims();
     var predictions = model.predict(tensor);
     predictions = predictions.reshape([7186]);
     var array = predictions.dataSync();
      var i = 0;
      var map = {}
      pArray = [];

      array.forEach(element => {
        map[element] = i;
        i++;
      });
    
      array = array.sort(((a,b)=>b-a));
      array = array.slice(0,5);
      array = array.map((i) => {
        return map[i];
      });

          var int = 0
      array.forEach( async element =>{
        const character = charArray[element];
        console.log(character);
        const response = await fetch('/CharSearch?char='.concat(character));
        const str = await response.json();
        str.push(character);
        pArray.push(str);
        console.log(str);
        
        if(int == 4){
          this.sendData();
        }
         int++;
      })
     

    
    

    } else {
      console.error("model not loaded");
   }
 }



  render(){
   

   return ( 
   <div className= "MyApp" style={{ display: "flex", backgroundColor: "#444444"}}> 
   <Container  > <Canvas props = {this.ServerRequest.bind(this)} 
    > </Canvas> </Container>
   <CustomPanel ref={this.childRef} props={pArray} />
   

   </div>);
  }



}


export default MyApp;