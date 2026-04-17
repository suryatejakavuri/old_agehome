import React, { useEffect, useState } from 'react';
import { api } from '../api';
export default function Stories(){
  const [items,setItems] = useState([]);
  useEffect(()=>{ api.get('/stories').then(r=>setItems(r.data)); },[]);
  return (<div>
    <h2 className="mb-3">Resident Stories</h2>
    <div className="row g-3">
      {items.map(s=> (<div className="col-md-6" key={s._id}>
        <div className="card h-100">
          {s.mediaUrl ? <img src={s.mediaUrl} className="card-img-top" alt={s.title}/> : null}
          <div className="card-body">
            <h5 className="card-title">{s.title}</h5>
            <p className="card-text">{s.content}</p>
          </div>
        </div>
      </div>))}
    </div>
  </div>)
}
