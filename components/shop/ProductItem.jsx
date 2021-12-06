import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import propTypes from "prop-types";
import { useDispatch } from "react-redux";
import MyButton from "./UI/MyButton";

const ProductItem = (props) => {
  const { product, navigation } = props;
 
  const MyComponent =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <MyComponent
      activeOpacity={0.6}
      onPress={() =>
        navigation.navigate("ProductDetailsScreen", {
          productId: product.id,
          title: product.title,
        })
      }
    >
      <View style={styles.productContainer}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          {
            props.children
          }
        </View>
      </View>
    </MyComponent>
  );
};

ProductItem.propTypes = {
  product: propTypes.object.isRequired,
  navigation: propTypes.object.isRequired
};
export default ProductItem;

const styles = StyleSheet.create({
  productContainer: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "60%",
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontSize: 18,
    color: "#888",
  },
  details: {
    alignItems: "center",
    height: "15%",
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    height: "25%",
  },
});
