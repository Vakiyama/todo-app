import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox'; 
import { View, StyleSheet } from 'react-native';
import { frappe } from './catppuccin';

export type TodoItem = {
    id: string;
    title: string;
    isChecked: boolean; 
};

type TodoProps = {
    toggleChecked: (id: string) => void;
} & TodoItem;

export default function Todo({ 
    id,
    title,
    isChecked,
    toggleChecked,
}: TodoProps) {
    return (
        <View style={styles.container}> 
            <BouncyCheckbox
            style={styles.checkbox}
            size={25}
            fillColor={frappe.red}
            unfillColor={frappe.base}
            text={title}
            iconStyle={{ borderColor: frappe.red }}
            innerIconStyle={{ borderWidth: 1 }}
            onPress={() => toggleChecked(id)}
            isChecked={isChecked}
            textStyle={{ color: frappe.text }}
            />
        </View>
    );
}

const separatorSize: number = 5;

const styles = StyleSheet.create({
    container: {
        padding: 1,
    }, 
    checkbox: {
        marginTop: separatorSize,
        marginBottom: separatorSize,
    } 
})
