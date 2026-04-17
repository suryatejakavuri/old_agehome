import React, { useState } from 'react';
import { api, setToken } from '../api';
import { useNavigate, Link } from 'react-router-dom';
export default function Login(){
  const [email,setEmail] = useState('donor@example.com');
  const [password,setPassword] = useState('password123');
  const navigate = useNavigate();
  async function submit(e){ e.preventDefault(); const res = await api.post('/auth/login',{ email,password }); setToken(res.data.token); navigate('/dashboard'); }
  return (<div className="row justify-content-center">
    <div className="col-md-5">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div className="mb-3"><label className="form-label">Email</label><input className="form-control" value={email} onChange={e=>setEmail(e.target.value)}/></div>
        <div className="mb-3"><label className="form-label">Password</label><input className="form-control" type="password" value={password} onChange={e=>setPassword(e.target.value)}/></div>
        <button className="btn btn-primary">Login</button>
        <p className="mt-2">No account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  </div>)
}
