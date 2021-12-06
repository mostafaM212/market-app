import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import { useSelector , useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import MyButton from "../../components/shop/UI/MyButton";
import * as cartActions from '../../store/actions/cart';


const ProductDetailsScreen = (props) => {
  const { navigation } = props;
  const { productId, title } = props.route.params;

  const products = useSelector((store) => store.products.availableProducts);

  const product = products.find((product) => product.id === productId);

  const dispatch = useDispatch()  
  navigation.setOptions({
    title: title,
  });
  return (
    <ScrollView>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <View style={styles.buttonContainer}>
        <MyButton
          iconName="cart-plus"
          iconSize={36}
          color={Colors.primary}
          iconColor="white"
          onPress={() => {
            dispatch(cartActions.addToCart(product))
          }}
        />
      </View>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: "#ccc",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 10,
  },
  buttonContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
});
