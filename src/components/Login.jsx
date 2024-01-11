import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        'https://friendrecord-express.onrender.com/api/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error('HTTP error: ' + response.status);
      }

      const data = await response.json();
      console.log('Success: ', data);
      localStorage.setItem('jwt', data.token);
      console.log('Storing jwt: ', data.token);
      localStorage.setItem('userId', data.userId);
      console.log('Storing userId: ', data.userId);
      window.location.href = '/AddFriend';
    } catch (error) {
      console.error('Error: ', error);
      setErrorMessage('Error logging in');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <div className='border m-2 p-2 rounded-sm shadow-sm '>
      <h1 className='m-4 flex justify-center text-lg font-semibold text-gray-600'>
        Login
      </h1>
      <hr className='mb-4' />

      <form onSubmit={handleSubmit}>
        <div className='flex flex-col sm:flex-row m-2'>
          <label className='flex items-center m-2'>Email:</label>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='m-2 shadow-md rounded-sm p-2'
          />

          <label className='flex items-center m-2'>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='m-2 shadow-md rounded-sm p-2'
          />
        </div>
        <button
          type='submit'
          className='border m-4 p-2 rounded-md shadow-sm bg-blue-200 hover:bg-blue-300'
        >
          Log In
        </button>
        {errorMessage && (
          <div className='m-4 p-2 bg-red-200 animate-fade rounded-sm shadow-sm'>
            <p>{errorMessage}</p>
          </div>
        )}
      </form>

      <div className='m-4'>
        Don't have an account?{' '}
        <Link to='/SignUp'>
          <span className='hover:text-blue-400'>Sign up.</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
