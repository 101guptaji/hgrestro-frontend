import { useState } from 'react'
import '../styles/menuPage.css'
import FoodGridContainer from '../components/FoodGridContainer'
import { useSelector } from 'react-redux';
import UserForm from '../components/UserForm';
import MenuWelcome from '../components/MenuWelcome';

const MenuPage = () => {
  const [selected, setSelected] = useState("Pizza");
  const foodData = useSelector(state => state.food.foods);

  const [showModal, setShowModal] = useState(false);
  

  const selectedItems = useSelector(state => state.food.selectedItems);
  const totalPrice = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const categories = [
    { id: 1, name: 'Burger', icon: '🍔' },
    { id: 2, name: 'Pizza', icon: '🍕' },
    { id: 3, name: 'Drink', icon: '🥤' },
    { id: 4, name: 'French fries', icon: '🍟' },
    { id: 5, name: 'Veggies', icon: '🥗' },
  ];

  return (
    <div className="container">
      <header>
        <MenuWelcome />

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
        <FoodGridContainer foodName={selected} foodItems={foodData.filter(item=>item.category===selected)}/>
      </main>

      <footer>
        <p><strong>Total: ₹{totalPrice}</strong></p>
        <button className="next-button" onClick={() => setShowModal(true)} disabled={selectedItems.length === 0}>Next</button>
      </footer>

      {showModal && (
        <UserForm setShowModal={setShowModal}/>
      )}
    </div>
  );
};

export default MenuPage;