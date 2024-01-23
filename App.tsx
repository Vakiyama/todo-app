import { StyleSheet, Text, View, StatusBar } from 'react-native';
import TodoList from './src/TodoList';
import { frappe } from './src/catppuccin';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={frappe.base} />
      <TodoList />
      <Toast />
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
  },
});
