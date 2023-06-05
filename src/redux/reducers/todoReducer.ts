import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TodoState {
  todos: any;
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action) => {
      const todoIndex = state.todos.findIndex(
        (todo: any) => todo.id === action.payload.id
      );
      if (todoIndex !== -1) {
        state.todos[todoIndex] = action.payload;
      }
    },
    updateTodoStatus: (state, action) => {
      const todoIndex = state.todos.findIndex(
        (todo: any) => todo.id === action.payload.id
      );

      if (todoIndex !== -1) {
        state.todos[todoIndex].status = action.payload.status;
      }
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(
        (todo: any) => todo.id !== action.payload
      );
    },
  },
});

export const { addTodo, updateTodo, updateTodoStatus, deleteTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
