import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "..//redux/store";
import {
  addTodo,
  updateTodo,
  deleteTodo,
  updateTodoStatus,
} from "../redux/reducers/todoReducer";
import {
  Text,
  Button,
  List,
  Input,
  Box,
  VStack,
  FlatList,
  HStack,
  Pressable,
  useToast,
  IconButton,
  Badge,
  Checkbox,
} from "native-base";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { EvilIcons } from "@expo/vector-icons";

const TodoListScreen = () => {
  const navigations = useNavigation();
  const toast = useToast();
  const [todoText, setTodoText] = useState("");
  const [status, setStatus] = useState(false);
  const [id, setId] = useState("");
  // const [todoDesc, setTodoDesc] = useState("");
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch<AppDispatch>();

  // it's used to add todo list
  const handleAddTodo = () => {
    if (todoText.trim() !== "") {
      const newTodo: any = {
        id: todos?.length + 1,
        text: todoText,
        // description: todoDesc,
        c_data: new Date(),
        status: false,
      };

      dispatch(addTodo(newTodo));
      setTodoText("");
      // setTodoDesc("");
      setId("");
    } else {
      toast.show({
        render: () => {
          return (
            <Box bg="yellow.500" px="2" py="1" rounded="sm" mb={5}>
              Please Enter Text
            </Box>
          );
        },
      });
    }
  };

  // it's used to gret single todo list data
  const getSingleVal = (item: any) => {
    setId(item.id);
    setTodoText(item.text);
    setStatus(item.status);
    // setTodoDesc(item.description);
  };

  // it's used to change todo status
  const handleChangeStates = (item: any) => {
    dispatch(
      updateTodoStatus({
        id: item.id,
        status: !item.status,
      })
    );
  };

  // it's used to update todo list
  const handleUpdateTodo = () => {
    const newTodo: any = {
      id: id,
      text: todoText,
      // description: todoDesc,
      status: status,
      c_data: new Date(),
    };
    if (id) {
      dispatch(updateTodo(newTodo));
      setTodoText("");
      setStatus(false);
      setId("");
    }
  };

  // it's used to delete todo list
  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  // todo card ui
  const todoCard = (todo: any) => {
    return (
      <HStack
        zIndex={1}
        bgColor={"gray.800"}
        flex={1}
        alignItems={"center"}
        w={"full"}
        space={3}
        p={3}
        my={2}
        key={todo.id}
        borderRadius={10}
      >
        <Pressable flex={1} onPress={() => handleChangeStates(todo)}>
          <VStack flex={1}>
            <Text flex={1} fontSize={20} color={"white"}>
              {todo.text}
            </Text>
            <Text flex={1} color={"white"}>
              {dayjs(todo.c_date).format("DD/MM/YYYY hh:mm:a")}
            </Text>
            <VStack mt={2} w={"1/2"} alignItems={"flex-start"}>
              <Badge colorScheme={todo.status ? "success" : "info"}>
                {todo.status ? "Completed " : "Pending"}
              </Badge>
            </VStack>
          </VStack>
        </Pressable>

        {!todo.status && (
          <IconButton
            onPress={() => getSingleVal(todo)}
            size={"sm"}
            borderRadius={"full"}
            bgColor={"blue.500"}
            variant="solid"
            _icon={{
              as: EvilIcons,
              name: "pencil",
              size: "md",
            }}
          />
        )}

        <IconButton
          // position={"absolute"}
          // top={-15}
          // right={0}
          onPress={() => handleDeleteTodo(todo.id)}
          size={"sm"}
          borderRadius={"full"}
          bgColor={"red.500"}
          variant="solid"
          _icon={{
            as: EvilIcons,
            name: "trash",
            size: "md",
          }}
        />
      </HStack>
    );
  };

  useEffect(() => {
    navigations.setOptions({
      cardStyle: {
        backgroundColor: "#303134",
      },
      title: "W2s Todo Task",
      headerStyle: {
        elevation: 0, //for android
        shadowOpacity: 0, //for ios
        backgroundColor: "#1879FF",
      },
      headerTintColor: "#fff",
    });
  }, [navigations]);

  return (
    <VStack space={3} style={styles.container} bg={"black"}>
      <HStack space={3}>
        <Input
          placeholder="Add Todo"
          value={todoText}
          bgColor={"white"}
          color={"black"}
          placeholderTextColor={"black"}
          flex={0.7}
          onChangeText={(text) => setTodoText(text)}
        />

        <Button
          flex={0.3}
          onPress={() => {
            id ? handleUpdateTodo() : handleAddTodo();
          }}
        >
          <Text color={"white"}>{id ? "Edit" : "Add"}</Text>
        </Button>
      </HStack>
      {id && (
        <Checkbox onChange={setStatus} isChecked={status} value="two">
          <Text color={"white"} fontWeight={"bold"}>
            Click to change Status
          </Text>
        </Checkbox>
      )}

      <Text color={"white"} fontWeight={"bold"}>
        Note: If you need to change the status, click on the task tab. Once you
        have changed the status, you cannot edit it.
      </Text>
      <FlatList
        // showsVerticalScrollIndicator={false}
        w={"full"}
        data={todos}
        renderItem={(item: any) => todoCard(item.item)}
      />
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default TodoListScreen;
