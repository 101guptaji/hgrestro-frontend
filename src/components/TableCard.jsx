import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaChair } from 'react-icons/fa';

const TableCard = ({table, handleDelete}) => {
    return (
        <div className="table-box">
            <button
                className="delete-btn"
                onClick={handleDelete}
                disabled={table.isReserved}
            >
                <RiDeleteBin6Line />
            </button>

            <p>{table.tableName}</p>
            <h4>{String(table.tableNo)?.padStart(2, '0')}</h4>

            <div className="chairs">
                <FaChair />
                <span>{table.numberOfChairs}</span>
            </div>
        </div>
    )
}

export default TableCard