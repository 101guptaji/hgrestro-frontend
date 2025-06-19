import { useEffect, useState } from 'react'
import axios from 'axios';

const TableSummaryCard = () => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        async function getTables() {
            try {
                const res = await axios.get(`https://hgrestro-backend.onrender.com/api/table`);
                const data = res.data;
                // console.log(data)

                setTables(data);
            }
            catch (error) {
                console.log("Error in getting table data: ", error);
            }
        }

        getTables();
    }, []);

    return (
        <div className='chart-container'>
            <div className="table-header">
                <h2>Tables</h2>
                <div className="table-status">
                    <div className="status-item">
                        <div className='dot green'></div>
                        <span>Reserved</span>
                    </div>
                    <div className="status-item">
                        <div className='dot white'></div>
                        <span>Available</span>
                    </div>
                </div>
            </div>

            <div className="chart-summary">
                <div className="tables-grid">
                    {tables && tables.map((table) => (
                        <div key={table._id} className={`table-item ${table.isReserved ? 'reserved' : ''}`}>
                            <p className="tableName">{table.tableName}</p>
                            <h4 className="tableNo">{String(table.tableNo).padStart(2, "0")}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default TableSummaryCard