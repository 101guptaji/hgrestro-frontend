import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import '../styles/tablePage.css'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaChair } from "react-icons/fa";
import axios from 'axios'

const TablesPage = () => {
  const [tables, setTables] = useState([]);

  const [searchInput, setSearchInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState('');
  const [filteredTables, setFilteredTables] = useState([]);

  async function getTables() {
    try {
      const res = await axios.get("http://localhost:8080/api/table");
      const data = res.data;
      // console.log(data)

      setTables(data);
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


  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    tableNo: tables.length + 1,
    tableName: '',
    isReserved: false,
    numberOfChairs: 3
  })

  function handleDialog() {
    setShowDialog(!showDialog);
    setFormData({
      tableNo: tables[tables.length - 1].tableNo + 1,
      tableName: '',
      isReserved: false,
      numberOfChairs: 3
    })
  }

  async function handleAddTable(e) {
    e.preventDefault();
    // console.log(formData);

    try {
      const res = await axios.post("http://localhost:8080/api/table", formData);
      // console.log(res);
      if (res.status !== 201) {
        throw new Error("Table has not added.");
      }
      setShowDialog(false);

      getTables();

      setFormData({
        tableNo: tables.length + 1,
        tableName: '',
        isReserved: false,
        numberOfChairs: 3
      });

    }
    catch (error) {
      console.log("Error in adding new table: ", error);
    }

  }

  async function handleDeleteTable(id) {
    // console.log(id);
    try {
      const res = await axios.delete(`http://localhost:8080/api/table/${id}`);
      // console.log(res);

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
            placeholder="Search"
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
            <span onClick={handleDialog}>+</span>
          </button>

          {
            showDialog && <div className="new-table-dialog">
              <form>
                <input
                  autoFocus
                  type="text"
                  name="tableName"
                  id="tableName"
                  placeholder='Table name (optional)'
                  value={formData.tableName}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                <input
                  disabled
                  type="number"
                  name='tableNo'
                  id='tableNo'
                  value={formData.tableNo}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />

                <div id='chair-label'>Chairs</div>
                <div>
                  <select
                    name="numberOfChairs"
                    id="chairs"
                    defaultValue={String(3).padStart(2, "0")}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}>
                    {Array.from({ length: 10 }, (_, i) => (
                      <option
                        key={i + 1}
                        value={String(i + 1).padStart(2, "0")}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                </div>
                <button type='submit' onClick={handleAddTable}>Create</button>
              </form>
            </div>
          }

        </div>


      </div>

    </div>
  )
}

export default TablesPage