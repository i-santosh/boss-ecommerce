import React from 'react';
import { Card,CardContent,Button } from './ui-card/card-button';
import { Link } from 'react-router-dom';

function Emailverified(props) {
    return (
        <>
        
      <Card>
<CardContent>

<div  style={{textAlign:'center',color:'black',fontWeight:"bold"}}><h1
style={{marginTop:"200px"}}>
    
Your email has been verified succesfully or Invalid or expired link.<Link to="/signup" style={{color:'salmon'}}>Try again</Link>
    </h1></div>


</CardContent>


        
      </Card>
        
        </>
    );
}

export default Emailverified;