import axios from "axios";
import constant from "../../constants/constants";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const addToCart = (product, userId = "u1") => {
  return  (dispatch) => {
    
    dispatch({
      type: "ADD_TO_CART",
      product: product,
    });
  };
};

export const removeItemFromCart = (productId) => {
  return async (dispatch) => {
    const response = await axios.delete(
      constant.databaseUrl + "carts/" + productId
    );
    dispatch({
      type: REMOVE_FROM_CART,
      productId: productId,
    });
  };
};
