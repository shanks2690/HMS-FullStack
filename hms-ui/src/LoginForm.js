import {  useState } from 'react';
import InputField from './InputField';
import InputPwd from './InputPwd';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginForm.css';
import {LoginCall } from './Networking/APIs';
import {  useNavigate } from 'react-router-dom';
import { PATHS } from './Helpers/Paths';
const LoginForm =  ()=> {
    const [userName,setUserName] = useState('');
    const [pwd,setPwd] = useState('');
    const navigate = useNavigate();
    const handleClick = async ()=>{
        const payload = { email: userName, password: pwd };
       const resp = await LoginCall(payload);
       let role = null;
       let token = null;
    
       if(resp.ok)
        {
            const response = await resp.json();
            role  = response.role;
            token = response.token;
            console.log(response);

        }
    
        
        
        if(role==='ADMIN')
            navigate(PATHS.ADMIN_PATH);
        if(role==='DOCTOR')
            navigate(PATHS.DOCTOR_PATH);
        sessionStorage.setItem('jwt',token);   
        sessionStorage.setItem('role',role);   
        sessionStorage.setItem('user',userName);
    };
    return ( 
        <div className='row loginform'>
            <div className="login-title">
            <h2>Please Enter your credentials to login</h2>
            </div>
        <div className="col-sm-12">
        <InputField setUserName={setUserName}/>
         </div> 
                <br />
                <br />
                <br />
         <div className="col-sm-12">
        <InputPwd setPwd={setPwd}/>
         </div> 
                <br />
                <br />
                <br />
    <div className="login-button">
      <Button 
        variant="outline-primary"
        onClick={()=>{handleClick()}}
        >
             Login
     </Button>
    </div>
</div>
     );
   

}

export default LoginForm;