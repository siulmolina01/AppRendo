import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-remix-icon';
import {red, white} from '../../common/colors';
import {chatIcon, forbiddenIcon} from '../../common/constants';
import Screen from '../../components/Screen';

const Chat = () => {
  return (
    <Screen title="Chat" icon={chatIcon}>
      <View
        style={{
          justifyContent: 'center',
          backgroundColor: white,
          height: '70%',
        }}>
        <Text style={{color: red, textAlign: 'center', fontSize: 40}}>
          Todavía no implementado :)
        </Text>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Icon name={forbiddenIcon} color={red} size={120} />
        </View>
      </View>
    </Screen>
  );
};

export default Chat;
