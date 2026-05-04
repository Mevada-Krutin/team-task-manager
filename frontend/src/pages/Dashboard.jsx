import React, { useState, useEffect } from 'react';
import API from '../api';
import { Plus, Folder, Clock, CheckCircle, AlertCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projRes, statsRes] = await Promise.all([
        API.get('/projects'),
        API.get('/dashboard/stats')
      ]);
      setProjects(projRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await API.post('/projects', newProject);
      setNewProject({ title: '', description: '' });
      setShowModal(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="animate-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Overview of your teams and progress</p>
        </div>
        {user?.role === 'Admin' && (
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            <Plus size={20} /> Create Project
          </button>
        )}
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="glass card">
          <div style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}><Folder size={24} /></div>
          <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{projects.length}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Active Projects</div>
        </div>
        <div className="glass card">
          <div style={{ color: 'var(--warning)', marginBottom: '0.5rem' }}><Clock size={24} /></div>
          <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stats?.todo || 0}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Tasks To Do</div>
        </div>
        <div className="glass card">
          <div style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}><AlertCircle size={24} /></div>
          <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stats?.inProgress || 0}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>In Progress</div>
        </div>
        <div className="glass card">
          <div style={{ color: 'var(--success)', marginBottom: '0.5rem' }}><CheckCircle size={24} /></div>
          <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stats?.done || 0}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Completed</div>
        </div>
      </div>

      {stats?.tasksPerUser && Object.keys(stats.tasksPerUser).length > 0 && (
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Tasks per User</h2>
          <div className="glass card" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', padding: '1.5rem' }}>
            {Object.entries(stats.tasksPerUser).map(([name, count]) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: '700', color: 'white' }}>
                  {name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: '600' }}>{name}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{count} Tasks</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Your Projects</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {projects.map(project => (
          <Link key={project._id} to={`/project/${project._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="glass card" style={{ height: '100%', transition: 'transform 0.2s', cursor: 'pointer' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>{project.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {project.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                  <Users size={14} /> {project.members.length} Members
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '600' }}>View Details →</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Create Project Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div className="glass card" style={{ width: '100%', maxWidth: '500px' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>New Project</h2>
            <form onSubmit={handleCreateProject}>
              <div className="input-group">
                <label>Project Title</label>
                <input type="text" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} required />
              </div>
              <div className="input-group">
                <label>Description</label>
                <textarea rows="4" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}></textarea>
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn" style={{ background: 'var(--glass)' }}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
