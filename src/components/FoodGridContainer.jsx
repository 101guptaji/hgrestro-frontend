import FoodCard from './FoodCard';

const FoodGridContainer = ({ foodName, foodItems }) => {
  // const folder = {
  //   "Pizza": "pizzas",
  //   "Burger": "burgers",
  //   "Drink": "drinks",
  //   "French fries": "fries",
  //   "Veggies": "veggies"
  // }

  return (
    <div className='food-container'>
      <h2>{foodName}</h2>
      <div className="food-grid">
        {foodItems.map(item => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FoodGridContainer;
