import {useState} from 'react'
import axios from 'axios';

const NewTableCard = ({tableCounter, setShowDialog, getTables}) => {
    const [formData, setFormData] = useState({
        tableNo: tableCounter+ 1,
        tableName: '',
        isReserved: false,
        numberOfChairs: 3
    })
    async function handleAddTable(e) {
        e.preventDefault();
        // console.log(formData);

        try {
            const res = await axios.post(`https://hgrestro-backend.onrender.com/api/table`, formData);
            // console.log(res);
            if (res.status !== 201) {
                throw new Error("Table has not added.");
            }
            setShowDialog(false);

            getTables();

            setFormData({
                tableNo: tableCounter + 1,
                tableName: '',
                isReserved: false,
                numberOfChairs: 3
            });

        }
        catch (error) {
            console.log("Error in adding new table: ", error);
        }

    }

    return (
        <div className="new-table-dialog">
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
    )
}

export default NewTableCard