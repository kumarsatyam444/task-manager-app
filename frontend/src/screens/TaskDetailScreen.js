import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Switch, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { updateTask } from '../redux/taskSlice';
import api from '../utils/api';

export default function TaskDetailScreen({ route, navigation }) {
  const { task } = route.params;
  const dispatch = useDispatch();
  
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await api.put(`/tasks/${task._id}`, {
        title,
        description,
        completed,
      });
      dispatch(updateTask(response.data));
      navigation.goBack();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Title"
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
      <View style={styles.switchContainer}>
        <Text>Completed</Text>
        <Switch
          value={completed}
          onValueChange={setCompleted}
        />
      </View>
      <Button
        mode="contained"
        onPress={handleUpdate}
        loading={loading}
        style={styles.button}
      >
        Update Task
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});
