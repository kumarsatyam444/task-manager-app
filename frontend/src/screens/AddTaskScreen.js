import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/taskSlice';
import api from '../utils/api';

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleAddTask = async () => {
    if (!title.trim()) return;

    try {
      setLoading(true);
      const response = await api.post('/tasks', {
        title,
        description,
      });
      
      dispatch(addTask(response.data));
      navigation.goBack();
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Task Title"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        multiline
        numberOfLines={4}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleAddTask}
        loading={loading}
        disabled={!title.trim()}
        style={styles.button}
      >
        Add Task
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
});
