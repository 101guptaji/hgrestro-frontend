import { useSelector } from 'react-redux';
import mapImage from "../assets/MapIcon.png";
import clockImage from "../assets/ClockIcon.png";

const UserDetails = ({ deliveryTime }) => {
    const userDetails = useSelector(state => state.food.userDetails);
    return (
        <div className='user-details'>
            <div className="user-info">
                <h4>Your details</h4>
                <p className="user-name">{userDetails.userName}, {userDetails.userPhone}</p>

            </div>
            <div className="delivery-info">
                <div className="delivery-row">
                    <img src={mapImage} alt="Map" className='icon' width={12} />
                    {userDetails.deliveryAddress}
                </div>
                <div className="delivery-row">
                    <img src={clockImage} alt="clock" className='icon' width={12} />
                    Delivery in <strong>{deliveryTime} mins</strong>
                </div>
            </div>
        </div>
    )
}

export default UserDetails