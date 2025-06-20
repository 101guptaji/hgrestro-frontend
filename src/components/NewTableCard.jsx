import { useState } from 'react';
import axios from 'axios';

const NewTableCard = ({ tableCounter, setShowDialog, getTables }) => {
  const [formData, setFormData] = useState({
    tableNo: tableCounter + 1,
    tableName: '',
    isReserved: false,
    numberOfChairs: 3,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTable = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'https://hgrestro-backend.onrender.com/api/table',
        formData
      );

      if (res.status !== 201) {
        throw new Error('Table was not added.');
      }

      setShowDialog(false);
      getTables();

      // Reset form
      setFormData({
        tableNo: tableCounter + 1,
        tableName: '',
        isReserved: false,
        numberOfChairs: 3,
      });
    } catch (error) {
      console.error('Error in adding new table:', error);
    }
  };

  return (
    <div className="new-table-dialog">
      <form onSubmit={handleAddTable}>
        <input
          autoFocus
          type="text"
          name="tableName"
          id="tableName"
          placeholder="Table name (optional)"
          value={formData.tableName}
          onChange={handleChange}
        />

        <input
          type="number"
          name="tableNo"
          id="tableNo"
          value={formData.tableNo}
          disabled
          onChange={handleChange}
        />

        <div id="chair-label">Chairs</div>
        <div>
          <select
            name="numberOfChairs"
            id="chairs"
            value={String(formData.numberOfChairs).padStart(2, '0')}
            onChange={handleChange}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={String(i + 1).padStart(2, '0')}>
                {String(i + 1).padStart(2, '0')}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewTableCard;
