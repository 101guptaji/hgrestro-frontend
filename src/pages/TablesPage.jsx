import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import '../styles/tablePage.css'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaChair } from "react-icons/fa";

const TablesPage = () => {
  const [tables, setTables] = useState(
    [
      { tableNo: 1, tableName: "Table", isReserved: false, numberOfChairs: 3 },
      { tableNo: 2, tableName: "Table", isReserved: true, numberOfChairs: 3 },
      { tableNo: 3, tableName: "Table", isReserved: true, numberOfChairs: 3 },
      { tableNo: 4, tableName: "Table", isReserved: false, numberOfChairs: 3 },
      { tableNo: 5, tableName: "Table", isReserved: true, numberOfChairs: 3 },
      { tableNo: 6, tableName: "Table", isReserved: false, numberOfChairs: 3 },
      { tableNo: 7, tableName: "Table", isReserved: false, numberOfChairs: 3 },
      { tableNo: 8, tableName: "Table", isReserved: true, numberOfChairs: 3 },
      { tableNo: 9, tableName: "Table", isReserved: true, numberOfChairs: 3 },
      { tableNo: 10, tableName: "Table", isReserved: false, numberOfChairs: 3 },
      { tableNo: 11, tableName: "Table", isReserved: true, numberOfChairs: 3 },
      { tableNo: 12, tableName: "Table", isReserved: false, numberOfChairs: 3 },
      { tableNo: 13, tableName: "Table", isReserved: false, numberOfChairs: 3 },
      { tableNo: 14, tableName: "Table", isReserved: true, numberOfChairs: 3 },
      { tableNo: 15, tableName: "Table", isReserved: true, numberOfChairs: 3 },
      { tableNo: 16, tableName: "Table", isReserved: false, numberOfChairs: 3 },
    ]);


  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    tableNo: tables.length + 1,
    tableName: '',
    isReserved: false,
    numberOfChairs: 3
  })

  function handleNewTable(e) {
    e.preventDefault();
    console.log(formData);

    setTables([...tables, formData]);
    setFormData({
      tableNo: tables.length + 1,
      tableName: '',
      isReserved: false,
      numberOfChairs: 3
    });
    setShowDialog(false);
  }

  function handleDeleteTable(index) {
    console.log(index);
    if (index >= 0 && index < tables.length) {
      setTables(tables.filter((t, i) => i !== index));
      console.log(tables)
    }
  }

  return (
    <div className='tables-container'>
      <Sidebar selected={"tables"} />

      {/* Search filter */}
      <div className="search-box">
        <div className="search-input">
          <input
            type="text"
            placeholder='Search' />
        </div>
      </div>

      <div className="tables-main">
        <h2>Tables</h2>

        <div className="tables-grid">
          {
            tables && tables.map((table, index) => (
              <div className='table-box' key={index}>
                <button className='delete-btn' onClick={() => handleDeleteTable(index)}><RiDeleteBin6Line /></button>

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
                <button type='submit' onClick={handleNewTable}>Create</button>
              </form>
            </div>
          }

        </div>


      </div>

    </div>
  )
}

export default TablesPage