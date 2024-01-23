import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { frappe } from './catppuccin';
import { type Category } from './ManageCategoriesModal';

export type TodoItem = {
  id: string;
  title: string;
  isChecked: boolean;
  category: Category;
};

type TodoProps = {
  color: keyof typeof frappe;
  toggleChecked: (id: string) => void;
  removeTodo: (id: string) => void;
} & TodoItem;

export default function Todo({
  id,
  title,
  isChecked,
  color,
  toggleChecked,
  removeTodo,
}: TodoProps) {
  return (
    <View style={styles.container}>
      <BouncyCheckbox
        style={styles.checkbox}
        size={25}
        fillColor={frappe[color]}
        unfillColor={frappe.base}
        text={title}
        iconStyle={{ borderColor: frappe[color] }}
        innerIconStyle={{ borderWidth: 1 }}
        onPress={() => toggleChecked(id)}
        isChecked={isChecked}
        textStyle={{ color: frappe.text }}
      />
      <Pressable style={styles.removeButton} onPressOut={() => removeTodo(id)}>
        <Text style={styles.removeText}>-</Text>
      </Pressable>
    </View>
  );
}

const separatorSize: number = 5;

const styles = StyleSheet.create({
  container: {
    padding: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkbox: {
    marginTop: separatorSize,
    marginBottom: separatorSize,
  },
  removeButton: {
    paddingHorizontal: 10,
  },
  removeText: {
    fontSize: 30,
    color: frappe.text,
  },
});
