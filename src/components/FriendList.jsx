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
          `http://localhost:5000/api/friends/readAllFriends/${userId}`,
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
    return <div className='flex justify-center items-center'>Loading...</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {friends.map((friend) => (
          <tr key={friend.id}>
            <td>{friend.firstName}</td>
            <td>{friend.lastName}</td>
            <td>{friend.email}</td>
            <td>{friend.phoneNumber}</td>
            <td>{friend.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FriendList;
