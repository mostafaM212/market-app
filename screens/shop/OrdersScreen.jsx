import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector , useDispatch } from "react-redux";
import OrderItem from "../../components/Order/OrderItem";
import MyActivityIndicator from "../../components/shop/UI/MyActivityIndicator";
import * as orderActions from '../../store/actions/orders'

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(orderActions.getOrders())
  }, [dispatch])
  if (orders.length > 0) {
    return (
      <FlatList
        data={orders}
        numColumns={1}
        renderItem={(itemData) =>
          itemData.item.productId !== "totalAmount" && (
            <OrderItem order={itemData.item} />
          )
        }
      />
    );
  }
  else {
    return <MyActivityIndicator />
  }
};

export default OrdersScreen;

const styles = StyleSheet.create({});
