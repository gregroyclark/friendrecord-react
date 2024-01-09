import { useState } from 'react';
import { Link } from 'react-router-dom';

const AddFriend = () => {
  const [friend, setFriend] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    notes: '',
    userId: localStorage.getItem('userId'),
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('jwt');
      console.log('token: ', token);
      const userId = localStorage.getItem('userId');
      console.log('userId: ', userId);
      setFriend({ ...friend, userId });
      const response = await fetch(
        'https://friendrecord-express.onrender.com/api/friends/createFriend',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(friend),
        }
      );

      console.log(`Response status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        console.error('HTTP error');
        throw new Error('HTTP error: ', response.status);
      }

      const data = await response.json();
      console.log('Response data: ', data);
    } catch (error) {
      console.error('Error creating friend: ', error);
      setErrorMessage('Failed to add friend. Please try again.');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <div className='shadow-md m-2 p-2 rounded-sm'>
      <h1 className='mb-4 flex justify-center text-lg font-semibold text-gray-600'>
        Add a new friend!
      </h1>
      <hr className='mb-4' />
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col p-2'>
          <label className=''>First Name: </label>
          <input
            type='text'
            value={friend.firstName}
            onChange={(e) =>
              setFriend({ ...friend, firstName: e.target.value })
            }
            className='shadow-md rounded-sm p-2'
          />
        </div>

        <div className='flex flex-col p-2'>
          <label className=''>Last Name: </label>
          <input
            type='text'
            value={friend.lastName}
            onChange={(e) => setFriend({ ...friend, lastName: e.target.value })}
            className='shadow-md p-2 rounded-sm'
          />
        </div>

        <div className='flex flex-col p-2'>
          <label className=''>Email: </label>
          <input
            type='text'
            value={friend.email}
            onChange={(e) => setFriend({ ...friend, email: e.target.value })}
            className='shadow-md p-2 rounded-sm'
          />
        </div>

        <div className='flex flex-col p-2'>
          <label className=''>Phone Number: </label>
          <input
            type='text'
            value={friend.phoneNumber}
            onChange={(e) =>
              setFriend({ ...friend, phoneNumber: e.target.value })
            }
            className='shadow-md p-2 rounded-sm'
          />
        </div>

        <div className='flex flex-col p-2'>
          <label className=''>Notes: </label>
          <input
            type='text'
            value={friend.notes}
            onChange={(e) => setFriend({ ...friend, notes: e.target.value })}
            className='shadow-md p-2 rounded-sm'
          />
        </div>

        <button
          type='submit'
          className='rounded-md m-2 p-2 border shadow-sm bg-blue-200 hover:bg-blue-300'
        >
          Add Friend
        </button>
        {errorMessage && (
          <div className='m-2 p-2 bg-red-200 animate-fade rounded-sm shadow-sm'>
            <p>{errorMessage}</p>
          </div>
        )}
        <hr className='mb-4' />
      </form>

      <Link to={'/FriendList'}>
        <button className='rounded-md m-2 p-2 border shadow-sm bg-blue-200 hover:bg-blue-300'>
          Friends List
        </button>
      </Link>
    </div>
  );
};

export default AddFriend;

// https://friendrecord-express.onrender.com
