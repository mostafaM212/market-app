import axios from "axios";
import constants from "../../constants/constants";
import { formatData } from "./products";

export const ADD_ORDER = "ADD_ORDER";
export const GET_ORDERS = "GET_ORDERS";

export const addOrder = (
  cartItems,
  totalAmount,
  userId = "u1",
  date = new Date()
) => {
  return async (dispatch) => {
    const response = await axios
      .post(constants.databaseUrl + "orders/" + userId + ".json", {
        cartItems,
        totalAmount,
        date: date,
      })
      .then((res) => res.data)
      .catch((e) => console.log(e.response.data));

    dispatch({
      type: "ADD_ORDER",
      orderData: {
        items: cartItems,
        totalAmount: totalAmount,
        id: response.name,
        date: date,
      },
    });
  };
};

export const getOrders = (userId = "u1") => {
  return async (dispatch) => {
    const res = await axios
      .get(constants.databaseUrl + "/orders/" + userId + ".json")
      .then((res) => res.data)
      .catch((e) => e.response.data);
      console.log(res ,'get orders');
      
      let formattedOrders = formatData(res)
      console.log(formattedOrders ,'formatted orders');
      dispatch({
          type: "GET_ORDERS",
          orders : formattedOrders
      })
  };
};
