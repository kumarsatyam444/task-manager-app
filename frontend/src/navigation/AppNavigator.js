import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const token = useSelector(state => state.auth.token);

  return (
    <Stack.Navigator>
      {!token ? (
        <>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Signup" 
            component={SignupScreen}
            options={{ title: 'Create Account' }}
          />
        </>
      ) : (
        <>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ 
              title: 'My Tasks',
              headerLeft: null,
            }}
          />
          <Stack.Screen 
            name="AddTask" 
            component={AddTaskScreen}
            options={{ title: 'Add New Task' }}
          />
          <Stack.Screen 
            name="TaskDetail" 
            component={TaskDetailScreen}
            options={{ title: 'Task Details' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
