import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import { Plus, UserPlus, Calendar, MoreVertical, CheckCircle2, Circle, Clock, Trash2, X, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import StatusColumn from '../components/StatusColumn';

const ProjectDetail = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '', priority: 'Medium', assignedTo: '' });
  const [memberEmail, setMemberEmail] = useState('');

  useEffect(() => {
    fetchProject();
    fetchTasks();
  }, [id]);

  const fetchProject = async () => {
    try {
      const { data } = await API.get('/projects');
      const current = data.find(p => p._id === id);
      setProject(current);
    } catch (err) { console.error(err); }
  };

  const fetchTasks = async () => {
    try {
      const { data } = await API.get(`/tasks/${id}`);
      setTasks(data);
    } catch (err) { console.error(err); }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await API.post('/tasks', { ...newTask, project: id });
      setShowTaskModal(false);
      setNewTask({ title: '', description: '', dueDate: '', priority: 'Medium', assignedTo: '' });
      fetchTasks();
    } catch (err) { console.error(err); }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/projects/${id}/members`, { memberEmail });
      setShowMemberModal(false);
      setMemberEmail('');
      fetchProject();
    } catch (err) { alert(err.response?.data?.message || 'Error adding member'); }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      await API.put(`/tasks/${taskId}`, { status });
      fetchTasks();
    } catch (err) { alert(err.response?.data?.message || 'Error updating task'); }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await API.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (err) { console.error(err); }
  };

  const handleRemoveMember = async (memberId) => {
    if (!window.confirm('Remove this member from the project?')) return;
    try {
      await API.delete(`/projects/${id}/members/${memberId}`);
      fetchProject();
    } catch (err) { alert(err.response?.data?.message || 'Error removing member'); }
  };

  if (!project) return <div>Loading...</div>;

  const isAdmin = project.admin._id === currentUser._id;

  return (
    <div className="animate-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '0.5rem' }}>{project.title}</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px' }}>{project.description}</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {isAdmin && (
            <>
              <button onClick={() => setShowMemberModal(true)} className="btn" style={{ background: 'var(--glass)', border: '1px solid var(--border)' }}>
                <UserPlus size={18} /> Invite
              </button>
              <button onClick={() => setShowTaskModal(true)} className="btn btn-primary">
                <Plus size={18} /> New Task
              </button>
            </>
          )}
        </div>
      </div>

      {/* Project Members Section */}
      <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <User size={16} /> Team Members
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {project.members.map(member => (
            <div key={member._id} className="glass" style={{ 
              padding: '0.5rem 1rem', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' 
            }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: '800' }}>
                {member.name.charAt(0)}
              </div>
              <span>{member.name} {member._id === project.admin._id && <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.7rem' }}>(Admin)</span>}</span>
              {isAdmin && member._id !== project.admin._id && (
                <button onClick={() => handleRemoveMember(member._id)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: 0, display: 'flex' }}>
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {['To Do', 'In Progress', 'Done'].map(status => (
          <StatusColumn 
            key={status}
            status={status}
            tasks={tasks}
            isAdmin={isAdmin}
            currentUserId={currentUser._id}
            onUpdateStatus={updateTaskStatus}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div className="glass card" style={{ width: '100%', maxWidth: '500px' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Create Task</h2>
            <form onSubmit={handleCreateTask}>
              <div className="input-group">
                <label>Task Title</label>
                <input type="text" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} required />
              </div>
              <div className="input-group">
                <label>Description</label>
                <textarea rows="3" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}></textarea>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label>Due Date</label>
                  <input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />
                </div>
                <div className="input-group">
                  <label>Priority</label>
                  <select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div className="input-group">
                <label>Assign To</label>
                <select value={newTask.assignedTo} onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}>
                  <option value="">Select Member</option>
                  {project.members.map(m => <option key={m._id} value={m._id}>{m.name}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowTaskModal(false)} className="btn" style={{ background: 'var(--glass)' }}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Member Modal */}
      {showMemberModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div className="glass card" style={{ width: '100%', maxWidth: '400px' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Invite Member</h2>
            <form onSubmit={handleAddMember}>
              <div className="input-group">
                <label>User Email</label>
                <input type="email" value={memberEmail} onChange={(e) => setMemberEmail(e.target.value)} required placeholder="colleague@company.com" />
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowMemberModal(false)} className="btn" style={{ background: 'var(--glass)' }}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
