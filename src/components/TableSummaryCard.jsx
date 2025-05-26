import React from 'react'

const TableSummaryCard = ({ tables }) => {
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
                    {tables && tables.map((table, index)=>(
                        <div key={index} className={`table-item ${table.isReserved? 'reserved' : ''}`}>
                            <p className="tableName">{table.tableName}</p>
                            <h4 className="tableNo">{table.tableNo.toString().padStart(2, "0")}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default TableSummaryCard