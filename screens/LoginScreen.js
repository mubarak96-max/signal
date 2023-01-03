import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import SignalImage from '../assets/signal.png';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace('Home');
      }
    });

    return unsubscribe;
  }, []);

  // useEffect(() => {
  //   const unsubscribe = auth.authStateChanged((authUser) => {
  //     if (authUser) {
  //       navigation.replace('Home');
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  const navigation = useNavigation();

  const signIn = () => {};

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />

      <Image
        source={SignalImage}
        style={{
          width: 130,
          height: 130,
          marginLeft: 25,
          marginTop: 25,
          borderRadius: 10
        }}
      />

      <View style={styles.inputContainer}>
        <Input
          placeholder='Email'
          type='Email'
          autoFocus
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder='Password'
          secureTextEntry
          type='password'
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <Button title='Login' containerStyle={styles.button} onPress={signIn} />
      <Button
        title='Register'
        type='outline'
        containerStyle={styles.button}
        onPress={() => navigation.navigate('Register')}
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyCenter: 'center',
    padding: 10,
    backgroundColor: 'white'
  },
  inputContainer: { width: 300 },
  button: { width: 200, marginTop: 10 }
});

export default LoginScreen;
