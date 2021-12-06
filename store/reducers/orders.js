import Orders from "../../models/Orders";
import { ADD_ORDER, GET_ORDERS } from "../actions/orders";

const initialState = {
  orders: [],
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Orders(
        action.orderData.id,
        action.orderData.items,
        action.orderData.totalAmount,
        action.orderData.date
      );
      const newOrders = state.orders.concat(newOrder);

      return {
        ...state,
        orders: newOrders,
      };
    case GET_ORDERS:
      let formattedOrders = [];
      for (const key in action.orders) {
        let order = action.orders[key];
        formattedOrders = [
          ...formattedOrders,
          new Orders(order.id, order.cartItems, order.totalAmount , order.date),
        ];
      }

      console.log(formattedOrders)
      return {
        ...state,
        orders: formattedOrders,
      };
  }

  return state;
};

export default ordersReducer;
