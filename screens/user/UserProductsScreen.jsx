import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSelector , useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import MyButton from "../../components/shop/UI/MyButton";
import * as productsActions from '../../store/actions/products'
import  Colors  from '../../constants/Colors'
import MyActivityIndicator from '../../components/shop/UI/MyActivityIndicator'

const UserProductsScreen = (props) => {
  const userProduct = useSelector((store) => store.products.userProducts);

  const { navigation } = props;
  navigation.setOptions({
    headerRight: () => <MyButton iconName="plus"
      iconColor="white"
      iconSize={25}
      onPress={ ()=>navigation.navigate("AddProductScreen")} />
  })
  const dispatch = useDispatch()
  console.log(userProduct)   
  if (userProduct.length > 0) {
    
    return (
      <FlatList
        data={userProduct}
        keyExtractor={(item) => item.id}
        numColumns={1}
        renderItem={(product) => (
          <ProductItem
            navigation={navigation}
            product={product.item}
            userProductsIndicator={false}
          >
            <MyButton
              iconName="edit"
              iconSize={26}
              color={Colors.accent}
              iconColor="white"
              onPress={() =>{
                navigation.navigate("EditProductScreen", {
                  productId: product.item.id,
                  title: product.item.title,
                })
                }
              }
              color={Colors.primary}
            />
            <MyButton
              iconName="trash"
              iconSize={26}
              color={Colors.primary}
              iconColor="white"
              onPress={() => {
                dispatch(productsActions.deleteProduct(product.item.id));
              }}
            />
          </ProductItem>
        )}
      />
    );
  } else {
    return <MyActivityIndicator />
  }
};

export default UserProductsScreen;

const styles = StyleSheet.create({});
