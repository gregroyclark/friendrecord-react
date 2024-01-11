import { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        'https://friendrecord-express.onrender.com/api/users/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ firstName, lastName, email, password }),
        }
      );

      const text = await response.text();
      console.log('Raw response: ', text);
      if (!response.ok) {
        throw new Error('HTTP error: ' + response.status);
      }

      const data = JSON.parse(text);
      // const data = await response.json();
      console.log('Success: ', data);
    } catch (error) {
      console.error('Error: ', error);
      setErrorMessage('Error signing up');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <div className='border m-2 p-2 rounded-sm shadow-sm'>
      <h1 className='flex font-semibold justify-center m-4 text-lg text-gray-600'>
        Sign Up
      </h1>
      <hr className='mb-4' />
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col sm:flex-row m-2'>
          <label className='flex items-center m-2'>First Name: </label>
          <input
            type='text'
            value={firstName}
            className='m-2 p-2 rounded-sm shadow-md'
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label className='flex items-center m-2'>Last Name: </label>
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className='m-2 p-2 rounded-sm shadow-md'
          />
        </div>
        <div className='flex flex-col sm:flex-row m-2'>
          <label className='flex items-center m-2'>Email:</label>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='m-2 p-2 rounded-sm shadow-md'
          />

          <label className='flex items-center m-2'>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='m-2 p-2 rounded-sm shadow-md'
          />
        </div>

        <button
          type='submit'
          className='border m-4 p-2 rounded-md shadow-sm bg-blue-200 hover:bg-blue-300'
        >
          Sign Up
        </button>
        {errorMessage && (
          <div className='m-4 p-2 bg-red-200 animate-fade'>
            <p>{errorMessage}</p>
          </div>
        )}
        <div className='m-4'>
          Already have an account?{' '}
          <Link to='/Login'>
            <span className='hover:text-blue-400'>Log in.</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
