import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import './Login.scss';
import logoCow from '../../resources/img/logo-cow.svg';
import { LuEye } from "react-icons/lu";
import useForm from '../../hooks/useForms';

function LoginPage() {
    const {
        isPassVisible,
        userData,
        handleInteractionStart,
        handleInteractionEnd,
        changeUserData,
        resetForm,
      } = useForm();

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
                        <Form.Control type="text" placeholder="Імʼя користувача" />
              </FloatingLabel>
              <FloatingLabel
                  controlId="floatingPass"
                  label="Пароль"
                  className="mb-3 custom_pass-container"
              >
                        {!isPassVisible ? <Form.Control type="password" placeholder="Пароль" /> : <Form.Control type="text" placeholder="Пароль" /> }
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
                  <button className='btn-custom mb-2'>Увійти</button>
                  <Link className='custom_dark-link' to='../registration'>Зареєструватись</Link>
              </div>
            
              
            
        </div>
    </div>
  );
}

export default LoginPage;