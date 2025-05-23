import { createSlice } from '@reduxjs/toolkit';

import pizza1 from '../../assets/pizzas/California.jpeg'
import pizza2 from '../../assets/pizzas/Sicilian.jpg'
import pizza3 from '../../assets/pizzas/Greek.jpg'
import pizza4 from '../../assets/pizzas/Margherita.jpg'
import pizza5 from '../../assets/pizzas/Marinara.jpg'
import pizza6 from '../../assets/pizzas/Hawaiian.jpeg'

import veggieBurger from '../../assets/burgers/vegie_burger.avif'
import chickenBurger from '../../assets/burgers/Chicken Burger.avif'
import cheeseburger from '../../assets/burgers/cheeseburger.avif'
import kiwiBurger from '../../assets/burgers/Kiwiburger.jpg'
import chickpea_burger from '../../assets/burgers/chickpea_burger.avif'
import beanBurger from '../../assets/burgers/bean-burger.png'

import coffee from "../../assets/drinks/Coffee.jpg"
import cider from "../../assets/drinks/Cider.jpg"
import cola from "../../assets/drinks/Cola.jpg"
import expresso from "../../assets/drinks/Espresso.jpg"
import milkshake from "../../assets/drinks/Milkshake.jpeg"
import lemonade from "../../assets/drinks/Lemonade.jpeg"

import cheeseFries from "../../assets/fries/CheeseFries.jpg"
import chiliCheeseFries from "../../assets/fries/ChiliCheeseFries.jpg"
import garlicParmesanFries from "../../assets/fries/GarlicParmesanFries.jpg"
import loadedFries from "../../assets/fries/LoadedFries.jpg"
import shoestringFries from "../../assets/fries/ShoestringFries.jpg"
import sweetPotatoFries from "../../assets/fries/SweetPotatoFries.jpg"

import alooGobi from "../../assets/veggies/AlooGobi.jpg"
import chanaMasala from "../../assets/veggies/ChanaMasala.jpg"
import dalMakhani from "../../assets/veggies/DalMakhani.jpg"
import mushrooms from "../../assets/veggies/Mushrooms.jpg"
import palakPaneer from "../../assets/veggies/PalakPaneer.jpg"
import shahiPaneer from "../../assets/veggies/ShahiPaneer.jpg"

const initialState = {
  burger: [
    { id: 1, name: 'Veggie burger', price: 200, quantity: 0, image: veggieBurger },
    { id: 2, name: 'Chicken burger', price: 150, quantity: 0, image: chickenBurger },
    { id: 3, name: 'Cheeseburger', price: 90, quantity: 0, image: cheeseburger },
    { id: 4, name: 'Kiwiburger', price: 300, quantity: 0, image: kiwiBurger },
    { id: 5, name: 'Chickpea burger', price: 200, quantity: 0, image: chickpea_burger },
    { id: 6, name: 'Bean burger', price: 200, quantity: 0, image: beanBurger },
  ],
  pizza: [
    { id: 1, name: 'California', price: 200, quantity: 0, image: pizza1 },
    { id: 2, name: 'Sicilian', price: 150, quantity: 0, image: pizza2 },
    { id: 3, name: 'Greek', price: 90, quantity: 0, image: pizza3 },
    { id: 4, name: 'Margherita', price: 300, quantity: 0, image: pizza4 },
    { id: 5, name: 'Marinara', price: 200, quantity: 0, image: pizza5 },
    { id: 6, name: 'Hawaiian', price: 200, quantity: 0, image: pizza6 },
  ],
  drink: [
    { id: 1, name: 'Coffee', price: 200, quantity: 0, image: coffee },
    { id: 2, name: 'Cider', price: 150, quantity: 0, image: cider },
    { id: 3, name: 'Cola', price: 90, quantity: 0, image: cola },
    { id: 4, name: 'Espresso', price: 300, quantity: 0, image: expresso },
    { id: 5, name: 'Milkshake', price: 200, quantity: 0, image: milkshake },
    { id: 6, name: 'Lemonade', price: 200, quantity: 0, image: lemonade },
  ],
  frenchfries: [
    { id: 1, name: 'Cheese', price: 200, quantity: 0, image: cheeseFries },
    { id: 2, name: 'Chili Cheese', price: 150, quantity: 0, image: chiliCheeseFries },
    { id: 3, name: 'Loaded', price: 90, quantity: 0, image: loadedFries },
    { id: 4, name: 'Garlic Parmesan', price: 300, quantity: 0, image: garlicParmesanFries },
    { id: 5, name: 'Sweet Potato', price: 200, quantity: 0, image: sweetPotatoFries },
    { id: 6, name: 'Shoestring', price: 200, quantity: 0, image: shoestringFries },
  ],
  veggies: [
    { id: 1, name: 'Palak Paneer', price: 150, quantity: 0, image: palakPaneer },
    { id: 2, name: 'Chana Masala', price: 70, quantity: 0, image: chanaMasala },
    { id: 3, name: 'Aloo Gobi', price: 90, quantity: 0, image: alooGobi },
    { id: 4, name: 'Mushrooms', price: 60, quantity: 0, image: mushrooms },
    { id: 5, name: 'Dal Makhani', price: 100, quantity: 0, image: dalMakhani },
    { id: 6, name: 'Shahi Paneer', price: 120, quantity: 0, image: shahiPaneer },
  ],
  selectedItems: [],
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    incrementQuantity: (state, action) => {
      const { category, id } = action.payload;
      const item = state[category].find(i => i.id === id);
      if (item) {
        item.quantity += 1;
        const exists = state.selectedItems.find(x => x.id === id && x.category === category);
        if (!exists) {
          state.selectedItems.push({ ...item, category });
        } else {
          exists.quantity = item.quantity;
        }
      }
    },

    decrementQuantity: (state, action) => {
      const { category, id } = action.payload;
      const item = state[category].find(i => i.id === id);
      if (item && item.quantity > 0) {
        item.quantity -= 1; 

        const index = state.selectedItems.findIndex(x => x.id === id && x.category === category);
        if (index!==-1) {
          if(state.selectedItems[index].quantity <= 1){
            state.selectedItems.splice(index, 1);
          }
          else{
            state.selectedItems[index].quantity -= 1;
          }
        }
      }
    },
    
  }
});

export const { incrementQuantity, decrementQuantity } = foodSlice.actions;
export default foodSlice.reducer;
