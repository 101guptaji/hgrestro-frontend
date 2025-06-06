import { createSlice } from '@reduxjs/toolkit';

const initialState = {

  foods:[
    { id: 1, name: 'Veggie burger', category: "Burger", bakingTime: 20, price: 200, quantity: 0, image: 'vegie_burger.avif' },
    { id: 2, name: 'Chicken burger',  category: "Burger", bakingTime: 20, price: 150, quantity: 0, image: 'Chicken Burger.avif' },
    { id: 3, name: 'Cheeseburger',  category: "Burger", bakingTime: 20, price: 90, quantity: 0, image: 'cheeseburger.avif' },
    { id: 4, name: 'Kiwiburger',  category: "Burger", bakingTime: 20, price: 300, quantity: 0, image: 'Kiwiburger.jpg' },
    { id: 5, name: 'Chickpea burger',  category: "Burger", bakingTime: 20, price: 200, quantity: 0, image: 'chickpea_burger.avif' },
    { id: 6, name: 'Bean burger',  category: "Burger", bakingTime: 20, price: 200, quantity: 0, image: 'bean-burger.png' },

    { id: 7, name: 'California Pizza',  category: "Pizza", bakingTime: 30, price: 200, quantity: 0, image: 'California.jpeg' },
    { id: 8, name: 'Sicilian Pizza', category: "Pizza", bakingTime: 30, price: 150, quantity: 0, image: 'Sicilian.jpg' },
    { id: 9, name: 'Greek Pizza', category: "Pizza", bakingTime: 30, price: 90, quantity: 0, image: 'Greek.jpg' },
    { id: 10, name: 'Margherita Pizza', category: "Pizza", bakingTime: 30, price: 300, quantity: 0, image: 'Margherita.jpg' },
    { id: 11, name: 'Marinara Pizza', category: "Pizza", bakingTime: 30, price: 200, quantity: 0, image: 'Marinara.jpg' },
    { id: 12, name: 'Hawaiian Pizza', category: "Pizza", bakingTime: 30, price: 200, quantity: 0, image: 'Hawaiian.jpeg' },

    { id: 13, name: 'Coffee', category: "Drink", bakingTime: 10, price: 200, quantity: 0, image: 'Coffee.jpg' },
    { id: 14, name: 'Cider', category: "Drink", bakingTime: 10, price: 150, quantity: 0, image: 'Cider.jpg' },
    { id: 15, name: 'Cola', category: "Drink", bakingTime: 10, price: 90, quantity: 0, image: 'Cola.jpg' },
    { id: 16, name: 'Espresso', category: "Drink", bakingTime: 10, price: 300, quantity: 0, image: 'Espresso.jpg' },
    { id: 17, name: 'Milkshake', category: "Drink", bakingTime: 10, price: 200, quantity: 0, image: 'Milkshake.jpeg' },
    { id: 18, name: 'Lemonade', category: "Drink", bakingTime: 10, price: 200, quantity: 0, image: 'Lemonade.jpeg' },

    { id: 19, name: 'Cheese fries', category: "French fries", bakingTime: 10, price: 200, quantity: 0, image: 'CheeseFries.jpg' },
    { id: 20, name: 'Chili fries', category: "French fries", bakingTime: 10, price: 150, quantity: 0, image: 'ChiliCheeseFries.jpg' },
    { id: 21, name: 'Loaded fries', category: "French fries", bakingTime: 10, price: 90, quantity: 0, image: 'LoadedFries.jpg' },
    { id: 22, name: 'Garlic fries', category: "French fries", bakingTime: 10, price: 300, quantity: 0, image: 'GarlicParmesanFries.jpg' },
    { id: 23, name: 'Potato fries', category: "French fries", bakingTime: 10, price: 200, quantity: 0, image: 'SweetPotatoFries.jpg' },
    { id: 24, name: 'Shoestring fries', category: "French fries", bakingTime: 10, price: 200, quantity: 0, image: 'ShoestringFries.jpg' },

    { id: 25, name: 'Palak Paneer', category: "Veggies", bakingTime: 10, price: 150, quantity: 0, image: 'PalakPaneer.jpg' },
    { id: 26, name: 'Chana Masala', category: "Veggies", bakingTime: 10, price: 70, quantity: 0, image: 'ChanaMasala.jpg' },
    { id: 27, name: 'Aloo Gobi', category: "Veggies", bakingTime: 10, price: 90, quantity: 0, image: 'AlooGobi.jpg' },
    { id: 28, name: 'Mushrooms', category: "Veggies", bakingTime: 10, price: 60, quantity: 0, image: 'Mushrooms.jpg' },
    { id: 29, name: 'Dal Makhani', category: "Veggies", bakingTime: 10, price: 100, quantity: 0, image: 'DalMakhani.jpg' },
    { id: 30, name: 'Shahi Paneer', category: "Veggies", bakingTime: 10, price: 120, quantity: 0, image: 'ShahiPaneer.jpg' },
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
