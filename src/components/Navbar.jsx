import { Link } from 'react-router-dom';

import logo from '../assets/friendrecord.png';

const Navbar = () => {
  return (
    <div className='flex border-b items-center mb-4 p-2 shadow-sm'>
      <Link to={'/'}>
        <img
          src={logo}
          alt='friendrecord logo'
          height={125}
          width={125}
          className='m-2 flex justify-start'
        />
      </Link>
      <div className='m-2'>
        <ul className='flex flex-row'>
          <Link to='/AddFriend'>
            <li className='border m-2 p-2 rounded-md shadow-sm text-sm'>
              Add Friend
            </li>
          </Link>

          <Link to='/FriendList'>
            <li className='border m-2 p-2 rounded-md shadow-sm text-sm'>
              Friends List
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
