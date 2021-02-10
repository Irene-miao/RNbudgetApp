import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ExpenseScreen from "./ExpenseScreen";

const InnerStack = createStackNavigator();
export default function ExpenseStack() {
  return (
    <InnerStack.Navigator>
      <InnerStack.Screen
        name="Expenses"
        component={ExpenseScreen}
        options={{
          title: "Budget App",
          headerStyle: {
            backgroundColor: "#a0c4ff",
            height: 100,
            shadowColor: "black",
            shadowOpacity: 0.2,
            shadowRadius: 5,
          },
          headerTintColor: "black",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
          },
        }}
      />
    </InnerStack.Navigator>
  );
}
