import React from 'react';
import { Link } from 'react-router-dom';
import { Card,CardContent,Button} from './ui-card/card,button';

function Signupredirect() {
    return (
       <>
       
      <Card>
       <CardContent>
        <h3 style={{textAlign:'center',color:'black',fontWeight:"bold"}}>A verification email has been sent to your gmail!!</h3>
        
        </CardContent> 
       <Link to="/emailverified"><Button 
       className="button-verified"

       >Email verified</Button></Link>
        
        </Card> 
       
       
       
       
       </>    );
}

export default Signupredirect;