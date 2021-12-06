import React from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import { useSelector , useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import { removeItemFromCart } from '../../store/actions/cart';
import * as OrderActions from '../../store/actions/orders'

const CartScreen = (props) => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
  const transformedCartItems = [];
  
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems;
  });
  
  const dispatch = useDispatch();

    
  
  return (
    <View style={styles.cartContainer}>
      <View style={styles.totalAmountContainer}>
        <Text style={styles.totalAmount}>
          Total: <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          title="Order Now"
          color={Colors.accent}
          disabled={!cartItems.length > 0}
          onPress={() => {
            dispatch(OrderActions.addOrder(cartItems , totalAmount))
          }}
        />
      </View>
      <View style={styles.cartItemsContainer}>
        <FlatList
          data={cartItems}
          numColumns={1}
          keyExtractor={(item) => item.productId}
          renderItem={(itemData) => {
            return (
              itemData.item.productId !== "totalAmount" && (
                <CartItem onRemove={(id) => {
                  dispatch(removeItemFromCart(id))
                }} cartItem={itemData.item}
                  deleteable={true}
                />
              )
            );
          }}
        />
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  cartContainer: {
    margin: 20,
  },
  totalAmountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  amount: {
    color: Colors.primary,
  },
  cartItemsContainer: {},
  cartItem: {},
});
