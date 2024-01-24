import {
  KeyboardAvoidingView,
  Pressable,
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';
import { frappe } from './catppuccin';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { v4 as uuid } from 'uuid';
import { SelectList } from 'react-native-dropdown-select-list';

export type Category = {
  id: string;
  name: string;
  color: keyof typeof frappe;
};

export default function ManageCategoriesModal({
  closeModal,
  categories,
  addCategory,
  removeCategory,
}: {
  closeModal: () => void;
  categories: Category[];
  addCategory: (category: Category) => void;
  removeCategory: (id: string) => void;
}) {
  const [categoryInput, setCategoryInput] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<
    keyof typeof frappe | void
  >();

  function handleAddCategory(name: string) {
    const alreadyExists = categories.findIndex(
      (category) => category.name === name
    );
    if (alreadyExists !== -1) {
      Toast.show({
        type: 'error',
        text1: 'That category already exists.',
      });
      return;
    }

    if (selectedColor === undefined) {
      Toast.show({
        type: 'error',
        text1: 'Select a color!',
      });
      return;
    }

    const newCategory: Category = {
      id: uuid(),
      name,
      color: selectedColor,
    };

    addCategory(newCategory);
    setCategoryInput('');
  }

  const colorsFormatted = Object.keys(frappe).map((color, index) => {
    return { key: index.toString(), value: color };
  });

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Pressable style={styles.closeButton} onPressOut={closeModal}>
        <AntDesign name="back" size={18} color={frappe.base} />
      </Pressable>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Manage Categories</Text>
        <TextInput
          placeholder="Add a title..."
          value={categoryInput}
          onChangeText={setCategoryInput}
          style={styles.input}
          cursorColor={frappe.crust}
        />
        <SelectList
          setSelected={(color: keyof typeof frappe) => {
            setSelectedColor(color);
          }}
          data={colorsFormatted}
          maxHeight={160}
          save="value"
          boxStyles={styles.categoryBox}
          dropdownStyles={styles.dropdownStyles}
          searchPlaceholder="Select a color..."
        />
        <FlatList
          style={styles.categoryList}
          data={categories}
          keyExtractor={(category) => category.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.categoryWrapper,
                { backgroundColor: frappe[item.color] },
              ]}
            >
              <Text style={styles.categoryText}>{item.name}</Text>
              <Pressable style={styles.removeCategory} onPressOut={() => removeCategory(item.id)}>
                <AntDesign name="close" size={16} color={frappe.surface0} />
              </Pressable>
            </View>
          )}
        />
        <Pressable
          style={styles.addCategoryButton}
          onPressOut={() => handleAddCategory(categoryInput)}
        >
          <Text style={styles.addCategoryButtonText}>Add category</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: frappe.base,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    color: frappe.text,
    fontSize: 26,
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
  addCategoryButton: {
    width: '80%',
    backgroundColor: frappe.teal,
    borderRadius: 10,
    display: 'flex',
    height: 50,
    justifyContent: 'center',
  },
  addCategoryButtonText: {
    color: frappe.crust,
    textAlign: 'center',
  },
  wrapper: {
    height: 380,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    backgroundColor: frappe.maroon,
    padding: 10,
    borderRadius: 10,
    minWidth: 200,
    marginTop: 40,
    marginBottom: 10,
  },
  categoryBox: {
    backgroundColor: frappe.flamingo,
    minWidth: 200,
    marginTop: 30,
    borderWidth: 0,
    marginBottom: 10,
  },
  dropdownStyles: {
    backgroundColor: frappe.flamingo,
    color: frappe.text,
    borderWidth: 0,
  },
  categoryWrapper: {
    borderRadius: 10,
    backgroundColor: frappe.subtext0,
    paddingVertical: 10,
    marginVertical: 5,
    minWidth: 160,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryList: {
    marginBottom: 10,
  },
  categoryText: {
    color: frappe.base,
  },
  removeCategory: {
    position: 'absolute',
    paddingHorizontal: 8,
    right: 10,
  },
});
/*
 *
              <Pressable style={styles.removeCategory}>
                <Text style={styles.removeCategoryButtonIcon}>-</Text>
 *
 * */
