import React, {
    useState,
} from 'react';
import { 
    FlatList,
    StyleSheet,
    Text,
    View 
} from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import Todo, { type TodoItem } from './Todo';
import { frappe } from './catppuccin';

function generateTodo(index: number): TodoItem {
    return {
        id: uuid(),
        title: `example ${index}`,
        isChecked: false,
    }
}

const exampleTodos: TodoItem[] = [
    generateTodo(1),
    generateTodo(2),
    generateTodo(3),
];

const exampleTodosLong: TodoItem[] = [];
for (let i = 0; i < 100; i++) { exampleTodosLong.push(generateTodo(i)) }

export default function TodoList() {
    const [todos, setTodos] = useState<TodoItem[]>(exampleTodosLong);

    function updateTodo(id: string) {
        const todoIndex = todos.findIndex(item => item.id === id);
        if (todoIndex === -1) return;
        const newTodos = [...todos];
        newTodos[todoIndex].isChecked = !newTodos[todoIndex].isChecked;
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Todo List</Text>         
            <FlatList
            style={styles.list}
            data={todos}
            keyExtractor={item => item.id}
            renderItem={({item}) => 
                <Todo 
                    id={item.id}
                    toggleChecked={updateTodo}
                    isChecked={item.isChecked} 
                    title={item.title}
                />
                }
            >
            </FlatList>
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
    }
});

