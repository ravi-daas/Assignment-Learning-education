import React from 'react';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';

interface Props {
  visible: boolean;
  onComplete: () => void;
}

export default function ActivityModal({ visible, onComplete }: Props) {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Quick Activity!</Text>
          <Text>What does JSX stand for?</Text>
          <Button title="JavaScript XML" onPress={onComplete} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
