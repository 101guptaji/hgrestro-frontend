const PriceBreakdown = ({ orderType, deliveryCharge, taxes, itemTotal, grandTotal }) => {

    return (
        <div className="price-breakdown">
            <div className="price-row">
                <span>Item Total</span>
                <span>₹{itemTotal}.00</span>
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
                <span>₹{grandTotal}.00</span>
            </div>
        </div>
    )
}

export default PriceBreakdown