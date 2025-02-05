import React from 'react';
import { Link } from 'react-router-dom';
import { Card,CardContent,Button} from './ui-card/card,button';

function Signupredirect() {
    return (
       <>
      <Card>
       <CardContent>
        <h3 style={{textAlign:'center',color:'black',fontWeight:"bold",marginTop:"100px"}}>We've sent a confirmation link to your email!</h3>

       <div> 
        
        
        <input type="text" 


        style={{


    height: '51px',
    border: '1px solid salmon',
    borderRadius: '8px',
    marginLeft: '470px',
    marginTop: '55px',
    marginBottom: '35px',
    width:"300px"

    
    }} />
    </div>
        </CardContent> 
       <Link to="/email/verify/"><Button 
       className="button-verified"

       >Resend link</Button></Link>
        
        </Card> 
       
       
       
       
       </>    );
}

export default Signupredirect;