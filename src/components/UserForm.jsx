import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const UserForm = ({ setShowModal }) => {
    const [formData, setFormData] = useState({ name: "", phone: "", address: "", pincode: "" });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("userDetails", JSON.stringify(formData));
        setShowModal(false);
        navigate("/cart");
    };

    useEffect(() => {
        const storedDetails = JSON.parse(localStorage.getItem("userDetails"));
        if (storedDetails) {
            setFormData({
                name: storedDetails.name || "",
                phone: storedDetails.phone || "",
                address: storedDetails.address || "",
                pincode: storedDetails.pincode || "",
            });
        }
    }, []);

    return (
        <div className="modal-container">
            <div className="modal">
                <h2>Enter Delivery Details</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    <input type="number" placeholder="Phone" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    <input type="text" placeholder="Address" required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                    <input type="number" placeholder="Pincode" required value={formData.pincode} onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} />
                    <div className="btns">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default UserForm