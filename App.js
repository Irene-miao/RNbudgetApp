import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AddScreen from "./screens/AddScreen";
import EditScreen from "./screens/editScreen";
import ExpenseStack from "./screens/ExpenseStack";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" mode="modal">
        <Stack.Screen name="Expense Stack" component={ExpenseStack} />
        <Stack.Screen name="Create" component={AddScreen} />
        <Stack.Screen name="Edit" component={EditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
