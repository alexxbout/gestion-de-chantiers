// AuthScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { FIREBASE_AUTH } from '../config/firebaseConfig'; // Import Firebase Auth instance
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"; // Import specific methods

const AuthScreen: React.FC = () => {
  // Define state with TypeScript types
  const [email, setEmail] = useState<string>(''); // Email must be a string
  const [password, setPassword] = useState<string>(''); // Password must be a string
  const [isLogin, setIsLogin] = useState<boolean>(true); // Boolean to toggle login/signup

  // Handle authentication actions
  const handleAuthAction = async () => {
    try {
      if (isLogin) {
        // Logging in a user
        const cred = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
        console.log(cred);
        
        Alert.alert('Logged in successfully');
      } else {
        // Registering a new user
        await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
        Alert.alert('User registered successfully');
      }
    } catch (error: any) { // Type 'error' as 'any' to access 'message'
      Alert.alert('Error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button title={isLogin ? 'Login' : 'Sign Up'} onPress={handleAuthAction} />

      <Text style={styles.switchText}>
        {isLogin ? 'Need an account? ' : 'Already have an account? '}
        <Text style={styles.switchLink} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Sign Up' : 'Login'}
        </Text>
      </Text>
    </View>
  );
};

// Style definitions
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  switchText: {
    marginTop: 20,
    textAlign: 'center',
  },
  switchLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default AuthScreen;
