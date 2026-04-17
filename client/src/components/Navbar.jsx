import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { loadToken, setToken } from '../api';
export default function Navbar(){
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const token = loadToken();
  const logout = ()=>{ setToken(null); navigate('/login'); };
  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">Ashram</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav"><span className="navbar-toggler-icon"></span></button>
        <div id="nav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link" to="/residents">{t('residents')}</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/stories">{t('stories')}</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/events">{t('events')}</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/donate">{t('donate')}</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/tour">360° Tour</NavLink></li>
          </ul>
          <div className="d-flex gap-2">
            <select className="form-select form-select-sm" style={{width:120}} onChange={e=>i18n.changeLanguage(e.target.value)}>
              <option value="en">English</option><option value="te">తెలుగు</option>
            </select>
            {!token ? (<><Link className="btn btn-outline-primary btn-sm" to="/login">{t('login')}</Link><Link className="btn btn-primary btn-sm" to="/register">{t('register')}</Link></>)
              : (<><Link className="btn btn-success btn-sm" to="/dashboard">{t('dashboard')}</Link><button className="btn btn-danger btn-sm" onClick={logout}>{t('logout')}</button></>)}
          </div>
        </div>
      </div>
    </nav>
  )
}
