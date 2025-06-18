import React from 'react'

const CategoryItem = ({ name, icon, isActive, handleClick }) => {
    return (
        <div
            className={`category-item ${isActive ? 'active' : ''}`}
            onClick={handleClick}
        >
            <span className="category-icon">{icon}</span>
            <span className="category-name">{name}</span>
        </div>
    )
}

export default CategoryItem