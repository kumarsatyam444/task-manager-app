import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Switch, Text } from 'react-native-paper';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function TaskDetailScreen({ route, navigation }) {
  const { task } = route.params;
  const { token } = useAuth();
  
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://192.168.1.5:5000/api';

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await axios.put(
        `${API_URL}/tasks/${task._id}`,
        { title, description, completed },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
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
