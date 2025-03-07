import React, { useState } from 'react';
import { View, StyleSheet, Alert,route,params } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

const API_URL = 'http://192.168.1.5:5000/api'; 

export default function AddTaskScreen({ navigation,route }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const handleAddTask = async () => {
    try {
      console.log('Sending request to create task:', { title, description });
  
      const response = await api.post(
        '/tasks',
        { title, description },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );
  
      console.log('Created task successfully:', response.data);
  
      if (route.params && route.params.onTaskAdded) {
        route.params.onTaskAdded(response.data);
      }
  
      navigation.goBack();
    } catch (error) {
      console.log('Creation error:', error.response?.data || error.message);
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
        style={styles.input}
        multiline
      />
      <Button 
        mode="contained" 
        onPress={handleAddTask}
        loading={loading}
        disabled={!title || !description}
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
});
