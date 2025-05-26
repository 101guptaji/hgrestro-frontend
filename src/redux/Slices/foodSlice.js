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
  foods:[
    { id: 1, name: 'Veggie burger', category: "Burger", bakingTime: 20, price: 200, quantity: 0, image: veggieBurger },
    { id: 2, name: 'Chicken burger',  category: "Burger", bakingTime: 20, price: 150, quantity: 0, image: chickenBurger },
    { id: 3, name: 'Cheeseburger',  category: "Burger", bakingTime: 20, price: 90, quantity: 0, image: cheeseburger },
    { id: 4, name: 'Kiwiburger',  category: "Burger", bakingTime: 20, price: 300, quantity: 0, image: kiwiBurger },
    { id: 5, name: 'Chickpea burger',  category: "Burger", bakingTime: 20, price: 200, quantity: 0, image: chickpea_burger },
    { id: 6, name: 'Bean burger',  category: "Burger", bakingTime: 20, price: 200, quantity: 0, image: beanBurger },

    { id: 7, name: 'California',  category: "Pizza", bakingTime: 30, price: 200, quantity: 0, image: pizza1 },
    { id: 8, name: 'Sicilian', category: "Pizza", bakingTime: 30, price: 150, quantity: 0, image: pizza2 },
    { id: 9, name: 'Greek', category: "Pizza", bakingTime: 30, price: 90, quantity: 0, image: pizza3 },
    { id: 10, name: 'Margherita', category: "Pizza", bakingTime: 30, price: 300, quantity: 0, image: pizza4 },
    { id: 11, name: 'Marinara', category: "Pizza", bakingTime: 30, price: 200, quantity: 0, image: pizza5 },
    { id: 12, name: 'Hawaiian', category: "Pizza", bakingTime: 30, price: 200, quantity: 0, image: pizza6 },

    { id: 13, name: 'Coffee', category: "Drink", bakingTime: 10, price: 200, quantity: 0, image: coffee },
    { id: 14, name: 'Cider', category: "Drink", bakingTime: 10, price: 150, quantity: 0, image: cider },
    { id: 15, name: 'Cola', category: "Drink", bakingTime: 10, price: 90, quantity: 0, image: cola },
    { id: 16, name: 'Espresso', category: "Drink", bakingTime: 10, price: 300, quantity: 0, image: expresso },
    { id: 17, name: 'Milkshake', category: "Drink", bakingTime: 10, price: 200, quantity: 0, image: milkshake },
    { id: 18, name: 'Lemonade', category: "Drink", bakingTime: 10, price: 200, quantity: 0, image: lemonade },

    { id: 19, name: 'Cheese', category: "French fries", bakingTime: 10, price: 200, quantity: 0, image: cheeseFries },
    { id: 20, name: 'Chili Cheese', category: "French fries", bakingTime: 10, price: 150, quantity: 0, image: chiliCheeseFries },
    { id: 21, name: 'Loaded', category: "French fries", bakingTime: 10, price: 90, quantity: 0, image: loadedFries },
    { id: 22, name: 'Garlic Parmesan', category: "French fries", bakingTime: 10, price: 300, quantity: 0, image: garlicParmesanFries },
    { id: 23, name: 'Sweet Potato', category: "French fries", bakingTime: 10, price: 200, quantity: 0, image: sweetPotatoFries },
    { id: 24, name: 'Shoestring', category: "French fries", bakingTime: 10, price: 200, quantity: 0, image: shoestringFries },

    { id: 25, name: 'Palak Paneer', category: "Veggies", bakingTime: 10, price: 150, quantity: 0, image: palakPaneer },
    { id: 26, name: 'Chana Masala', category: "Veggies", bakingTime: 10, price: 70, quantity: 0, image: chanaMasala },
    { id: 27, name: 'Aloo Gobi', category: "Veggies", bakingTime: 10, price: 90, quantity: 0, image: alooGobi },
    { id: 28, name: 'Mushrooms', category: "Veggies", bakingTime: 10, price: 60, quantity: 0, image: mushrooms },
    { id: 29, name: 'Dal Makhani', category: "Veggies", bakingTime: 10, price: 100, quantity: 0, image: dalMakhani },
    { id: 30, name: 'Shahi Paneer', category: "Veggies", bakingTime: 10, price: 120, quantity: 0, image: shahiPaneer },
  ],
  selectedItems: [],
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    incrementQuantity: (state, action) => {
      const { id } = action.payload;
      const item = state.foods.find(i => i.id === id);
      if (item) {
        item.quantity += 1;
        const exists = state.selectedItems.find(x => x.id === id && x.category === item.category);
        if (!exists) {
          state.selectedItems.push({ ...item});
        } else {
          exists.quantity = item.quantity;
        }
      }
    },

    decrementQuantity: (state, action) => {
      const { id } = action.payload;
      const item = state.foods.find(i => i.id === id);
      if (item && item.quantity > 0) {
        item.quantity -= 1; 

        const index = state.selectedItems.findIndex(x => x.id === id && x.category === item.category);
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

    removeItem: (state, action) =>{
        const {id} = action.payload;
        // console.log(id);
        const item = state.foods.find(i=>i.id === id);
        if(item){
          item.quantity = 0;
        }

        const index = state.selectedItems.findIndex(x=>x.id === id);
        // console.log(index);
        if(index!==-1){
          state.selectedItems.splice(index, 1);
          // console.log(state.selectedItems);
        }
    },

    clearCart:(state)=>{
      state.foods = initialState.foods;
      state.selectedItems = [];
    },
  }
});

export const { incrementQuantity, decrementQuantity, removeItem, clearCart } = foodSlice.actions;
export default foodSlice.reducer;
