import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {storage} from "../database/firebaseDB";
import { v4 as uuidv4 } from "uuid";

export default function AddScreen({ navigation }) {
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");


  async function chooseImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result.uri);
  
    if (!result.cancelled) {
     uploadUri(result.uri, "image");
     setImage(result.uri);
    };
  } catch (error) {
    return error;
  }
  };
  
  async function uploadUri(uri, imageName) {
    try {
      const fetch = require('node-fetch');
      const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage.ref().child('images/').child(`${uuidv4()}-${imageName}`);
    const result = await ref.put(blob);
    console.log(result);
    const download = ref.getDownloadUrl();
    console.log(download);
  } catch(error) {
    return error;
  }
  };
  

  return (
    <View style={[styles.container, { backgroundColor: "#a0c4ff" }]}>
      <Text style={styles.title}>Create Expense</Text>
      <Text style={styles.fieldTitle}>Product</Text>
      <TextInput
        style={styles.textInput}
        value={product}
        onChangeText={(input) => setProduct(input)}
      />
      <Text style={styles.fieldTitle}>Price</Text>
      <TextInput
        style={styles.textInput}
        value={price}
        onChangeText={(input) => setPrice(input)}
      />
       <TouchableOpacity
          style={styles.photoBtn}
          onPress={chooseImage}>
          <Text style={styles.buttonText}>Choose Photo</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => navigation.navigate("Expenses", { product, price, image })}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.goBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Dismiss</Text>
        </TouchableOpacity>
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderColor: "grey",
    backgroundColor: "white",
    borderWidth: 1,
    width: "80%",
    padding: 10,
    marginTop: 5,
  },
  saveBtn: {
    padding: 10,
    backgroundColor: "#006d77",
    borderRadius: 5,
    margin: 10,
    marginTop: 30,
    width: 80,
  },
  goBtn: {
    padding: 10,
    backgroundColor: "#2a9d8f",
    borderRadius: 5,
    margin: 10,
    marginTop: 30,
    width: 80,
  },
  buttonText: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  fieldTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
  },
  photoBtn: {
    padding: 10, 
    textAlign: "center", 
    width:80,
    borderRadius: 5,
    margin: 10,
    marginTop: 30,
    backgroundColor: "#48cae4",
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});
