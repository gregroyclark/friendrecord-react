import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ViewFriend = () => {
  const [friend, setFriend] = useState();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { id } = useParams();
  if (!id) {
    return;
  }

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
        setFriend(data.rows[0]);
        setLoading(false);
      } catch (error) {
        console.log('Error reading one friend: ', error);
      }
    };

    readOneFriend();
  }, [id]);

  if (loading) {
    return (
      <div className='flex justify-center items-center m-2 p-2 rounded-sm shadow-md'>
        Loading...
      </div>
    );
  }

  return (
    <div className='m-2 p-2 rounded-sm shadow-md'>
      <h1 className='flex justify-center items-center text-lg font-semibold text-gray-600'>
        {friend.firstName} {friend.lastName}
      </h1>
      <hr className='mb-4' />
      <div className='flex p-2'>
        <label className='m-2'>First Name: </label>
        <p className='m-2'>{friend.firstName}</p>
      </div>
      <div className='flex p-2'>
        <label className='m-2'>Last Name: </label>
        <p className='m-2'>{friend.lastName}</p>
      </div>
      <div className='flex p-2'>
        <label className='m-2'>Email: </label>
        <p className='m-2'>{friend.email}</p>
      </div>
      <div className='flex p-2'>
        <label className='m-2'>Phone Number: </label>
        <p className='m-2'>{friend.phoneNumber}</p>
      </div>
      <div className='flex p-2'>
        <label className='m-2'>Notes:</label>
        <p className='m-2'>{friend.notes}</p>
      </div>
      <hr className='mb-4' />
      <div>
        <Link to={`/UpdateFriend/${friend.id}`}>
          <button className='border m-2 p-2 rounded-md shadow-sm bg-blue-200 hover:bg-blue-300'>
            Update Friend
          </button>
        </Link>
        <button
          className='border m-2 p-2 rounded-md shadow-sm bg-red-200 hover:bg-red-300'
          onClick={async () => {
            try {
              const token = localStorage.getItem('jwt');
              const response = await fetch(
                `https://friendrecord-express.onrender.com/api/friends/deleteFriend/${friend?.id}`,
                {
                  method: 'DELETE',
                  headers: { Authorization: `Bearer ${token}` },
                  credentials: 'include',
                }
              );
              if (!response.ok) {
                throw new Error('HTTP error ' + response.status);
              } else {
                console.log('Successfully deleted friend');
                navigate('/FriendList');
              }
            } catch (error) {
              console.error('Error deleting friend: ', error);
            }
          }}
        >
          Delete Friend
        </button>
      </div>
      <hr className='mb-4' />
      <Link to={'/FriendList'}>
        <button className='rounded-md m-2 p-2 border shadow-sm bg-blue-200 hover:bg-blue-300'>
          Friends List
        </button>
      </Link>
    </div>
  );
};

export default ViewFriend;
