
import ima from '../images/ima.jpg'
import hmslogo from '../images/HMSlogo.png'
import image from '../images/hms.jpg';
import LoginForm from '../LoginForm';
import './Css/Home.css';

export const Home = ({setAuth})=>{
    
    return (
        <div className="rootClass">
        {/* Heading Section */}
        <div className="heading bg-success text-white">
        <img src={ima} className="ima-icon" alt="IMA" />
        Welcome to Hospital Management System
        <img src={hmslogo} className="hms-icon" alt="HMSlogo" />
        </div>
  
        {/* Main Content */}
        <div className="App container-fluid d-flex flex-column flex-grow-1">
          <div className="row flex-grow-1">
            {/* Left Column */}
            <div className="col-sm-4 d-flex justify-content-center align-items-center">
             <LoginForm setAuth={setAuth}/>
            </div>
  
            {/* Right Column */}
            <div className="col-sm-8 p-0">
              <img src={image} className="full-image" alt="Hospital Management System" />
            </div>
          </div>
        </div>
      </div>
    );
};