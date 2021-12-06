import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import OrdersScreen from "../screens/shop/OrdersScreen";
import StackNavigation from "./StackNavigation";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import UserProductsScreen from "../screens/user/UserProductsScreen";

const DrawerNavigation = (props) => {
  const DrawerNavigation = createDrawerNavigator();
  return (
    <DrawerNavigation.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors.primary,
      }}
    >
      <DrawerNavigation.Screen
        name="StackNavigation"
        component={StackNavigation}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons name="home-outline" size={23} color={Colors.primary} />
          ),
          title : 'Home'
        }}
      />
      <DrawerNavigation.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons name="reader-outline" size={23} color={Colors.primary} />
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
      <DrawerNavigation.Screen
        name="User Products"
        component={UserProductsScreen}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons name="md-create" size={23} color={Colors.primary} />
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
    </DrawerNavigation.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({});
