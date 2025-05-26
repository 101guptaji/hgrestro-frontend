import mapImage from "../assets/MapIcon.png";
import clockImage from "../assets/ClockIcon.png";

const UserDetails = ({ deliveryTime }) => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    return (
        <div className='user-details'>
            <div className="user-info">
                <h4>Your details</h4>
                <p className="user-name">{userDetails.name}, {userDetails.phone}</p>

            </div>
            <div className="delivery-info">
                <div className="delivery-row">
                    <img src={mapImage} alt="Map" className='icon'/>
                    <span>{userDetails.address+", "+userDetails.pincode}</span>
                </div>
                <div className="delivery-row">
                    <img src={clockImage} alt="clock" className='icon'/>
                    <span>Delivery in <strong>{deliveryTime} mins</strong></span>
                </div>
            </div>
        </div>
    )
}

export default UserDetails