import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginRoute from './routes/login';
import RegisterRoute from './routes/register';
import RootRoute from './routes/root';
import UnverifiedRoute from './routes/unverified';
import VerifiedRoute from './routes/verified';
import VerifyRoute from './routes/verify';

function App() {
  return (
    <>
      <ToastContainer autoClose={1500} />
      <Routes>
        <Route path='/login' element={<LoginRoute />} />
        <Route path='/register' element={<RegisterRoute  />} />
        <Route path='/unverified' element={<UnverifiedRoute />} />
        <Route path='/verified' element={<VerifiedRoute />} />
        <Route path='/verify/:token' element={<VerifyRoute />} />
        <Route path='/' element={<RootRoute />} />
      </Routes>
      <div className=''></div>;
    </>
  );
}

export default App;
