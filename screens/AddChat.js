import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Input, Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AddChat = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a new chat',
      headerBackTitle: 'Chats'
    });
  }, [navigation]);

  const createChat = async () => {
    try {
      await addDoc(collection(db, 'chats'), {
        chatName: input
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder='Enter a new chat'
        value={input}
        onChangeText={(text) => setInput(text)}
        leftIcon={<AntDesign name='wechat' size={24} />}
      />

      <Button disabled={!input} title='Create new chat' onPress={createChat} />
    </View>
  );
};

export default AddChat;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    padding: 25
  }
});
