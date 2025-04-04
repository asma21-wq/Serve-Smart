import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: any;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const itemPresent = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity++;
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    removeFromCart: (state: CartState, action: PayloadAction<{ id: string }>) => {
      const id = action.payload.id;
      state.totalQuantity -= state.items.find(item => item.id === id).quantity;
      state.items = state.items.filter(item => item.id !== id);
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    incrementQuantity: (state: CartState, action: PayloadAction<{ id: string }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      item.quantity++;
      state.totalQuantity++;
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    decrementQuantity: (state: CartState, action: PayloadAction<{ id: string }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item.quantity === 1) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      } else {
        item.quantity--;
      }
      state.totalQuantity--;
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer; 