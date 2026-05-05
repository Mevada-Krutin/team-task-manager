import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass" style={{ margin: '1rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <img 
          src="/hand_sketched_task_logo.png" 
          alt="Logo" 
          style={{ width: '32px', height: '32px', objectFit: 'contain' }} 
        />
        <span style={{ fontWeight: '700', fontSize: '1.25rem', letterSpacing: '-0.025em' }}>TaskFlow</span>
      </div>


      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Dashboard</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '1px solid var(--border)', paddingLeft: '1rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>{user?.name}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{user?.role}</div>
          </div>
          <button onClick={handleLogout} className="btn" style={{ padding: '0.5rem', background: 'var(--glass)', border: '1px solid var(--border)' }}>
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
