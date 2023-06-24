import React, { useEffect, useState, forwardRef,useImperativeHandle} from "react";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { Style } from "paper/dist/paper-core";
import Canvas from "./Canvas";





const styles = {
  container: {
    backgroundColor: "#444444",
    width: "100%",
    height: "100%",
    textAlign:"center",
    padding: "50px",
  }
}

const CustomPanel = forwardRef(({props},ref)=>{

  const [textData,setTextData] = useState("Lmfao");
  var array = props;
   
   useImperativeHandle(ref, () => ({
     setData: (k) => {
       setTextData(props);
     }
  }));

 const ExtractInfo = (info) =>{


  if(info.length === 2){
    return (<CardContent> 
      <Typography variant="h3"> {info[1]}  </Typography>
      <Typography> {info[0]}  </Typography>
       </CardContent>);
       }

  


  
   return (<CardContent> 
  <Typography variant="h3"> {info[2]}  </Typography>
  <Typography> {"Pinyin : " + info[0]}  </Typography>
  <Typography>{info[1]} </Typography>
   </CardContent>);
   }
   
   
   const GetTextChildren =(props) =>{
       
     var array = props;
     console.log(props);
     
     array = array.map((element) =>{

      return <li> <Card> {ExtractInfo(element)} </Card> </li>
     })
     
      return (<ul> {array}</ul>);
   }

        
   console.log({props});
   console.log("child component rendered" + array[0]);
return (<Container style = {styles.container}>  
<Typography variant="h2" color={"white"}> Predictions: </Typography>
{GetTextChildren(props)}


 </Container>)
 

 
 });







export default CustomPanel;