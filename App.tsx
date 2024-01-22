import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TodoList from './src/TodoList';
import { frappe } from './src/catppuccin';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TodoList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: frappe.base,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 35,
  },
});
