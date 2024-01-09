import { useEffect, useState } from 'react';

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
          `https://friendrecord.netlify.app/api/friends/readAllFriends/${userId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // const text = await response.text();
        // console.log(text);
        const data = await response.json();
        // console.log(data);
        setFriends(data);
      } catch (error) {
        console.error('Error reading all friends: ', error);
      }
    };

    readAllFriends();
  }, [userId]);

  if (friends === null) {
    return (
      <div className='flex justify-center items-center m-2 p-2 rounded-sm shadow-md '>
        Loading...
      </div>
    );
  }

  return (
    <table className='shadow-md m-2 p-2 rounded-sm'>
      <thead>
        <tr>
          <th className='m-2 p-2'>First Name</th>
          <th className='m-2 p-2'>Last Name</th>
          <th className='m-2 p-2'>Email</th>
          <th className='m-2 p-2'>Phone</th>
          <th className='m-2 p-2'>Notes</th>
        </tr>
      </thead>
      <tbody>
        {friends.map((friend) => (
          <tr key={friend.id}>
            <td className='m-2 p-2'>{friend.firstName}</td>
            <td className='m-2 p-2'>{friend.lastName}</td>
            <td className='m-2 p-2'>{friend.email}</td>
            <td className='m-2 p-2'>{friend.phoneNumber}</td>
            <td className='m-2 p-2'>{friend.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FriendList;
