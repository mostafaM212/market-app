import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import propTypes from "prop-types";
import Colors from "../../constants/Colors";
import CartItem from "../shop/CartItem";



const OrderItem = (props) => {
  const { readableDate, totalAmount, items } = props.order;
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.orderItemContainer}>
      <View style={styles.detailsContainer}>
        <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
        <Text style={styles.date}> {readableDate} </Text>
      </View>
      <Button
        title={showDetails ? "Hide Details" : "Show Details"}
        color={Colors.primary}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />
      {showDetails && (
        <View>
          {items.map((cartItem) => {
            return (
              cartItem.productId !== "totalAmount" && (
                <CartItem
                  cartItem={cartItem}
                  deleteable={false}
                  key={cartItem.productId}
                />
              )
            );
          })}
        </View>
      )}
    </View>
  );
};
OrderItem.propTypes = {
  order: propTypes.object.isRequired,
};
export default OrderItem;

const styles = StyleSheet.create({
  orderItemContainer: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 16,
    color: "#888",
  },
});
