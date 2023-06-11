import React from 'react';
import { useSelector } from 'react-redux';
import LogoutButton from '../components/LogoutButton';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h2>Welcome, {`${user.firstName} ${user.lastName}`}!</h2>
      <p>This is your dashboard.</p>
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
