import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import todoReducer from "./reducers/todoReducer";

const persistConfig = {
  key: "todos",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, todoReducer);

export const store = configureStore({
  reducer: {
    todos: persistedReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
