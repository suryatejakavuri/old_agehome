import React, { useEffect, useState } from 'react';
import { api } from '../api';
import io from 'socket.io-client';
const socket = io(import.meta.env.VITE_API_BASE || 'http://localhost:5000');
export default function Dashboard(){
  const [donations,setDonations] = useState([]);
  const [message,setMessage] = useState(''); const [chat,setChat] = useState([]);
  useEffect(()=>{ api.get('/donations/mine').then(r=>setDonations(r.data)); socket.on('message', (m)=>setChat(prev=>[...prev, m])); return ()=>socket.off('message'); },[]);
  function send(){ if(!message.trim()) return; socket.emit('message', { text: message, from:'donor' }); setMessage(''); }
  return (<div className="row g-3">
    <div className="col-md-7">
      <h2>My Donations</h2>
      <ul className="list-group">
        {donations.map(d=> (<li className="list-group-item d-flex justify-content-between" key={d._id}>
          <span><strong>{d.type}</strong> — {d.note || '—'}</span>
          <span>Status: <span className="badge text-bg-secondary">{d.status}</span></span>
        </li>))}
      </ul>
    </div>
    <div className="col-md-5">
      <h2>Live Chat / Enquiry</h2>
      <div className="border rounded p-2 mb-2" style={{height:260, overflowY:'auto', background:'#fff'}}>
        {chat.map((c,i)=>(<div key={i}><small className="text-muted">{new Date(c.ts).toLocaleTimeString()} </small><strong>{c.from}:</strong> {c.text}</div>))}
      </div>
      <div className="input-group">
        <input className="form-control" value={message} onChange={e=>setMessage(e.target.value)} placeholder="Ask a question..." />
        <button className="btn btn-primary" onClick={send}>Send</button>
      </div>
    </div>
  </div>)
}
