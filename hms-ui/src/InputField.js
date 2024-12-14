import { Input } from "antd";

const InputField = ({setUserName})=> {
    

    const  handleUserChange = (event)=> {
         setUserName(event.target.value);
      };
    return ( 
   <Input 
        addonBefore ="User Name" 
        placeholder="Enter Name" 
        onChange={(event)=>handleUserChange(event)}
        style={{ marginBottom: 10 }} 
    />
     );
}

export default InputField;