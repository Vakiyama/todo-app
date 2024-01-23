import React, { useState } from 'react';
import {
  FlatList,
  ListRenderItem,
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
import ManageCategoriesModal, { type Category } from './ManageCategoriesModal';
import Toast from 'react-native-toast-message';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

export default function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [addTodoModalVisible, setAddTodoModalVisible] =
    useState<boolean>(false);
  const [manageCategoriesModalVisible, setManageCategoriesModalVisible] =
    useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);

  function updateTodo(id: string) {
    const todoIndex = todos.findIndex((item) => item.id === id);
    if (todoIndex === -1) return;
    const newTodos = [...todos];
    newTodos[todoIndex].isChecked = !newTodos[todoIndex].isChecked;
    setTodos(newTodos);
  }

  function createTodo(title: string, category: Category) {
    const todo: TodoItem = {
      id: uuid(),
      title,
      isChecked: false,
      category,
    };
    setTodos([...todos, todo]);
  }

  function removeTodo(id: string) {
    const todoIndex = todos.findIndex((item) => item.id === id);
    if (todoIndex === -1) return;
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    setTodos(newTodos);
  }

  function addCategory(category: Category) {
    setCategories([...categories, category]);
  }

  function removeCategory(id: string) {
    const categoryIndex = categories.findIndex(
      (category: Category) => category.id === id
    );
    const newCategories = [...categories];
    newCategories.splice(categoryIndex, 1);
    setCategories(newCategories);
  }

  let currentCategoryId: string | undefined;

  function renderTodo({ item }: { item: TodoItem }) {
    let firstCategory = false;
    if (currentCategoryId === undefined) {
      currentCategoryId = item.category.id;
      firstCategory = true;
    }
    const components = (
      <>
        {currentCategoryId !== item.category.id || firstCategory ? (
          <Text
            style={[
              styles.categorySeparatorText,
              firstCategory ? styles.firstCategory : null,
            ]}
          >
            {item.category.name}
          </Text>
        ) : null}
        <Todo
          id={item.id}
          toggleChecked={updateTodo}
          isChecked={item.isChecked}
          title={item.title}
          removeTodo={removeTodo}
          category={item.category}
          color={item.category.color}
        />
      </>
    );

    if (currentCategoryId !== item.category.id) {
      currentCategoryId = item.category.id;
    }
    return components;
  }

  type TodoItemsGroupingByCategory = { [name: string]: TodoItem[] };

  function groupTodos(todos: TodoItem[]): TodoItem[] {
    const groups: TodoItemsGroupingByCategory = {};
    const grouped = todos.reduce((acc, todo) => {
      const title = todo.category.name;
      if (Object.keys(acc).includes(title)) {
        acc[title].push(todo);
      } else {
        acc[title] = [todo];
      }
      return acc;
    }, groups);

    const newTodos: TodoItem[] = [];
    for (const key in grouped) {
      for (const todo of grouped[key]) {
        newTodos.push(todo);
      }
    }

    return newTodos;
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={addTodoModalVisible}
        onRequestClose={() => setAddTodoModalVisible(false)}
      >
        <AddTodoModal
          addTodo={createTodo}
          closeModal={() => setAddTodoModalVisible(false)}
          categories={categories}
        />
        <Toast />
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={manageCategoriesModalVisible}
        onRequestClose={() => setManageCategoriesModalVisible(false)}
      >
        <ManageCategoriesModal
          closeModal={() => setManageCategoriesModalVisible(false)}
          categories={categories}
          addCategory={addCategory}
          removeCategory={removeCategory}
        />
        <Toast />
      </Modal>
      <View style={styles.header}>
        <Text style={styles.text}>Hello Vitor.</Text>
        <View style={styles.buttonGroup}>
          <Pressable
            style={[styles.button, styles.addTagButton]}
            onPressOut={() => {
              setManageCategoriesModalVisible(true);
            }}
          >
            <AntDesign name="tago" size={20} color="black" />
          </Pressable>
          <Pressable
            style={styles.button}
            onPressOut={() => {
              setAddTodoModalVisible(true);
            }}
          >
            <MaterialIcons
              style={styles.icon}
              name="playlist-add"
              size={20}
              color={frappe.base}
            />
          </Pressable>
        </View>
      </View>
      <FlatList
        style={styles.list}
        data={groupTodos(todos)}
        keyExtractor={(item) => item.id}
        renderItem={renderTodo}
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
  button: {
    backgroundColor: frappe.maroon,
    width: 40,
    height: 40,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTagButton: {
    marginRight: 8,
  },
  todoButtonText: {
    fontSize: 30,
    color: frappe.surface0,
  },
  icon: {
    paddingLeft: 3,
    paddingTop: 1,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  categorySeparatorText: {
    color: frappe.text,
    fontSize: 20,
    marginTop: 30,
    marginBottom: 8,
  },
  firstCategory: {
    marginTop: 0,
  },
});
