import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import {storage} from "../database/firebaseDB";
import firebase from "../database/firebaseDB";
import { Ionicons } from "@expo/vector-icons";

export default function AddScreen({ navigation, route }) {
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");

  const db = firebase.firestore().collection("expenses");
 
 


  useEffect(() => {
    if ((route.params?.id)) {
        console.log(route.params.id);
     db.doc(route.params.id).get().then((doc) => {
            setProduct(doc.data().product);
            setPrice(doc.data().price);
        });
  }}, [route.params?.id]);



  return (
    <View style={[styles.container, { backgroundColor: "#a0c4ff" }]}>
      <Text style={styles.title}>Product: <Text style={styles.content}>{product}</Text></Text>
      <Text style={styles.title}>Price: <Text style={styles.content}> {price}</Text></Text>
        <TouchableOpacity onPress={() => navigation.navigate("Expenses")}>
          <Ionicons
            name="ios-arrow-back-circle"
            size={50}
            style={{
              color: "#2274A5",
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edf2fb",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "italic",
    color: "#264653",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 25,
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});
