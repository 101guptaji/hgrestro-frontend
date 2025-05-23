import {useState } from 'react'
import '../styles/menuPage.css'
import FoodGridContainer from '../components/FoodGridContainer'

import { useSelector } from 'react-redux';

const MenuPage = () => {
  const [selected, setSelected] = useState("Pizza");
  const foodData = useSelector(state => state.food);

  const selectedItems = useSelector(state => state.food.selectedItems);

  const totalPrice = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const categories = [
    { id: 1, name: 'Burger', icon: '🍔' },
    { id: 2, name: 'Pizza', icon: '🍕' },
    { id: 3, name: 'Drink', icon: '🥤' },
    { id: 4, name: 'French fries', icon: '🍟' },
    { id: 5, name: 'Veggies', icon: '🥗' },
  ];

  const foods = {
    Pizza: foodData.pizza,
    Burger: foodData.burger,
    Drink: foodData.drink,
    "French fries": foodData.frenchfries,
    "Veggies": foodData.veggies
  };

  return (
    <div className="container">
      <header>
        <h1>Good evening</h1>
        <p>Place your order here</p>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
        </div>

        <div className="categories">
          {categories.map(category => (
            <div key={category.id}
              className={`category-item ${category.name === selected ? 'active' : ''}`}
              onClick={() => setSelected(category.name)}>
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </div>
          ))}
        </div>
      </header>

      <main>
        <FoodGridContainer foodName={selected} foodItems={foods[selected]} category={selected} />
      </main>

      <footer>
         <p><strong>Total: ₹{totalPrice}</strong></p>
        <button className="next-button">Next</button>
      </footer>
    </div>
  );
};

export default MenuPage;