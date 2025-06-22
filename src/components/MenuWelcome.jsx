import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import '../styles/menuWelcome.css'

import useDebounce from '../hooks/useDebounce';

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
};

const MenuWelcome = ({ setDebouncedInput }) => {
    const [searchParams] = useSearchParams();

    const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedInput(searchInput.trim().toLowerCase());
        }, 500);

        return () => clearTimeout(timer);
    }, [searchInput, setDebouncedInput]);

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