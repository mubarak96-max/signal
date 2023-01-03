import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp
} from 'firebase/firestore';
import { auth, db } from '../firebase';

const Chat = ({ route }) => {
  const navigation = useNavigation();

  const [input, setInput] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerTitleAlign: 'left',
      headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar
            rounded
            source={{ uri: 'https://img.icons8.com/ios-glyphs/512/user.png' }}
          />
          <Text style={{ color: 'white', marginLeft: 10, fontWeight: '700' }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 80,
            marginRight: 10
          }}
        >
          <TouchableOpacity>
            <FontAwesome name='video-camera' size={24} color='white' />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='call' size={24} color='white' />
          </TouchableOpacity>
        </View>
      )
    });
  }, []);

  const sendMessage = () => {
    Keyboard.dismiss();

    try {
      addDoc(collection(db, 'chats', route?.params?.id, 'messages'), {
        displayName: auth.currentUser.displayName,
        message: input,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
        timestamp: serverTimestamp()
      });

      setInput('');
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    // const chatsCol = db(collection('chats', route.params.id, 'messages'));

    const chatsCol = collection(db, 'chats', route.params.id, 'messages');

    const q = query(chatsCol, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesArr = [];
      querySnapshot.forEach((doc) => {
        messagesArr.push({ id: doc.id, data: doc.data() });
      });
      console.log('msgs', messagesArr);
    });

    return unsubscribe;
  }, [route]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style='light' />
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={90}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <>
            <ScrollView></ScrollView>
            <View style={styles.footer}>
              <TextInput
                value={input}
                onChangeText={(text) => setInput(text)}
                placeholder='Message...'
                style={styles.textInput}
                onSubmitEditing={sendMessage}
              />

              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name='send' size={24} color='skyblue' />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: { flex: 1 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    color: 'grey',
    borderRadius: 30,
    backgroundColor: 'lightblue',
    padding: 10
  }
});
