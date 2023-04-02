import React from 'react';
import { Navigate } from 'react-router-dom'

export const authenticationInfor = {
  isAuthenticated: localStorage.getItem('loggedIn') === 'true'
}

function PrivateRoute({ children }) {
  return authenticationInfor.isAuthenticated ? children : <Navigate to='/login' />;
}

export default PrivateRoute