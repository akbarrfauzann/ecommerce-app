import { createSlice } from "@reduxjs/toolkit";

export type WishlistItem = {
    id: number;
    name: string;
    price: number;
    image: string;
    size: string;
  };

type WishlistState = {
  wishlistItems: WishlistItem[];
};

const initialState: WishlistState = {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const existingItem = state.wishlistItems.find((item) => item.id === action.payload.id);
      if (!existingItem) {
        state.wishlistItems.push({ ...action.payload });
      }
    },

    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter((item) => item.id !== action.payload.id);
    },

  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
