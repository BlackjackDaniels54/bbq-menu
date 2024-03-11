import {FloatingLabel, Form} from 'react-bootstrap';


import { Link } from 'react-router-dom';
import './Login.scss';
import logoCow from '../../resources/img/logo-cow.svg';
import { LuEye } from "react-icons/lu";
import useForm from '../../hooks/useForms';
import store from '../../store/store';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';




const LoginPage = () => {
    
    
    const navigate = useNavigate();
    const {
        isPassVisible,
        userData,
        handleInteractionStart,
        handleInteractionEnd,
        changeUserData,
        resetForm,
      } = useForm();

    const AuthUser = async (e) => {
        e.preventDefault();
        store.setLoading(true);
        const res = await store.login(userData);
        store.setLoading(false);

        if(store.isAuth){
            navigate('/dashboard');
        }else{
            toast.error(res.response.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 30,
                progress: undefined,
                theme: "dark",
                
            });
            
           
        }
 
    }
    
        

  return (
    <div className='main-container pt-5'>
        <div className='form-container mt-5'>
              <h1 className='main-title text-center'>Зайти до <br /> BBQ Smoker</h1>
              <div className='d-flex justify-content-center'>
                  <div className='logo-container'>
                      <img src={logoCow} alt="" />
                  </div>
              </div>


              <form className='log-form mt-3'>

              <FloatingLabel
                  controlId="floatingUsername"
                  label="Імʼя користувача"
                  className="mb-3"
              >
                        <Form.Control 
                                        name='username'
                                        value={userData.username}
                                        onChange={changeUserData}
                                        type="text" 
                                        placeholder="Імʼя користувача" />
              </FloatingLabel>
              <FloatingLabel
                  controlId="floatingPass"
                  label="Пароль"
                  className="mb-3 custom_pass-container"
              >         
                        <Form.Control 
                                    name='password'
                                    type={!isPassVisible ? "password" : "text"} 
                                    value={userData.password}
                                    onChange={changeUserData}             
                                    placeholder="Пароль" /> 
                       
                        <button 
                            onClick={(e) => e.preventDefault()}
                            onMouseDown={handleInteractionStart}
                            onMouseUp={handleInteractionEnd}
                            onTouchStart={handleInteractionStart}
                            onTouchEnd={handleInteractionEnd}
                            className='show_eye_pass'><LuEye/></button>
              </FloatingLabel>

              </form>
              
              <div className='text-center mt-4 d-flex flex-column justify-content-center align-items-center'>
                  <button 
                            onClick={AuthUser}
                            className='btn-custom mb-2'>{store.isLoading ? '' : 'Увійти'}</button>
                  <Link className='custom_dark-link' to='../registration'>Зареєструватись</Link>
              </div>
            
              <ToastContainer />
            
        </div>
    </div>
  );
}

export default observer(LoginPage);