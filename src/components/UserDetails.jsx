import mapImage from "../assets/MapIcon.png";
import clockImage from "../assets/ClockIcon.png";

const UserDetails = ({ user, setUser, address, setAddress, deliveryTime, orderType }) => {

    return (
        <div className='user-details'>
            <div className="user-info">
                <h4>Your details</h4>
                <input
                    required
                    autoFocus
                    id="userName"
                    type="text"
                    value={user.userName}
                    name="userName"
                    placeholder="Enter Name"
                    onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} />,
                <input
                    required
                    autoFocus
                    id="userPhone"
                    type="number"
                    value={user.userPhone}
                    name="userPhone"
                    placeholder="Enter Phone No."
                    onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} />

            </div>
            <div className="delivery-info">
                {
                    orderType === 'takeAway' &&
                    <div className="delivery-row">
                        <img src={mapImage} alt="Map" className='icon' />
                        <input
                            autoFocus
                            id="address"
                            type="text"
                            value={address}
                            name="address"
                            placeholder="Enter Delivery Address"
                            onChange={(e) => setAddress(e.target.value)} />
                    </div>
                }

                <div className="delivery-row">
                    <img src={clockImage} alt="clock" className='icon' />
                    <span>Delivery in <strong>{deliveryTime} mins</strong></span>
                </div>
            </div>
        </div>
    )
}

export default UserDetails