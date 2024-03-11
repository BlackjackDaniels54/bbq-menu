import {useNavigate} from 'react-router-dom';

import './App.css';
import store from './store/store';
import Home from './pages/Home/Home';
import { useEffect } from 'react';





function App() {
    const navigate = useNavigate();
    useEffect(() => {
        const Token = localStorage.getItem('token');
        if(!store.isAuth){
            navigate('/login');
        
        }
    }, [])

}

export default App;
