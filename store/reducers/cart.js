import Cart from "../../models/Cart";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";
const initialState = {
  items: {},
  totalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;
      if (state.items[addedProduct.id]) {
        /**
         * the item is existing in your cart
         */

        const updatedCart = new Cart(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice
        );

        return {
          ...state,
          items: {
            ...state.items,
            [addedProduct.id]: updatedCart,
          },
          totalAmount: state.totalAmount + addedProduct.price,
        };
      } else {
        const newCartItem = new Cart(
          1,
          productPrice,
          productTitle,
          productPrice
        );

        return {
          ...state,
          items: {
            ...state.items,
            [addedProduct.id]: newCartItem,
            totalAmount: state.totalAmount + productPrice,
          },
          totalAmount: state.totalAmount + productPrice,
        };
      }
    case REMOVE_FROM_CART:
      const filteredCart = {};
      if (state.items[action.productId].quantity > 1) {
        console.log("removed");
        /**
         * need to reduce it
         */
        const selectedCartItem = state.items[action.productId];
        const selectedQty = state.items[action.productId].quantity;
        const updatedCartItem = new Cart(
          selectedQty - 1,
          selectedCartItem.price,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.price
        );
        console.log("removing 1 item");
        return {
          ...state,
          items: {
            ...state.items,
            [action.productId]: updatedCartItem,
          },
          totalAmount: state.totalAmount - state.items[action.productId].price,
        };
      } else {
        /**
         * need to erase it
         */
        const removedItem = { ...state.items };
        const price = removedItem[action.productId].price;
        delete removedItem[action.productId];
        return {
          ...state,
          items: { ...removedItem },
          totalAmount: state.totalAmount - price,
        };
      }
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (state.items[action.productId]) {
        const newTotalAmount =
          state.totalAmount - state.items[action.productId].sum;
        const newItems = delete state.items[action.productId];

        return {
          ...state,
          items: newItems,
          totalAmount: newTotalAmount,
        };
      } else {
        return state;
      }
  }
  return state;
};

export default cartReducer;
