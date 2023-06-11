import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authAction';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return <button className="btn btn-primary mt-2" onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
