import { CiSearch } from "react-icons/ci";
import '../styles/menuWelcome.css'
import { useEffect, useState } from "react";

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
};

const MenuWelcome = ({ setDebouncedInput, cartSearch }) => {
    console.log('MenuWelcome received', { setDebouncedInput });

    const [searchInput, setSearchInput] = useState(cartSearch || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedInput(searchInput.trim().toLowerCase());
        }, 500);

        return () => clearTimeout(timer);
    }, [searchInput]);

    return (
        <div className="welcome-container">
            <h1>{getGreeting()}</h1>
            <p>Place your order here</p>
            <div className="search-bar">
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search"
                />
                <CiSearch className="search-icon" />
            </div>
        </div>
    )
}

export default MenuWelcome