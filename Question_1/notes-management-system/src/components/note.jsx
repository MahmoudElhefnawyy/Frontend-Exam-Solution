const Note = ({ note, onEdit, onDelete, onToggleComplete }) => {
  const getCategoryColor = () => {
    const colors = {
      'work': 'primary',
      'personal': 'success',
      'ideas': 'warning',
      'other': 'info'
    };
    return colors[note.category] || 'secondary';
  };

  return (
    <div className={`card mb-3 ${note.completed ? 'border-success' : ''}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className={`card-title ${note.completed ? 'text-decoration-line-through' : ''}`}>
            {note.title}
          </h5>
          <span className={`badge bg-${getCategoryColor()}`}>
            {note.category}
          </span>
        </div>
        
        <p className={`card-text ${note.completed ? 'text-decoration-line-through' : ''}`}>
          {note.description}
        </p>
        
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            {new Date(note.date).toLocaleDateString()}
          </small>
          
          <div>
            <button 
              className={`btn btn-sm me-2 ${note.completed ? 'btn-outline-warning' : 'btn-outline-success'}`}
              onClick={() => onToggleComplete(note.id)}
            >
              {note.completed ? 'Undo' : 'Complete'}
            </button>
            <button 
              className="btn btn-sm btn-outline-primary me-2"
              onClick={() => onEdit(note)}
            >
              Edit
            </button>
            <button 
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;