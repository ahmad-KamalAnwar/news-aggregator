import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { isAuthenticated, error, success } = useSelector((state) => state.auth);

  // Function to show the toast notification
  const showToast = (message, type) => {
    toast(message, {
      position: toast.POSITION.TOP_RIGHT,
      type: type === 'success' ? toast.TYPE.SUCCESS : toast.TYPE.ERROR,
    });
  };

  useEffect(() => {
    if (error ) {
      showToast(error, 'error');
    }
    if (success ) {
      showToast(success, 'success');
    }
  }, [error, success]);

  return (
    <Router>
      <div className="container">
      <Navbar />
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
          <Route
            exact
            path="/login"
            element={(isAuthenticated) ? <Navigate to="/dashboard" /> : <LoginPage />}
          />
          <Route
            exact
            path="/signup"
            element={(!isAuthenticated) ? <SignupPage /> : <Navigate to="/dashboard" /> }
          />
          <Route
            exact
            path="/dashboard"
            element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
      <ToastContainer autoClose={5000} />
      </Router>
  );
};

export default App;
