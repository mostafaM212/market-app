import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductsOverViewScreen from "../screens/shop/ProductsOverViewScreen";
import Colors from "../constants/Colors";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import CartScreen from "../screens/shop/CartScreen";
import DrawerButton from "../components/shop/UI/DrawerButton";
import EditProductScreen from "../screens/user/EditProductScreen";
import AddProductScreen from "../screens/user/AddProductScreen";


const StackNavigation = (props) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          color: Platform.OS === "android" ? "white" : Colors.primary,
        },
        headerStyle: {
          backgroundColor: Platform.OS === "ios" ? "white" : Colors.primary,
        },
        
      }}
    >
      <Stack.Screen
        name="Home"
        component={ProductsOverViewScreen}
        options={{
          title: "All Products",
          headerLeft: () => (<DrawerButton />),
          
        }}
      />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          title: "Cart",
        }}
      />
      <Stack.Screen
        name="EditProductScreen"
        component={EditProductScreen}
        options={{
          title : "Edit Product"
        }}
      />
      <Stack.Screen
        name="AddProductScreen"
        component={AddProductScreen}
        options={{
          title : "New Product"
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
