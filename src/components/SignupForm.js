import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser } from '../redux/actions/authAction';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signupUser({ firstName, lastName, email, password }));

    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <div className="form-group col-sm-6">
        <label>First Name:</label>
        <input type="text" value={firstName} onChange={handleFirstNameChange} className="form-control" />
      </div>
      <div className="form-group col-sm-6">
        <label>Last Name:</label>
        <input type="text" value={lastName} onChange={handleLastNameChange} className="form-control" />
      </div>
      <div className="form-group col-sm-6">
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} className="form-control" />
      </div>
      <div className="form-group col-sm-6">
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary mt-2">Sign Up</button>
    </form>
  );
};

export default SignupForm;
