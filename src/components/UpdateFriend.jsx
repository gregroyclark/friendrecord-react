/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateFriend = () => {
  const [originalFriend, setOriginalFriend] = useState(null);
  const [updatedFriend, setUpdatedFriend] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const readOneFriend = async () => {
      try {
        const token = localStorage.getItem('jwt');
        console.log('token: ', token);
        const userId = localStorage.getItem('userId');
        console.log('userId: ', userId);
        console.log('id: ', id);
        const response = await fetch(
          `https://friendrecord-express.onrender.com/api/friends/readOneFriend/${id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );
        const data = await response.json();
        console.log(data);
        setOriginalFriend(data.rows[0]);
        setUpdatedFriend(data.rows[0]);
        // setLoading(false);
      } catch (error) {
        console.log('Error reading one friend: ', error);
      }
    };
    readOneFriend();
  }, [id]);

  const updateFriend = async (event) => {
    const token = localStorage.getItem('jwt');
    event.preventDefault();
    try {
      const response = await fetch(
        `https://friendrecord-express.onrender.com/api/friends/${friend.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedFriend),
        }
      );
      const data = await response.json();
      console.log(data);
      navigate(`/ViewFriend/${originalFriend.id}`);
    } catch (error) {
      console.error('Error updating friend: ', error);
    }
  };

  const deleteFriend = async (id) => {
    try {
      const response = await fetch(
        `https://friendrecord-express.onrender.com/api/friends/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );
      const data = await response.json();
      console.log(data);
      navigate('/FriendList');
    } catch (error) {
      console.error('Error deleting friend: ', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedFriend({ ...updatedFriend, [name]: value });
  };

  const FriendList = () => {
    navigate('/FriendList');
  };

  if (!originalFriend) {
    return (
      <div className='flex justify-center items-center m-2 p-2 rounded-sm shadow-md'>
        Loading...
      </div>
    );
  }

  return (
    <div className='shadow-md p-2 m-2 rounded-sm'>
      <h1 className='mb-4 flex justify-center text-lg font-semibold text-gray-600'>
        Update Friend
      </h1>
      <hr className='mb-4' />
      <form onSubmit={updateFriend}>
        <div className='flex flex-col p-2'>
          <label className=''>First Name: </label>
          <input
            type='text'
            name='firstName'
            value={updatedFriend.firstName || ''}
            onChange={handleInputChange}
            className='shadow-md rounded-sm p-2'
          />
        </div>

        <div className='flex flex-col p-2'>
          <label className=''>Last Name: </label>
          <input
            type='text'
            name='lastName'
            value={updatedFriend.lastName || ''}
            onChange={handleInputChange}
            className='shadow-md p-2 rounded-sm'
          />
        </div>

        <div className='flex flex-col p-2'>
          <label className=''>Email: </label>
          <input
            type='text'
            name='email'
            value={updatedFriend.email || ''}
            onChange={handleInputChange}
            className='shadow-md p-2 rounded-sm'
          />
        </div>

        <div className='flex flex-col p-2'>
          <label className=''>Phone Number: </label>
          <input
            type='text'
            name='phoneNumber'
            value={updatedFriend.phoneNumber}
            onChange={handleInputChange || ''}
            className='shadow-md p-2 rounded-sm'
          />
        </div>

        <div className='flex flex-col p-2'>
          <label className=''>Notes: </label>
          <input
            type='text'
            name='notes'
            value={updatedFriend.notes || ''}
            onChange={handleInputChange}
            className='shadow-md p-2 rounded-sm'
          />
        </div>

        <button
          type='submit'
          className='rounded-md m-2 p-2 border shadow-sm bg-blue-100 hover:bg-blue-300'
        >
          Update Friend
        </button>
        <hr className='mb-4' />
      </form>
      <button
        onClick={FriendList}
        // onClick={() => readFriends(friend.userId)}
        className='rounded-md m-2 p-2 border shadow-sm bg-blue-200 hover:bg-blue-300'
      >
        Friends List
      </button>
      <button
        onClick={() => deleteFriend(friend.id)}
        className='rounded-md m-2 p-2 border shadow-sm bg-red-200 hover:bg-red-300'
      >
        Delete Friend
      </button>
    </div>
  );
};

export default UpdateFriend;
