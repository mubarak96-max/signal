import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar, ListItem } from '@rneui/themed';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const chatsCol = collection(db, 'chats', id, 'messages');

    const q = query(chatsCol, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesArr = [];
      querySnapshot.forEach((doc) => {
        messagesArr.push({ id: doc.id, data: doc.data() });
      });
      //   console.log('msgs', messagesArr);
      setChatMessages([...messagesArr]);

      console.log(chatMessages[0]);
    });

    return unsubscribe;
  }, []);

  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
      <Avatar
        rounded
        source={{
          uri: chatMessages[0]?.data?.photoURL
            ? chatMessages[0]?.data?.photoURL
            : 'https://img.icons8.com/ios-glyphs/512/user.png'
        }}
      />

      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: 'bold' }}>
          {chatName}
        </ListItem.Title>

        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
          {chatMessages[0]?.data?.displayName} :{' '}
          {chatMessages[0]?.data?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
