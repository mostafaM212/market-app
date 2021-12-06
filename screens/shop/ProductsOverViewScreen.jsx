import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import MyButton from "../../components/shop/UI/MyButton";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";
import MyActivityIndicator from "../../components/shop/UI/MyActivityIndicator";

const ProductsOverViewScreen = (props) => {
  const [refreshing, setRefreshing] = useState(false)
  const products = useSelector((store) => store.products.availableProducts)
  const { navigation } = props;
  const dispatch = useDispatch();
  
  const getData = useCallback(async () => {
    setRefreshing(true)
    try {
      await dispatch(productActions.getProducts());

    } catch (error) {
      console.log(error)
    }
    setRefreshing(false)

  }, [dispatch , productActions])
  useEffect(() => {
    dispatch(productActions.getProducts());
  }, [productActions, dispatch]);
  navigation.setOptions({
    headerRight: () => (
      <MyButton
        iconName="shopping-cart"
        iconSize={36}
        color={Colors.primary}
        iconColor="white"
        onPress={() => navigation.navigate("CartScreen")}
        color={Colors.primary}
      />
    ),
  });
  if (products.length > 0) {
    return (
      <FlatList
        onRefresh={() => {
          getData()

        }}
        refreshing={refreshing}
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={1}
        renderItem={(item) => (
          <ProductItem
            product={item.item}
            navigation={navigation}
            userProductsIndicator={true}
          >
            <MyButton
              iconName="clipboard"
              iconSize={26}
              color={Colors.primary}
              iconColor="white"
              onPress={() =>
                navigation.navigate("ProductDetailsScreen", {
                  productId: item.item.id,
                  title: item.item.title,
                })
              }
              color={Colors.primary}
            />
            <MyButton
              iconName="cart-plus"
              iconSize={26}
              color={Colors.primary}
              iconColor="white"
              onPress={() => {
                dispatch(cartActions.addToCart(item.item));
              }}
            />
          </ProductItem>
        )}
      />
    );
  } else {
    return <MyActivityIndicator />;
  }
};

export default ProductsOverViewScreen;

const styles = StyleSheet.create({});
