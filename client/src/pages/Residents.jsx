import React, { useEffect, useState } from 'react';
import { api } from '../api';
export default function Residents(){
  const [items,setItems] = useState([]);
  useEffect(()=>{ api.get('/residents').then(r=>setItems(r.data)); },[]);
  return (<div>
    <h2 className="mb-3">Residents</h2>
    <div className="row g-3">
      {items.map(r=> (<div className="col-md-4" key={r._id}>
        <div className="card h-100">
          <img src={r.photoUrl || 'https://placehold.co/600x300?text=Resident'} className="card-img-top" alt={r.name}/>
          <div className="card-body">
            <h5 className="card-title">{r.name}</h5>
            <p className="card-text">{r.story?.slice(0,120)}</p>
            {r.needs?.length ? <p><strong>Needs:</strong> {r.needs.join(', ')}</p> : null}
          </div>
        </div>
      </div>))}
    </div>
  </div>)
}
