import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';

import AuthenticatedRoute from './components/AuthenticatedRoute';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AddFriend from './components/AddFriend';
import FriendList from './components/FriendList';
import UpdateFriend from './components/UpdateFriend';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route
          path='/AddFriend'
          element={
            <AuthenticatedRoute>
              <AddFriend />
            </AuthenticatedRoute>
          }
        />

        <Route
          path='/FriendList'
          element={
            <AuthenticatedRoute>
              <FriendList />
            </AuthenticatedRoute>
          }
        />
        <Route
          path='/UpdateFriend'
          element={
            <AuthenticatedRoute>
              <UpdateFriend />
            </AuthenticatedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
