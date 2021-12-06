import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { combineReducers, createStore , applyMiddleware} from "redux";
import StackNavigation from "./navigation/StackNavigation";
import products from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigation from "./navigation/DrawerNavigation";
import reduxThunk  from 'redux-thunk';

const rootReducer = combineReducers({
  products: products,
  cart: cartReducer,
  orders : ordersReducer
});
const store = createStore(rootReducer , applyMiddleware(reduxThunk));


export default function App() {
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
