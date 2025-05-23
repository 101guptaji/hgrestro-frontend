import React from 'react';
import { useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity } from '../redux/Slices/foodSlice';

const FoodGridContainer = ({ foodName, foodItems, category }) => {
  const dispatch = useDispatch();

  const handleIncreament = (itemId) => {
    dispatch(incrementQuantity({ category: category.toLowerCase().replace(' ', ''), id: itemId }));
  };

  const handleDecreament = (itemId) => {
    dispatch(decrementQuantity({ category: category.toLowerCase().replace(' ', ''), id: itemId }));
  }

  return (
    <div className='food-container'>
      <h2>{foodName}</h2>
      <div className="food-grid">
        {foodItems.map(item => (
          <div key={item.id} className="food-card">
            <img src={item.image} alt={item.name} />
            <div className="food-info">
              <h3>{item.name}</h3>
              <div className="food-price">
                <p>₹ {item.price}</p>
                <div className='food-quanity-btns'>
                  {item.quantity > 0 && <button className="minus-button" onClick={() => handleDecreament(item.id)}>-</button>}
                  {item.quantity > 0 && <p>{item.quantity}</p>}
                  <button className="add-button" onClick={() => handleIncreament(item.id)}>+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodGridContainer;
