import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSignup = async () => {
    try {
      setLoading(true);
      await signup(email, password);
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
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
        label="Name"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
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
          onPress={handleSignup}
          loading={loading}
          style={styles.signupButton}
        >
          Sign Up
        </Button>
        <Button 
          onPress={() => navigation.navigate('Login')}
          style={styles.loginButton}
        >
          Already have an account? Login
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  signupButton: {
    padding: 4,
    borderRadius: 8
  },
  loginButton: {
    marginTop: 8
  }
});
