import { SearchIcon } from "lucide-react";
import '../styles/menuWelcome.css'

const MenuWelcome = () => {
    return (
        <div className="welcome-container">
            <h1>Good evening</h1>
            <p>Place your order here</p>
            <div className="search-bar">
                <input type="text" placeholder="Search" />
                <SearchIcon className="search-icon" />
            </div>
        </div>
    )
}

export default MenuWelcome