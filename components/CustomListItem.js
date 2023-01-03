import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Avatar, ListItem } from '@rneui/themed';
import { ListItemSubtitle } from '@rneui/base/dist/ListItem/ListItem.Subtitle';

const CustomListItem = ({ id, chatName, enterChat }) => {
  return (
    <ListItem>
      <Avatar
        rounded
        source={{ uri: 'https://img.icons8.com/ios-glyphs/512/user.png' }}
      />

      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: 'bold' }}>
          YouTube Chat
        </ListItem.Title>

        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
          This is a test subtitle
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
