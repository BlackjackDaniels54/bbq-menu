import {Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/LoginPage/Login'; 
import Privat from './utils/router/PrivateRoute';
import RegPage from './components/RegPage/RegPage';

import './App.css';


function App() {
  
  return (
    <div className="App">
      
        <Routes>
          <Route element={<Privat/>}>
              <Route path='/' element={<Home/>}/>
          </Route>
            <Route path='registration' element={<RegPage/>}/>
            <Route path='login' element={<Login/>}/>
            
        </Routes>
    </div>
  );
}

export default App;
