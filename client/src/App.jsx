import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Donate from './pages/Donate';
import Residents from './pages/Residents';
import Stories from './pages/Stories';
import Events from './pages/Events';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import VirtualTour from './pages/VirtualTour';
import Volunteer from './pages/Volunteer';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
export default function App(){
  return (<>
    <Navbar/>
    <div className="container py-4">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/donate" element={<Donate/>}/>
        <Route path="/residents" element={<Residents/>}/>
        <Route path="/stories" element={<Stories/>}/>
        <Route path="/events" element={<Events/>}/>
        <Route path="/tour" element={<VirtualTour/>}/>
        <Route path="/volunteer" element={<Volunteer/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  </>);
}
