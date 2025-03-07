import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet,route, } from 'react-native';
import { List, FAB, IconButton } from 'react-native-paper';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuthHeaders } from '../utils/api';

import { api, API_URL } from '../utils/api';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const { token, logout } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="logout"
          onPress={handleLogout}
          color="#000"
        />
      ),
    });
  }, [navigation]);
  const handleTaskAdded = async (newTask) => {
    console.log('Adding new task:', newTask);
  
    setTasks((prevTasks) => [newTask, ...prevTasks]); 
    setTimeout(fetchTasks, 500); 
  };
  
  
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };
  const fetchTasks = async () => {
    try {
      if (!token) return;
      
      console.log('Fetching tasks using token:', token);
  
      const response = await axios.get(`${API_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Tasks fetched:', response.data);
      setTasks(response.data);
    } catch (error) {
      console.log('Fetch tasks error:', error.response?.data || error.message);
    }
  };
  
  
  useEffect(() => {
    if (token) {
      fetchTasks();
      const unsubscribe = navigation.addListener('focus', fetchTasks);
      return unsubscribe;
    }
  }, [token, navigation]);
  
  
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({ item }) => (
          <List.Item
            title={item.title}
            description={item.description}
            right={props => (
              <IconButton
                icon="delete"
                onPress={() => handleDelete(item._id)}
              />
            )}
            onPress={() => navigation.navigate('TaskDetail', { task: item })}
          />
        )}
        keyExtractor={item => item._id}
      />
<FAB
  style={styles.fab}
  icon="plus"
  onPress={() => {
    console.log('Navigating to AddTaskScreen');
    navigation.navigate('AddTask', { onTaskAdded: handleTaskAdded });
  }}
/>


    </View>
  );
}const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
