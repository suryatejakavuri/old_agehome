import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
export default function Home(){
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <h1 className="mb-3">{t('welcome')}</h1>
      <p className="lead accessible-text">Sri Swamy Yogiswaranandha Giri Shanthi Ashramam — a community of care. Join us by donating, volunteering, and sharing resident stories.</p>
      <div className="d-flex justify-content-center gap-3">
        <Link className="btn btn-primary large-btn" to="/donate">Donate</Link>
        <Link className="btn btn-outline-secondary large-btn" to="/residents">Meet Residents</Link>
        <Link className="btn btn-outline-success large-btn" to="/events">Volunteer</Link>
      </div>
      <div className="mt-4">
        <img alt="Ashram" src="https://placehold.co/900x300?text=Ashram+Banner" className="img-fluid rounded shadow"/>
      </div>
    </div>
  )
}
