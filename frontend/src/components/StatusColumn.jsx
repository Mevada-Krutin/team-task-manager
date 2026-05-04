import React from 'react';
import TaskCard from './TaskCard';

const StatusColumn = ({ status, tasks, isAdmin, currentUserId, onUpdateStatus, onDelete }) => {
  const columnTasks = tasks.filter(t => t.status === status);
  
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ 
          width: '12px', height: '12px', borderRadius: '50%', 
          background: status === 'To Do' ? 'var(--warning)' : status === 'In Progress' ? 'var(--secondary)' : 'var(--success)' 
        }}></div>
        <h3 style={{ fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {status} <span style={{ color: 'var(--text-muted)', fontWeight: '400', marginLeft: '0.5rem' }}>{columnTasks.length}</span>
        </h3>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {columnTasks.map(task => (
          <TaskCard 
            key={task._id} 
            task={task} 
            isAdmin={isAdmin}
            isAssigned={task.assignedTo?._id === currentUserId}
            onUpdateStatus={onUpdateStatus}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default StatusColumn;
