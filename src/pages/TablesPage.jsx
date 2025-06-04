import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import '../styles/tablePage.css'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaChair } from "react-icons/fa";
import axios from 'axios'
import NewTableCard from '../components/NewTableCard';

const TablesPage = () => {
  const [tables, setTables] = useState([]);
  const [tableCounter, setTableCounter] = useState(0);

  const [searchInput, setSearchInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState('');
  const [filteredTables, setFilteredTables] = useState([]);

  const [showDialog, setShowDialog] = useState(false);

  async function getTables() {
    try {
      const res = await axios.get(`https://hgrestro-backend.onrender.com/api/table`);
      const data = res.data;
      // console.log(data)

      setTables(data);
      setTableCounter(data[data.length - 1].tableNo);
    }
    catch (error) {
      console.log("Error in getting table data: ", error);
    }
  }

  useEffect(() => {
    getTables();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(searchInput.trim().toLowerCase());
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const filtered = tables.filter(table => {
      const tableNo = table.tableNo?.toString().padStart(2, '0');
      const reservedText = table.isReserved ? 'reserved' : 'available';

      return (
        tableNo.includes(debouncedInput) ||
        reservedText.includes(debouncedInput)
      );
    });

    setFilteredTables(filtered);
  }, [debouncedInput, tables]);

  async function handleDeleteTable(id) {
    // console.log(id);
    try {
      await axios.delete(`https://hgrestro-backend.onrender.com/api/table/${id}`);

      getTables();
    }
    catch (error) {
      console.log("Error in deleting the table: ", error);
    }
  }

  return (
    <div className='tables-container'>
      <Sidebar selected={"tables"} />

      {/* Search bar */}
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
          {
            filteredTables && filteredTables.map((table) => (
              <div className='table-box' key={table._id}>
                <button className='delete-btn' onClick={() => handleDeleteTable(table._id)} disabled={table.isReserved}><RiDeleteBin6Line /></button>

                <p>{table.tableName}</p>
                <h4>{table.tableNo.toString().padStart(2, "0")}</h4>

                <div className="chairs">
                  <FaChair />
                  <span>{table.numberOfChairs}</span>
                </div>
              </div>
            ))
          }

          <button className='newtable-btn'>
            <span onClick={() => setShowDialog(!showDialog)}>+</span>
          </button>

          {
            showDialog && <NewTableCard tableCounter={tableCounter} setShowDialog={setShowDialog} getTables={getTables} />
          }

        </div>


      </div>

    </div>
  )
}

export default TablesPage