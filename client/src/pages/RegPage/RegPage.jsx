import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import './RegPage.scss';
import logoCow from '../../resources/img/logo-cow.svg';
import { LuEye } from "react-icons/lu";
import useForm from '../../hooks/useForms';
import store from '../../store/store';
import { observer } from 'mobx-react-lite';



function RegPage() {
  const {
      isPassVisible,
      userData,
      handleInteractionStart,
      handleInteractionEnd,
      changeUserData,
      resetForm,
  } = useForm();

  const regNewUser = async (e) => {
      e.preventDefault();
      console.log(userData);
      const res = await store.registration(userData);
      
  }
  

  return (
    <div className='main-container pt-5'>
        <div className='form-container mt-5'>
              <h1 className='main-title text-center'>Зареєструватись у<br /> BBQ Smoker</h1>
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
                        type="text" placeholder="Імʼя користувача" />
              </FloatingLabel>
              <FloatingLabel
                  controlId="floatingPass"
                  label="Пароль"
                  className="mb-3 custom_pass-container"
              >
                        <Form.Control   
                                      name='password'
                                      value={userData.password}
                                      onChange={changeUserData}
                                      type={isPassVisible ? 'text' : 'password'} 
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
                        onClick={regNewUser}
                        className='btn-custom mb-2'>Зареєструватись</button>
                        <Link className='custom_dark-link' to='../login'>Увійти</Link>
              </div>
            
              
            
        </div>
    </div>
  );
}

export default observer(RegPage);