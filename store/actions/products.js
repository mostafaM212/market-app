import axios from "axios";
import constants from "../../constants/constants";

export const ADD_PRODUCTS = "ADD_PRODUCTS";

export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const EDIT_PRODUCT = "EDIT_PRODUCT";

export const GET_PRODUCTS = "GET_PRODUCTS";

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    const response = await axios
      .delete(constants.databaseUrl + "products.json/" + productId)
      .catch((e) => console.log(e.response.data));
    dispatch({
      type: DELETE_PRODUCT,
      productId: productId,
    });
  };
};

export const editProduct = (id, title, imageUrl, description) => {
  return {
    type: EDIT_PRODUCT,
    id,
    title,
    imageUrl,
    description,
  };
};

export const addProduct = (id, title, imageUrl, description, price) => {
  return async (dispatch) => {
    /**
     * we can write any async code here
     */
    const response = await axios
      .post(constants.databaseUrl + "products.json", {
        title,
        imageUrl,
        description,
        price,
      })
      .then((res) => res.data)
      .catch((e) => console.log(e.response.data));

    dispatch({
      type: ADD_PRODUCTS,
      productData: {
        id: response.name,
        title,
        imageUrl,
        description,
        price,
      },
    });
  };
};

export const getProducts = () => {
  return async (dispatch) => {
    const response = await axios
      .get(constants.databaseUrl + "products.json")
      .then((res) => res.data)
      .catch((e) => console.log(e.response.data));
    
    const data = formatData(response)
    
    dispatch({
      type: GET_PRODUCTS,
      products: data,
    })
  };
};


export const formatData = (data = [])=> {
  
  let products = [];

    for (const key in data) {
      products = [...products, { id: key, ...data[key] }];
  }
  return products;
}