import { useNavigate } from 'react-router-dom';
import { MdDashboard, MdChair, MdBarChart } from "react-icons/md";
import { BiSolidFoodMenu } from "react-icons/bi";
import '../styles/sidebar.css';

const Sidebar = ({ selected }) => {
    const navigate = useNavigate();

    function handleClick(menu) {
        navigate(`/${menu}`);
    }

    return (
        <div className="sidebar-container">
            <div className="whiteRound" />
            <div className='sideBar'>
                <div
                    className={`icon ${selected === 'dashboard' ? 'active' : ''}`}
                    style={{ top: '10px' }}
                    onClick={() => handleClick('dashboard')}>
                    <MdDashboard />
                </div>
                <div
                    className={`icon ${selected === 'tables' ? 'active' : ''}`}
                    style={{ top: '70px' }}
                    onClick={() => handleClick('tables')}>
                    <MdChair />
                </div>
                <div
                    className={`icon ${selected === 'orders' ? 'active' : ''}`}
                    style={{ top: '130px' }}
                    onClick={() => handleClick('orders')}>
                    <BiSolidFoodMenu />
                </div>
                <div
                    className={`icon ${selected === 'menumanagement' ? 'active' : ''}`}
                    style={{ top: '190px' }}
                    onClick={() => handleClick('menumanagement')}>
                    <MdBarChart />
                </div>

                <div className="icon last" />
            </div>
        </div>
    )
}

export default Sidebar