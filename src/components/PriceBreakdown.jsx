import { useSelector } from 'react-redux';

const PriceBreakdown = ({ orderType }) => {
    const selectedItems = useSelector(state => state.food.selectedItems);

    const deliveryCharge = 50;
    const taxes = 5;

    const calculateTotal = () => {
        const itemTotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const grandTotal = itemTotal + taxes + (orderType === 'takeAway' ? deliveryCharge : 0);
        return {
            itemTotal,
            grandTotal
        };
    };

    return (
        <div className="price-breakdown">
            <div className="price-row">
                <span>Item Total</span>
                <span>₹{calculateTotal().itemTotal}.00</span>
            </div>
            <div className="price-row">
                <span>Taxes</span>
                <span>₹{taxes}.00</span>
            </div>

            {orderType === 'takeAway' && (
                <>
                    <div className="price-row">
                        <span>Delivery Charge</span>
                        <span>₹{deliveryCharge}.00</span>
                    </div>

                </>
            )}

            <div className="price-row total">
                <span>Grand Total</span>
                <span>₹{calculateTotal().grandTotal}.00</span>
            </div>
        </div>
    )
}

export default PriceBreakdown