import LandingPage from './components/LandingPage';
import './styles.css'
import { Route, Routes,BrowserRouter} from 'react-router-dom';
import React from 'react';
import Login from './components/Login';
import RegisterPage from './components/RegisterPage';
import LogoutPage from './components/LogoutPage';
import HomePage from './components/HomePage';
function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/Landing' element={<LandingPage/>}/>
    <Route path='/register' element={<RegisterPage/>}/>
    <Route path='/logout' element={<LogoutPage/>}/>
    <Route exact path='/' element={<HomePage/>}/>
   </Routes>
  </BrowserRouter>
  );
}

export default App;
