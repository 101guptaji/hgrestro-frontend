import { useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity } from '../redux/Slices/foodSlice';

const FoodGridContainer = ({ foodName, foodItems}) => {
  const dispatch = useDispatch();

  const handleIncreament = (itemId) => {
    dispatch(incrementQuantity({id: itemId }));
  };

  const handleDecreament = (itemId) => {
    dispatch(decrementQuantity({id: itemId }));
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
                {item.quantity > 0 ? (
                  <div className="food-quantity-btns">
                    <button className="minus-button" onClick={() => handleDecreament(item.id)}>-</button>
                    <p>{item.quantity}</p>
                    <button className="plus-button" onClick={() => handleIncreament(item.id)}>+</button>
                  </div>
                ) : (
                  <button className="plus-button" style={{ border: "none", fontSize: "24px" }} onClick={() => handleIncreament(item.id)}>+</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodGridContainer;
