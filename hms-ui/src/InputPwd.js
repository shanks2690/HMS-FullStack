import { Input } from "antd";

const InputPwd = ({setPwd})=> {

  const  handlePwdChange = (event)=> {
     setPwd(event.target.value);
  };
  
    return ( 
   <Input.Password 
   addonBefore ="Password" 
   placeholder="Enter Password" 
   style={{ marginBottom: 10 }} 
   onChange={(event)=>handlePwdChange(event)}
   />
     );


}

export default InputPwd;