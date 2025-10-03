import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import * as Yup from 'yup';
import { localStorageKeys } from '../../constants/local-storage';
import { useAppContext } from '../../context';
import { useApi } from '../../hooks/use-api';
import { actions } from '../../constants/actions';
import Card from '../../components/card';
import Logo from '../../components/logo';
import Input from '../../components/input';
import Button from '../../components/button';
import ErrorMessage from '../../components/error';

const LoginRoute = () => {
  const { dispatch } = useAppContext();
  const [error, setError] = useState(false);
  const { loading, postRequest } = useApi();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('An email is required'),
      password: Yup.string().required('A password is required'),
    }),
    onSubmit: async (values) => {
      setError(false);
      try {
        const res = await postRequest('auth/login', { ...values });
        if (res?.data) {
          localStorage.setItem(localStorageKeys.AUTH_TOKEN, res.data.token);
          dispatch({
            type: actions.UPDATE_USER,
            payload: {
              details: res.data.user,
              token: res.data.token,
            },
          });

          toast.success('You are now logged in');
          navigate('/');
        } else {
          setError('An error has occurred');
        }
      } catch (err) {
        const errorMsg = get(
          err,
          'response.data.error',
          'An error has occurred.'
        );
        setError(errorMsg);
      }
    },
  });

  return (
    <div className='flex flex-col items-center justify-center w-full h-full min-h-screen min-w-full bg-gray-50'>
      <Card className='max-w-md w-full p-6'>
        <div className='mb-6 text-center mx-auto flex items-center justify-center'>
          <Logo />
        </div>
        <h1 className='text-gray-800 text-2xl font-semibold mb-8 text-center'>
          Login to your account
        </h1>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={formik.handleSubmit}>
          <div className='mt-6 space-y-6'>
            <Input
              id='email'
              type='email'
              name='email'
              label='Email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && formik.errors.email}
              placeholder='Enter your email'
            />
            <Input
              id='password'
              type='password'
              name='password'
              label='Password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && formik.errors.password}
              placeholder='Enter your password'
            />
            <Button
              type='submit'
              onClick={formik.handleSubmit}
              isLoading={loading}
            >
              Login
            </Button>
          </div>
        </form>
      </Card>
      <Link
        to='/register'
        className='mt-6 text-primary hover:text-primary/80 transition-colors'
      >
        Not registered? Sign up now.
      </Link>
    </div>
  );
};

export default LoginRoute;
