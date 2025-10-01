import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/use-api';
import Card from '../../components/card';
import Success from '../../components/success';
import Error from '../../components/error';
import Spinner from '../../components/Spinner';

const VerifyRoute = () => {
  console.log('❤️❤️❤️❤️');

  const { token } = useParams();
  const { putRequest } = useApi();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await putRequest(`auth/verify/${token}`, {});
        setStatus(res?.data?.isVerified ? 'success' : 'failed');
      } catch (err) {
        console.error(err);
        setStatus('failed');
      }
    };
    verifyToken();
  }, [putRequest, token]);

  // common wrapper classes (replaces styled Wrapper)
  const wrapperClasses =
    'flex flex-col items-center justify-center w-full h-full min-h-screen min-w-full bg-background';
  // `bg-background` should map to your Tailwind theme color

  if (status === 'success') {
    return (
      <div className={wrapperClasses}>
        <Card className='max-w-md w-full'>
          <Success>
            Successfully verified your email. You may now{' '}
            <Link to='/login' className='text-primary underline'>
              login
            </Link>
            .
          </Success>
        </Card>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className={wrapperClasses}>
        <Card className='max-w-md w-full'>
          <Error>
            The provided verification token is either invalid or has expired.
          </Error>
        </Card>
      </div>
    );
  }

  return (
    <div className={wrapperClasses}>
      <Spinner />
    </div>
  );
};

export default VerifyRoute;
