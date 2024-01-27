import React, { useState } from 'react';
import {
  Pressable,
  Modal,
  View,
  TextInput,
  StyleSheet,
  Text,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { frappe } from './catppuccin';
import Toast from 'react-native-toast-message';

export default function CostModal({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) {
  const [sprintDurationDays, setSprintDurationDays] = useState<string>('7');
  const [pointsPerSprint, setPointsPerSprint] = useState<string>('21');

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.container}>
        <Pressable
          style={styles.closeButton}
          onPressOut={() => setVisible(false)}
        >
          <AntDesign name="back" size={18} color={frappe.base} />
        </Pressable>
        <Text style={styles.text}>How many days per sprint?</Text>
        <TextInput
          onChangeText={setSprintDurationDays}
          value={sprintDurationDays}
          style={styles.sprintInput}
          cursorColor={frappe.base}
        />
        <Text style={styles.text}>How many points per sprint?</Text>
        <TextInput
          onChangeText={setPointsPerSprint}
          value={pointsPerSprint}
          style={styles.sprintInput}
          cursorColor={frappe.base}
        />
      </View>
      <Toast />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: frappe.base,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
  sprintInput: {
    width: '20%',
    backgroundColor: frappe.maroon,
    borderRadius: 10,
    height: 50,
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
  },
  text: {
    color: frappe.text,
    marginVertical: 30,
    fontSize: 20,
  },
});
