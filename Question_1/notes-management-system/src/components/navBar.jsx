import { useState } from 'react';

const Navbar = ({onAddClick,onSearch}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };
  return (
    <nav className="navbar bg-white px-4 py-3">
      <div className="container d-flex align-items-center gap-0"> 
        <div className="position-relative" style={{ width: '85%' }}>
          <i className="bi bi-search position-absolute top-50 translate-middle-y ms-3 text-secondary"></i>
          <input
            type="text"
            className="form-control ps-5"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            style={{
              borderRadius: '8px',
              backgroundColor: '#f8f9fa',
              outline: 'none',
              border: 'none',
              height: '40px',
              fontSize: '14px'
            }}
          />
        </div>
        <button
          className="btn d-flex align-items-center justify-content-center"
          onClick={onAddClick}
          style={{ 
            borderRadius: '50px',
            height: '40px',
            backgroundColor: '#86b7fe',
            color: 'white',
            border: 'none',
            minWidth: '80px',
            gap: '7px', 
            marginRight: '95px',
          }}
        >
          <i className="bi bi-plus-lg" style={{ fontSize: '14px' }}></i>
          <span>Add</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;