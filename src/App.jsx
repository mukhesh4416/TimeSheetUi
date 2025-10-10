import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Mainpage from './components/Mainpage';
import Loginpage from './components/Loginpage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Adminpage from './admin/Adminpage';

function App() {



  return (   
    <> 
    <Header/>
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Loginpage />} /> 
        <Route path="/mainpage" element={<Mainpage/>} />
       <Route path="/adminpage" element = {<Adminpage/>}/>
      </Routes>
    </BrowserRouter>
    </> 
  );
}

export default App
