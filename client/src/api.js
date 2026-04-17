import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
export const api = axios.create({ baseURL: API_BASE + '/api' });
export function setToken(token){ if(token){ api.defaults.headers.common['Authorization']='Bearer '+token; localStorage.setItem('token',token);} else { delete api.defaults.headers.common['Authorization']; localStorage.removeItem('token'); } }
export function loadToken(){ const t = localStorage.getItem('token'); if(t) setToken(t); return t; }
