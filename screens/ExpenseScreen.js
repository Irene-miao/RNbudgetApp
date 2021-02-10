import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "../database/firebaseDB";
import { storage } from "../database/firebaseDB";
import { v4 as uuidv4 } from "uuid";

export default function ExpenseScreen({ navigation, route }) {
  const [expenses, setExpenses] = useState([]);
  const [image2, setImage2] = useState("");
  const [product2, setProduct2] = useState("");
  const [price2, setPrice2] = useState("");
  const [url, setUrl] = useState("");

  const db = firebase.firestore().collection("expenses");

  // When the screen loads, we start monitoring Firebase
  useEffect(() => {
    const unsubscribe = db.orderBy("created").onSnapshot((collection) => {
      const updatedExpenses = collection.docs.map((doc) => {
        // create our own object that pulls the ID into a property
        const expenseObject = {
          ...doc.data(),
          id: doc.id,
        };
        console.log(expenseObject);
        return expenseObject;
      });
      setExpenses(updatedExpenses);
    });

    return unsubscribe; // return the cleanup function
  }, []);

  // This is to set up the top right button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addExpense}>
          <Ionicons
            name="ios-create-outline"
            size={30}
            color="black"
            style={{
              color: "#264653",
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      ),
    });
  });

  // Monitor route.params for changes and add items to the database
  useEffect(() => {
    if ((route.params?.url, route.params?.product, route.params?.price, route.params?.image)) {
      setUrl(route.params.url);
      const newExpense = {
        product: route.params.product,
        price: route.params.price,
        image: route.params.image,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        // alternative:
        // created: Date.now().toString(),
    
      };
      db.add(newExpense);
    }
  }, [route.params?.url, route.params?.product, route.params?.price, route.params?.image]);

  useEffect(
    (id) => {
      if (
        (route.params?.product2, route.params?.price2, route.params?.image2)
      ) {
        setProduct2(route.params.product2);
        setPrice2(route.params.price2);
        setImage2(route.params.image2);
      }
    },
    [route.params?.product2, route.params?.price2, route.params?.image2]
  );

  function addExpense() {
    navigation.navigate("Create");
  }
const imageName = "image";
  // This deletes an individual note
  function deleteExpense(id, url) {
    console.log("Deleting " + id);
    db.doc(id).delete(); // this is much simpler now we have the Firestore ID
    const ref = storage.refFromURL(url);
    ref.delete();
    console.log("Image is deleted successfully!");
  }

  {/*function editExpense(id) {
    navigation.navigate("Edit");
    console.log("Editing " + id);
    db.doc(id).set({
      product: product2,
      price: price2,
      image: image2,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    }, {merge: true});
  }*/}

  function showExpense(id) {
    navigation.navigate("Show", {id});
    console.log("Showing " + id);
  }

  // The function to render each row in our FlatList
  function renderItem({ item }) {
    return (
      <View
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
         style={{ flexDirection: "row" }}
         onPress={() => showExpense(item.id)}
         >
          <Text style={styles.text}>{item.product}</Text>
          <Text style={styles.text}>{item.price}</Text>
          <Image
            source={item.image}
            style={{
              width: 70,
              height: 70,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => deleteExpense(item.id)}
        >
          <Ionicons name="trash" size={20} color="#944" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => editExpense(item.id)}
        >
          <Ionicons name="create" size={20} color="#43aa8b" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        renderItem={renderItem}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id.toString()}
      />
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
  editBtn: {
    marginLeft: 60,
  },
  deleteBtn: {
    marginLeft: 100,
  },
  text: {
    marginRight: 200,
    fontSize: 25,
    color: "#2274A5",
  },
});
