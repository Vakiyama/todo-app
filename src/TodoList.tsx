import React, { useState } from 'react';
import {
  Button,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import Todo, { type TodoItem } from './Todo';
import { frappe } from './catppuccin';
import AddTodoModal from './AddTodoModal';

function generateTodo(index: number): TodoItem {
  return {
    id: uuid(),
    title: `example ${index}`,
    isChecked: false,
  };
}

const exampleTodos: TodoItem[] = [
  generateTodo(1),
  generateTodo(2),
  generateTodo(3),
];

const exampleTodosLong: TodoItem[] = [];
for (let i = 0; i < 100; i++) {
  exampleTodosLong.push(generateTodo(i));
}

export default function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [addTodoModalVisible, setAddTodoModalVisible] =
    useState<boolean>(false);

  function updateTodo(id: string) {
    const todoIndex = todos.findIndex((item) => item.id === id);
    if (todoIndex === -1) return;
    const newTodos = [...todos];
    newTodos[todoIndex].isChecked = !newTodos[todoIndex].isChecked;
    setTodos(newTodos);
  }

  function createTodo(title: string) {
    const todo: TodoItem = {
      id: uuid(),
      title,
      isChecked: false,
    };
    setTodos([...todos, todo]);
    setAddTodoModalVisible(false);
  }

  function removeTodo(id: string) {
    const todoIndex = todos.findIndex((item) => item.id === id);
    if (todoIndex === -1) return;
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    setTodos(newTodos);
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={addTodoModalVisible}
      >
        <AddTodoModal addTodo={createTodo} />
      </Modal>
      <View style={styles.header}>
        <Text style={styles.text}>Hello Vitor.</Text>
        <Pressable
          style={styles.addTodoButton}
          onPressOut={() => {
            setAddTodoModalVisible(true);
          }}
        >
          <Text style={styles.todoButtonText}>+</Text>
        </Pressable>
      </View>
      <FlatList
        style={styles.list}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Todo
            id={item.id}
            toggleChecked={updateTodo}
            isChecked={item.isChecked}
            title={item.title}
            removeTodo={removeTodo}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: frappe.base,
    borderWidth: 1,
    borderStyle: 'solid',
    width: '90%',
    height: '100%',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: '#c6d0f5',
  },
  list: {
    marginTop: 20,
    marginBottom: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addTodoButton: {
    backgroundColor: frappe.maroon,
    width: 40,
    height: 40,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoButtonText: {
    fontSize: 30,
    color: frappe.surface0,
  },
});
