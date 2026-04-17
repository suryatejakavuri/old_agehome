import React, { useState } from 'react';
import { api, loadToken } from '../api';
import QRCode from 'react-qr-code';
import { Link } from 'react-router-dom';
export default function Donate(){
  const token = loadToken();
  const [form,setForm] = useState({ type:'money', amount:500, note:'' });
  const upi = 'upi://pay?pa=ashram@upi&pn=Ashram&cu=INR&am=' + (form.amount || 0);
  async function submit(e){ e.preventDefault(); if(!token) return alert('Please login to donate and get tracking.'); const res = await api.post('/donations', form); alert('Thank you! Donation recorded. You can track it in Dashboard.'); console.log(res.data); }
  return (<div className="row">
    <div className="col-md-6">
      <h2>Donate</h2>
      {!token && <div className="alert alert-warning">Please <Link to="/login">login</Link> to record your donation.</div>}
      <form onSubmit={submit}>
        <div className="mb-2">
          <label className="form-label">Type</label>
          <select className="form-select" value={form.type} onChange={e=>setForm({...form, type:e.target.value})}>
            <option value="money">Money</option><option value="food">Food</option><option value="clothes">Clothes</option><option value="medical">Medical</option><option value="other">Other</option>
          </select>
        </div>
        {form.type==='money' && (<div className="mb-2"><label className="form-label">Amount (INR)</label><input className="form-control" type="number" value={form.amount} onChange={e=>setForm({...form, amount:Number(e.target.value)})}/></div>)}
        <div className="mb-2"><label className="form-label">Note</label><textarea className="form-control" value={form.note} onChange={e=>setForm({...form, note:e.target.value})}/></div>
        <button className="btn btn-primary">Record Donation</button>
      </form>
    </div>
    <div className="col-md-6">
      <h3>Pay via UPI</h3>
      <p>Scan the QR with any UPI app. After payment, record it using the form to get tracking.</p>
      <div className="bg-white p-4 d-inline-block rounded shadow"><QRCode value={upi} size={220} /></div>
      <p className="mt-2"><strong>UPI ID:</strong> ashram@upi</p>
    </div>
  </div>)
}
