import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className='shadow-md m-2 p-2 rounded-sm'>
      <h1 className='mb-4 flex justify-center text-lg font-semibold text-gray-600'>
        Welcome to friendrecord!
      </h1>
      <hr className='mb-4' />
      {isLoggedIn ? (
        <>
          <Link to={'/AddFriend'}>
            <button className='rounded-md m-2 p-2 border shadow-sm bg-blue-200 hover:bg-blue-300'>
              Add Friend
            </button>
          </Link>
          <Link to={'/FriendList'}>
            <button className='rounded-md m-2 p-2 border shadow-sm bg-blue-200 hover:bg-blue-300'>
              Friends List
            </button>
          </Link>
        </>
      ) : (
        <>
          <Link to={'/Login'}>
            <button className='rounded-md m-2 p-2 border shadow-sm bg-blue-200 hover:bg-blue-300'>
              Login
            </button>
          </Link>
          <Link to={'/SignUp'}>
            <button className='rounded-md m-2 p-2 border shadow-sm bg-blue-200 hover:bg-blue-300'>
              Sign Up
            </button>
          </Link>
        </>
      )}
      <div className='m-2'>Howdy!</div>
    </div>
  );
};

export default Home;
