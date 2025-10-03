import { useAuth } from '../../hooks/use-auth';
import Card from '../../components/card';
import Logo from '../../components/logo';

const UnverifiedRoute = () => {
  useAuth({ onAuth: '/', onUnauth: '/login' });

  return (
    <div className='flex flex-col items-center justify-center w-full h-full min-h-screen min-w-full bg-gray-50'>
      <Card className='max-w-md w-full p-6'>
        <div className='mb-6 text-center'>
          <Logo />
        </div>
        <h1 className='text-gray-800 text-2xl font-semibold mb-8 text-center'>
          Verify your email
        </h1>
        <p className='text-gray-700 text-base text-center'>
          Please click the link on the email we sent you in order to verify your
          account.
        </p>
      </Card>
    </div>
  );
};

export default UnverifiedRoute;
