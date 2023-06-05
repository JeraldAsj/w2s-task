import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/store";
import TodoListScreen from "./src/screens/TodoListScreen";
import { NativeBaseProvider } from "native-base";

const Stack: any = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerTitleAlign: "center",
              }}
            >
              <Stack.Screen name="Todo List" component={TodoListScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
