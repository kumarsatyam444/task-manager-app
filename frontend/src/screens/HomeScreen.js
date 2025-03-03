import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { FAB, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks, deleteTask } from '../redux/taskSlice';
import { logout } from '../redux/authSlice';
import TaskItem from '../components/TaskItem';
import api from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);

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

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      dispatch(logout());
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  


  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      dispatch(deleteTask(taskId));
      Alert.alert('Success', 'Task deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      Alert.alert('Error', 'Failed to delete task');
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      dispatch(setTasks(response.data));
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onPress={() => navigation.navigate('TaskDetail', { task: item })}
            onDelete={handleDelete}
          />
        )}
        keyExtractor={item => item._id}
        refreshing={false}
        onRefresh={fetchTasks}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddTask')}
      />
    </View>
  );
}


const styles = StyleSheet.create({
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
