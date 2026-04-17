import React, { useState } from 'react';
import { api, setToken } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    name: 'Donor',
    email: 'donor@example.com',
    password: 'password123'
  });

  const navigate = useNavigate();

  // 🔥 FIXED submit function (with error handling)
  async function submit(e) {
    e.preventDefault();

    try {
      const res = await api.post('/auth/register', form);

      console.log("✅ SUCCESS:", res.data);

      // save token
      setToken(res.data.token);

      alert("✅ Registered successfully");

      // redirect
      navigate('/dashboard');

    } catch (err) {
      console.error("❌ ERROR:", err.response?.data || err.message);

      alert(
        err.response?.data?.message || "Registration failed"
      );
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>Register</h2>

        {/* 🔥 FORM SUBMIT */}
        <form onSubmit={submit}>

          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          {/* 🔥 IMPORTANT FIX */}
          <button type="submit" className="btn btn-primary">
            Create account
          </button>

        </form>
      </div>
    </div>
  );
}