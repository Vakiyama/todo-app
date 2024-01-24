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
  cost: number;
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
  cost,
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
      <View style={styles.rightWrapper}>
        <View style={styles.costWrapper}>
          <Text style={[styles.costText, { color: frappe[color] }]}>
            {cost !== 0 ? cost : null}
          </Text>
        </View>
        <Pressable
          style={styles.removeButton}
          onPressOut={() => removeTodo(id)}
        >
          <Text style={styles.removeText}>-</Text>
        </Pressable>
      </View>
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
    alignItems: 'center',
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
    position: 'relative',
    bottom: 1,
    transform: [{ scaleX: 1.4 }],
  },
  rightWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  costWrapper: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  costText: {
    fontSize: 20,
    color: frappe.base,
  },
});
