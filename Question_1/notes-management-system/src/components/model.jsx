const Modal = ({ show, onClose, onSubmit, initialNote = {} }) => {
  const [note, setNote] = useState({
    title: initialNote.title || '',
    description: initialNote.description || '',
    category: initialNote.category || 'work'
  });

  const handleSubmit = (e) => {
      e.preventDefault(); 
      onSubmit({
        ...note,
        date: initialNote.date || new Date().toISOString()
      });
      onClose(); 
    };

  if (!show) return null;

  return (
    <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fs-5 fw-semibold">
              {initialNote.title ? 'Edit Note' : 'Add New Note'}
            </h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body pt-1">
              <div className="mb-4">
                <label className="form-label text-muted small mb-1">Title *</label>
                <input
                  type="text"
                  className="form-control rounded-2 py-2"
                  value={note.title}
                  onChange={(e) => setNote({...note, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="form-label text-muted small mb-1">Description</label>
                <textarea
                  className="form-control rounded-2"
                  rows="4"
                  value={note.description}
                  onChange={(e) => setNote({...note, description: e.target.value})}
                  maxLength="200"
                ></textarea>
                <div className="form-text text-end">
                  {note.description.length}
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label text-muted small mb-1">Category</label>
                <select 
                  className="form-select rounded-2 py-2"
                  value={note.category}
                  onChange={(e) => setNote({...note, category: e.target.value})}
                >
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="ideas">Ideas</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="modal-footer border-0 pt-0">
              <button 
                type="button" 
                className="btn btn-outline-secondary rounded-1 px-4"
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary rounded-1 px-4"
              >
                {initialNote.title ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;