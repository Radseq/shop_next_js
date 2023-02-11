import { ShippingCartProduct } from '@/components/cart/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'shoppingCart',
    initialState: [] as ShippingCartProduct[],
    reducers: {
        addToCart: (state, action: PayloadAction<ShippingCartProduct>) => {
            const itemInCart = state.find((item) => item.id === action.payload.id);
            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                state.push({ ...action.payload });
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.find((item) => item.id === action.payload);
            if (item) {
                item.quantity++
            };
        },
        decrementQuantity: (state, action) => {
            const item = state.find((item) => item.id === action.payload);
            if (item) {
                if (item.quantity === 1) {
                    item.quantity = 1
                } else {
                    item.quantity--;
                }
            }
        },
        removeItem: (state, action) => {
            return state.filter((item) => item.id !== action.payload);
        },
    },
});

export const cartReducer = cartSlice.reducer;

export const {
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeItem,
} = cartSlice.actions;