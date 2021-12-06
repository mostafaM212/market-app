import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/Product";
import {
  ADD_PRODUCTS,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  GET_PRODUCTS,
} from "../actions/products";

const initialState = {
  availableProducts: [],
  userProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      const newUserProduct = state.userProducts.filter((product) => {
        return product.id !== action.productId;
      });
      const newAvailableProducts = state.availableProducts.filter((product) => {
        return product.id !== action.productId;
      });
      return {
        ...state,
        userProducts: newUserProduct,
        availableProducts: newUserProduct,
      };
    case EDIT_PRODUCT:
      const productIndex = state.availableProducts.findIndex(
        (product) => product.id === action.id
      );

      const products = [...state.availableProducts];
      products[productIndex].title = action.title;
      products[productIndex].description = action.description;
      products[productIndex].imageUrl = action.imageUrl;

      return {
        ...state,
        availableProducts: products,
        userProducts: products,

      };
    case ADD_PRODUCTS:
      const { productData } = action;
      const newProduct = new Product(
        productData.id,
        "u1",
        productData.title,
        productData.imageUrl,
        productData.description,
        productData.price
      );
      const newAvailableProductsData = [...state.availableProducts, newProduct];
      const newUserProductsData = [...state.userProducts, newProduct];

      return {
        ...state,
        availableProducts: newAvailableProductsData,
        userProducts: newUserProductsData,
      };
    case GET_PRODUCTS:
     
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.products,
        
      };
  }
  return state;
};
