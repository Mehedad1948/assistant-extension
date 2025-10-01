import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import get from 'lodash/get';
import * as Yup from 'yup';

import { useApi } from '../../hooks/use-api';
import { useAppContext } from '../../context';
import Card from '../../components/card';
import Logo from '../../components/logo';
import Input from '../../components/input';
import Button from '../../components/button';
import Error from '../../components/error';
import { actions } from '../../constants/actions';
import { localStorageKeys } from '../../constants/local-storage';

const RegisterRoute = () => {
  const { dispatch } = useAppContext();
  const { loading, postRequest } = useApi();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('A name is required'),
      email: Yup.string()
        .email('A valid email is required')
        .required('An email is required'),
      password: Yup.string().required('A password is required'),
    }),
    onSubmit: async (values) => {
      setError(false);
      try {
        const res = await postRequest('auth/register', { ...values });

        if (res?.data) {
          localStorage.setItem(localStorageKeys.AUTH_TOKEN, res.data.token);
          dispatch({
            type: actions.UPDATE_USER,
            payload: {
              details: res.data.user,
              token: res.data.token,
            },
          });
          navigate('/');
        } else {
          console.log('❌❌');

          setError('An error has occurred');
        }
      } catch (err) {
        console.log('🚀🚀🚀', err);
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
    <div className='flex flex-col min-h-screen items-center justify-center bg-gray-50 px-4'>
      <Card className='w-full max-w-xl'>
        <div className='flex justify-center mb-6'>
          <Logo maxWidth='60px' />
        </div>
        <h1 className='text-center text-2xl font-semibold text-gray-800 mb-4'>
          Create new account
        </h1>

        {error && <Error className='mb-4'>{error}</Error>}

        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
          <Input
            id='name'
            name='name'
            label='Name'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.touched.name && formik.errors.name}
            placeholder='Enter your name'
          />

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
            placeholder='Enter a password'
          />

          <Button type='submit' loading={loading}>
            Create account
          </Button>
        </form>
      </Card>

      <Link
        to='/login'
        className='mt-4 block text-center text-sm text-blue-600 hover:underline'
      >
        Already registered? Login now.
      </Link>
    </div>
  );
};

export default RegisterRoute;
