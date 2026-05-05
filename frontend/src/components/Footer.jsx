import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ 
      padding: '4rem 2rem 2rem', 
      textAlign: 'center', 
      color: 'var(--text-muted)',
      borderTop: '1px solid var(--border)',
      marginTop: '4rem'
    }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <img 
          src="/hand_sketched_task_logo.png" 
          alt="Handmade Logo" 
          style={{ width: '40px', opacity: 0.6, filter: 'grayscale(1)' }} 
        />
      </div>
      <p style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
        Hand-crafted with <Heart size={14} color="#ef4444" fill="#ef4444" /> by 
        <span style={{ color: 'var(--text-main)', fontWeight: '600', letterSpacing: '0.5px' }}>
          Mevada Krutin
        </span>
      </p>
      <div style={{ marginTop: '1rem', fontSize: '0.75rem', opacity: 0.5 }}>
        © {new Date().getFullYear()} • Built by hand, not by prompt.
      </div>
    </footer>
  );
};

export default Footer;
