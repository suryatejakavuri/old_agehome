import React from 'react'; import { Navigate } from 'react-router-dom'; import { loadToken } from '../api';
export default function ProtectedRoute({ children }){ const token = loadToken(); return token ? children : <Navigate to="/login" replace/>; }
