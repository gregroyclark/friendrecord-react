import { useEffect } from 'react';
import { useState } from 'react';

const ViewFriend = () => {
  const [friend, setFriend] = useState();

  useEffect(() => {
    const readOneFriend = async () => {
      try {
        const token = localStorage.getItem('jwt');
        console.log('token: ', token);
        const userId = localStorage.getItem('userId');
        console.log('userId: ', userId);

        const response = await fetch(
          `http://localhost:5000/api/friend/readOneFriend/${id}`,
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
        setFriend(data);
      } catch (error) {
        console.log('Error reading one friend: ', error);
      }
    };

    readOneFriend();
  });

  return (
    <div>
      <h1>
        {friend.firstName}
        {''}
        {friend.lastName}
      </h1>
      <hr />
      <div>
        <label>First Name: </label>
        <p>{friend.firstName}</p>
      </div>
      <div>
        <label>Last Name: </label>
        <p>{friend.lastName}</p>
      </div>
      <div>
        <label>Email: </label>
        <p>{friend.email}</p>
      </div>
      <div>
        <label>Phone Number: </label>
        <p>{friend.phoneNumber}</p>
      </div>
      <div>
        <label>Notes:</label>
        <p>{friend.notes}</p>
      </div>
    </div>
  );
};

export default ViewFriend;
