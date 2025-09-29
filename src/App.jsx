import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import LoginRoute from './routes/login';
import RootRoute from './routes/root';
import UnverifiedRoute from './routes/unverified';
import VerifiedRoute from './routes/verified';
import RegisterRoute from './routes/register';

function App() {
  return (
    <>
      <ToastContainer autoClose={1500} />
      <Routes>
        <Route path='/login' element={<LoginRoute />} />
        <Route path='/register' element={<RegisterRoute  />} />
        <Route path='/unverified' element={<UnverifiedRoute />} />
        <Route path='/verified' element={<VerifiedRoute />} />
        <Route path='/' element={<RootRoute />} />
      </Routes>
      <div className=''></div>;
    </>
  );
}

export default App;
