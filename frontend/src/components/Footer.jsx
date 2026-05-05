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
      
      <div style={{ marginTop: '1rem', fontSize: '0.75rem', opacity: 0.5 }}>
        © {new Date().getFullYear()} • Task Management
      </div>
    </footer>
  );
};

export default Footer;
