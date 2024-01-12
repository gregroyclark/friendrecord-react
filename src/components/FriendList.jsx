import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FriendList = ({ userId }) => {
  const [friends, setFriends] = useState(null);

  useEffect(() => {
    const readAllFriends = async () => {
      try {
        const token = localStorage.getItem('jwt');
        console.log('token: ', token);
        const userId = localStorage.getItem('userId');
        console.log('userId: ', userId);
        const response = await fetch(
          `https://friendrecord-express.onrender.com/api/friends/readAllFriends/${userId}`,
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
        setFriends(data);
      } catch (error) {
        console.error('Error reading all friends: ', error);
      }
    };

    readAllFriends();
  }, [userId]);

  if (friends === null) {
    return (
      <div className='flex justify-center items-center m-2 p-2 rounded-sm shadow-md'>
        Loading...
      </div>
    );
  }

  return (
    <div className='m-2 p-2 rounded-sm shadow-md overscroll-x-scroll'>
      <h1 className='flex justify-center items-center text-lg font-semibold text-gray-600'>
        My Friends
      </h1>
      <hr className='mb-4' />
      <table className=''>
        <thead>
          <tr>
            <th className='m-2 p-2'>First Name</th>
            <th className='m-2 p-2'>Last Name</th>
            <th className='hidden sm:block m-2 p-2'>Email</th>
            <th className='m-2 p-2'>Phone</th>
            <th className='hidden sm:block m-2 p-2'>Notes</th>
          </tr>
        </thead>
        <tbody>
          {friends.map((friend) => (
            <tr key={friend.id}>
              <td className='m-4 p-4 sm:m-2 sm:p-2'>{friend.firstName}</td>
              <td className='m-4 p-4 sm:m-2 sm:p-2'>{friend.lastName}</td>
              <td className='hidden sm:block m-2 p-2'>{friend.email}</td>
              <td className='m-4 p-4 sm:m-2 sm:p-2'>{friend.phoneNumber}</td>
              <td className='hidden sm:block m-2 p-2'>{friend.notes}</td>
              <th>
                <button className='p-2'>
                  <Link to={`/ViewFriend/${friend.id}`}>show</Link>
                </button>
                <button className='hidden p-2'>
                  <Link to={`/UpdateFriend/${friend.id}`}>edit</Link>
                </button>
                <button
                  className='hidden md:block p-2'
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
                      }
                      console.log('Successfully deleted friend');
                      const updatedFriendList = friends.filter(
                        (f) => f.id !== friend.id
                      );
                      setFriends(updatedFriendList);
                    } catch (error) {
                      console.error('Error deleting friend: ', error);
                    }
                  }}
                >
                  delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FriendList;
