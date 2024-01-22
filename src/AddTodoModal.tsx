import {
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import { frappe } from './catppuccin';
import { useState } from 'react';

export default function AddTodoModal({
  addTodo,
}: {
  addTodo: (description: string) => void;
}) {
  const [input, setInput] = useState('');

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>What would you like to add?</Text>
      <TextInput
        placeholder="Add a title..."
        value={input}
        onChangeText={setInput}
        style={styles.input}
        cursorColor={frappe.crust}
      />
      <Pressable style={styles.button} onPressOut={() => addTodo(input)}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </Pressable>
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
  },
  button: {
    width: '30%',
    backgroundColor: frappe.maroon,
    padding: 20,
    borderRadius: 14,
  },
  buttonText: {
    textAlign: 'center',
    color: frappe.crust,
  },
});
