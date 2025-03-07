import React, { useState } from 'react';
import { View, StyleSheet, Alert,Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setLoading(true);
      await login(email, password);
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      Alert.alert('Login Failed', 'Please check your credentials and try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/google-tasks7052.logowik.com.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={handleLogin}
          loading={loading}
          style={styles.loginButton}
        >
          Login
        </Button>
        <Button 
          onPress={() => navigation.navigate('Signup')}
          style={styles.createAccountButton}
        >
          Create Account
        </Button>
      </View>
    </View>
  );
}const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
    backgroundColor: '#fff'
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: '15%',
    marginBottom: '10%'
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff'
  },
  buttonContainer: {
    marginTop: 24,
    gap: 12
  },
  loginButton: {
    padding: 4,
    borderRadius: 8
  },
  createAccountButton: {
    marginTop: 8
  }
});
