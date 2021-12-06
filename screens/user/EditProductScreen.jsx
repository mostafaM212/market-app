import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MyButton from "../../components/shop/UI/MyButton";
import * as productActions from "../../store/actions/products";


const EditProductScreen = (props) => {
  const { navigation, route } = props;
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const saveDataHandler = () => {
    dispatch(productActions.editProduct(product.id , title, imageUrl, description));
  };
  navigation.setOptions({
    title: route.params.title,
    headerRight: () => (
      <MyButton
        iconName="save"
        iconSize={26}
        onPress={saveDataHandler}
        iconColor="white"
      />
    ),
  });
  useEffect(() => {
    setTitle(product.title);
    setImageUrl(product.imageUrl);
    
    setDescription(product.description);
  }, [product]);

  const product = useSelector((state) =>
    state.products.availableProducts.find(
      (product) => product.id === route.params.productId
    )
  );
   
  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title :</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => setTitle(value)}
            value={title}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Image Url :</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => setImageUrl(value)}
            value={imageUrl}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description :</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => setDescription(value)}
            value={description}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  formContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 10,
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
  },
  inputContainer: {
    marginVertical: 5,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 5,
  },
  input: {
    borderRadius: 5,
    borderWidth: 0.5,
    fontSize: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});
