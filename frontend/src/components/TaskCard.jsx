import React from 'react';
import { Calendar, Trash2, CheckCircle2, Circle } from 'lucide-react';

const TaskCard = ({ task, isAdmin, isAssigned, onUpdateStatus, onDelete }) => {
  return (
    <div className="glass card" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span style={{ 
          fontSize: '0.7rem', fontWeight: '700', padding: '0.25rem 0.6rem', borderRadius: '6px',
          background: task.priority === 'High' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)',
          color: task.priority === 'High' ? 'var(--danger)' : 'var(--primary)',
          textTransform: 'uppercase'
        }}>
          {task.priority}
        </span>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {(isAdmin || isAssigned) && (
            <>
              {task.status !== 'To Do' && (
                <button onClick={() => onUpdateStatus(task._id, task.status === 'Done' ? 'In Progress' : 'To Do')} 
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <Circle size={14} />
                </button>
              )}
              {task.status !== 'Done' && (
                <button onClick={() => onUpdateStatus(task._id, task.status === 'To Do' ? 'In Progress' : 'Done')} 
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <CheckCircle2 size={14} />
                </button>
              )}
            </>
          )}
          {isAdmin && (
            <button onClick={() => onDelete(task._id)} 
                    style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', marginLeft: '0.25rem', opacity: 0.7 }}>
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
      <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{task.title}</h4>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>{task.description}</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
          <Calendar size={14} /> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}
        </div>
        <div title={task.assignedTo?.name || 'Unassigned'}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: '800' }}>
            {task.assignedTo?.name?.charAt(0) || '?'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
