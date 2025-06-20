import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import '../styles/menuPage.css';

import MenuWelcome from '../components/MenuWelcome';
import FoodCard from '../components/FoodCard';
import CategoryItem from '../components/CategoryItem';

const CATEGORIES = [
  { id: 1, name: 'Burger', icon: '🍔' },
  { id: 2, name: 'Pizza', icon: '🍕' },
  { id: 3, name: 'Drink', icon: '🥤' },
  { id: 4, name: 'French fries', icon: '🍟' },
  { id: 5, name: 'Veggies', icon: '🥗' },
];

const MenuPage = () => {
  const navigate = useNavigate();

  // local states
  const [selectedCategory, setSelectedCategory] = useState('Pizza');
  const [debouncedInput, setDebouncedInput] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  // redux state
  const foodData = useSelector((state) => state.food.foods);
  const selectedItems = useSelector((state) => state.food.selectedItems);

  // memoize total price
  const totalPrice = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [selectedItems]);

  // Filter by selected category
  useEffect(() => {
    const filtered = foodData.filter((item) => item.category === selectedCategory);
    setFilteredItems(filtered);
  }, [foodData, selectedCategory]);

  // Filter by search input
  useEffect(() => {
    const filtered = foodData.filter(
      (item) =>
        item.name.toLowerCase().includes(debouncedInput.toLowerCase()) &&
        item.category === selectedCategory
    );
    setFilteredItems(filtered);
  }, [debouncedInput, foodData, selectedCategory]);

  return (
    <div className="menu-container">
      <header>
        <MenuWelcome setDebouncedInput={setDebouncedInput}/>

        <div className="categories">
          {CATEGORIES.map((category) => (
            <CategoryItem
              key={category.id}
              name={category.name}
              icon={category.icon}
              isActive={category.name === selectedCategory}
              handleClick={() => setSelectedCategory(category.name)} />
          ))}
        </div>
      </header>

      <div className="food-container">
        <h2>{selectedCategory}</h2>
        <div className="food-grid">
          {filteredItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="footer">
        <p>
          <strong>Total: ₹{totalPrice}</strong>
        </p>
        <button
          className="next-button"
          onClick={() => navigate('/cart')}
          disabled={selectedItems.length <= 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MenuPage;
