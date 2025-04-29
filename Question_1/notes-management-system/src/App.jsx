import { useState, useEffect } from 'react';
import Navbar from './components/navBar';
import Note from './components/note';
import NoteModal from './components/model';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const filteredNotes = notes
    .filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(note => filterCategory === 'all' || note.category === filterCategory)
    .filter(note => showCompleted || !note.completed)
    .sort((a, b) => {
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;
      return new Date(b.date) - new Date(a.date);
    });

  const handleAddNote = () => {
    setCurrentNote(null);
    setShowModal(true);
  };

  const handleEditNote = (note) => {
    setCurrentNote(note);
    setShowModal(true);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleToggleComplete = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, completed: !note.completed } : note
    ));
  };

  const handleSubmitNote = (note) => {
    if (note.id) {
      setNotes(notes.map(n => n.id === note.id ? note : n));
    } else {
      setNotes([{ ...note, id: Date.now() }, ...notes]);
    }
    setShowModal(false);
  };

  return (
    <div className="App" style={{ 
      minHeight: '100vh',
      backgroundColor: '#fff'
    }}>
      <Navbar onAddClick={handleAddNote} onSearch={setSearchTerm} />
      
      <div className="container py-4 px-5 bg-light" style={{ minHeight: 'calc(100vh - 56px)'}}>
        <h4 className="text-left mb-2 mx-2">Your Notes</h4>
        <div className="d-flex justify-content-between mb-4 algin-items-start">
          <div className="btn-group">
            {['ALL', 'PERSONAL', 'HOME', 'BUSINESS'].map(cat => (
              <span
                key={cat}
                className={`m-3 ${filterCategory === cat ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setFilterCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </span>
            ))}
          </div>
          
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="showCompleted"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
            />
            <label className="form-check-label mx-2" htmlFor="showCompleted">
              Show only completed notes
            </label>
          </div>
        </div>
        
        {filteredNotes.length === 0 ? (
          ""
        ) : (
          <div className="notes-container">
            {filteredNotes.map(note => (
              <Note
                key={note.id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        )}
      </div>
      
      {showModal && (
        <NoteModal
          show={showModal}
          onClose={() => setShowModal(false)}
          note={currentNote}
          onSubmit={handleSubmitNote}
          isEdit={!!currentNote}
        />
      )}
    </div>
  );
};

export default App;