import {
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  View,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import Toast from 'react-native-toast-message';
import { frappe } from './catppuccin';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { type Category } from './ManageCategoriesModal';

export default function AddTodoModal({
  addTodo,
  closeModal,
  categories,
}: {
  addTodo: (description: string, category: Category) => void;
  closeModal: () => void;
  categories: Category[];
}) {
  const [descriptionInput, setDescriptionInput] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | void>();

  const categoriesFormatted = categories.map((category, index) => {
    return { key: index.toString(), value: category.name };
  });


  const handleTodo = () => {
    if (!selectedCategoryId) {
      Toast.show({
        type: 'error',
        text1: 'Please select a category!',
      });
      return;
    }
    const selectedCategoryIndex = categories.findIndex(
      (category: Category) => category.id === selectedCategoryId
    );
    addTodo(descriptionInput, categories[selectedCategoryIndex]);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Pressable style={styles.closeButton} onPressOut={closeModal}>
        <AntDesign name="back" size={18} color={frappe.base} />
      </Pressable>
      <View style={styles.viewWrapper}>
        <Text style={styles.title}>What would you like to add?</Text>
        <TextInput
          placeholder="Add a title..."
          value={descriptionInput}
          onChangeText={setDescriptionInput}
          style={styles.input}
          cursorColor={frappe.crust}
        />
        <SelectList
          setSelected={(category: string) => {
            const found = categories.find((item) => item.name === category);
            setSelectedCategoryId(found!.id);
          }}
          data={categoriesFormatted}
          maxHeight={160}
          save="value"
          boxStyles={styles.categoryBox}
          dropdownStyles={styles.dropdownStyles}
          searchPlaceholder="Select a category..."
        />
        <Pressable style={styles.addTodoButton} onPressOut={handleTodo}>
          <Text style={styles.addTodoButtonText}>Add Todo</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: frappe.base,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    textAlign: 'center',
    fontSize: 26,
    color: frappe.text,
    marginTop: 10,
    width: '80%',
  },
  input: {
    width: '80%',
    backgroundColor: frappe.subtext0,
    borderRadius: 14,
    height: 55,
    color: frappe.base,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 16,
    marginTop: 10,
    maxWidth: 300,
  },
  addTodoButton: {
    width: '30%',
    backgroundColor: frappe.maroon,
    padding: 20,
    borderRadius: 14,
    marginTop: 30,
  },
  addTodoButtonText: {
    textAlign: 'center',
    color: frappe.crust,
  },
  closeButton: {
    backgroundColor: frappe.maroon,
    borderRadius: 10,
    width: 40,
    height: 40,
    position: 'absolute',
    top: 10,
    right: 28,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBox: {
    backgroundColor: frappe.flamingo,
    minWidth: 200,
    marginTop: 30,
    borderWidth: 0,
  },
  dropdownStyles: {
    backgroundColor: frappe.flamingo,
    color: frappe.text,
    borderWidth: 0,
  },
  viewWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
});
