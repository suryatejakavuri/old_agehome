import React, { useEffect, useState } from 'react';
import { api, loadToken } from '../api';
import { Link } from 'react-router-dom';
export default function Events(){
  const [items,setItems] = useState([]);
  const token = loadToken();
  useEffect(()=>{ api.get('/events').then(r=>setItems(r.data)); },[]);
  async function volunteer(id){ await api.post(`/events/${id}/volunteer`); alert('Thanks for volunteering!'); }
  return (<div>
    <h2 className="mb-3">Events & Volunteer Signup</h2>
    {token ? null : (<div className="alert alert-info">Please <Link to="/login">login</Link> to volunteer.</div>)}
    <div className="list-group">
      {items.map(e=> (<div className="list-group-item" key={e._id}>
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{e.title}</h5><small>{new Date(e.date).toLocaleDateString()}</small>
        </div>
        <p className="mb-1">{e.description}</p>
        {token ? <button className="btn btn-sm btn-primary" onClick={()=>volunteer(e._id)}>Volunteer</button> : null}
      </div>))}
    </div>
  </div>)
}
