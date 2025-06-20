import { useState, useEffect } from 'react';
import axios from 'axios';

import '../styles/tablePage.css';

import Sidebar from '../components/Sidebar';
import NewTableCard from '../components/NewTableCard';
import TableCard from '../components/TableCard';
import useDebounce from '../hooks/useDebounce';

const TablesPage = () => {
  const [tables, setTables] = useState([]);
  const [tableCounter, setTableCounter] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [filteredTables, setFilteredTables] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  const debouncedInput = useDebounce(searchInput.trim().toLowerCase(), 300);

  const getTables = async () => {
    try {
      const res = await axios.get('https://hgrestro-backend.onrender.com/api/table');
      const data = res.data;

      setTables(data);
      setTableCounter(data[data.length - 1]?.tableNo || 0);
    }
    catch (error) {
      console.error('Error in getting table data:', error);
    }
  };

  const handleDeleteTable = async (id) => {
    try {
      await axios.delete(`https://hgrestro-backend.onrender.com/api/table/${id}`);
      getTables();
    }
    catch (error) {
      console.error('Error in deleting the table:', error);
    }
  };

  useEffect(() => {
    getTables();
  }, []);

  useEffect(() => {
    const filtered = tables.filter((table) => {
      const tableNo = table?.tableNo?.toString().padStart(2, '0');
      const reservedText = table?.isReserved ? 'reserved' : 'available';

      return (
        tableNo?.includes(debouncedInput) ||
        reservedText.includes(debouncedInput)
      );
    });

    setFilteredTables(filtered);
  }, [debouncedInput, tables]);

  return (
    <div className="tables-container">
      <Sidebar selected="tables" />

      {/* Search Bar */}
      <div className="search-box">
        <div className="search-input">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Table Number or Available"
          />
        </div>
      </div>

      <div className="tables-main">
        <h2>Tables</h2>

        <div className="tables-grid">
          {filteredTables.map((table) => (
            <TableCard 
              key={table._id} 
              table={table} 
              handleDelete={() => handleDeleteTable(table._id)} />
          ))}

          <button className="newtable-btn">
            <span onClick={() => setShowDialog(!showDialog)}>+</span>
          </button>

          {showDialog && (
            <NewTableCard
              tableCounter={tableCounter}
              setShowDialog={setShowDialog}
              getTables={getTables}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TablesPage;
