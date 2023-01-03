import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomListItem from '../components/CustomListItem';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '@rneui/themed';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

const HomeScreen = () => {
  const navigation = useNavigation();

  const [chats, setChats] = useState([]);

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigation.replace('Login');
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const getChats = async () => {
    try {
      const serviceArr = [];
      const querySnapshot = await getDocs(servicesCol);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        serviceArr.push({ id: doc.id, data: doc.data() });
      });
      setServices([...serviceArr]);
    } catch (error) {
      console.log('error', error.message);
    }
  };

  useEffect(() => {
    const chatsRef = collection(db, 'chats');

    const unsubscribe = onSnapshot(chatsRef, (querySnapshot) => {
      const chatsArr = [];
      querySnapshot.forEach((doc) => {
        chatsArr.push({ id: doc.id, data: doc.data() });
      });

      setChats([...chatsArr]);
      console.log('Chats', chats);
    });

    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerStyle: { background: 'white' },
      headerTitleStyle: { color: 'black' },
      headerTintColor: 'black',
      headerLeft: () => (
        <View style={{ marginLeft: 20, marginRight: 20 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
            <Avatar
              rounded
              source={{
                uri: auth?.currentUser?.photoURL
                  ? auth?.currentUser?.photoURL
                  : 'https://img.icons8.com/ios-glyphs/512/user.png'
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 70,
            marginRight: 15
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name='camerao' size={22} color='black' />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('AddChat')}
          >
            <SimpleLineIcons name='pencil' size={22} color='black' />
          </TouchableOpacity>
        </View>
      )
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate('Chat', { id, chatName });
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats?.map(({ id, data: { chatName } }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({ container: { height: '100%' } });
