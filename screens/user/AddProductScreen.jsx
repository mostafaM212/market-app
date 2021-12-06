import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import MyButton from "../../components/shop/UI/MyButton";
import * as productActions from "../../store/actions/products";

const AddProductScreen = (props) => {
  const { navigation, route } = props;
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const saveDataHandler = () => {
    if (
      title.length > 0 &&
      imageUrl.length > 0 &&
      price > 0 &&
      description.length > 0
    ) {
      dispatch(
        productActions.addProduct(
          new Date(),
          title,
          imageUrl,
          description,
          parseInt(price)
        )
      );
      dispatch(productActions.getProducts())
      navigation.navigate('Home')
    } else {
      Alert.alert(
        "Missing Required Data",
        "Please Make Sure that you Type all Required Data.",
        [{ text: "Okay"  }],
      );
    }
  };
  navigation.setOptions({
    headerRight: () => (
      <MyButton
        iconName="save"
        iconSize={26}
        onPress={saveDataHandler}
        iconColor="white"
      />
    ),
  });
  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title :</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => setTitle(value)}
            value={title}
            autoCapitalize="sentences"
            returnKeyType="next"
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
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Price :</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => setPrice(value)}
            value={price}
            keyboardType="numeric"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AddProductScreen;

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
