import { useState } from 'react';
import '../styles/cookingInstuctionModal.css';

const CookingInstuctionModal = ({ setShowModal, setCookingInstructions }) => {
    const [instructions, setInstructions] = useState();
    const handleClose = () => {
        setShowModal(false);
    };

    const handleNext = () => {
        // Handle next action
        setCookingInstructions(instructions);
        setShowModal(false);
    };

    return (
        <div className="cooking-modal-container">
            <div className="cooking-modal">
                <button className="close-button" onClick={handleClose}>×</button>
                <div className="cooking-content">
                    <h3>Add Cooking instructions</h3>
                    <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        autoFocus
                    />
                    <p>
                        The restaurant will try its best to follow your request. However,
                        refunds or cancellations in this regard won't be possible
                    </p>
                </div>

                <div className="cooking-btns">
                    <button className="cancel-btn" onClick={handleClose}>
                        Cancel
                    </button>
                    <button className="next-btn" onClick={handleNext}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookingInstuctionModal