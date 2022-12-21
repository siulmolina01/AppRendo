import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-remix-icon';
import {logoutIcon, menuIcon} from '../../common/constants';
import {LogoSVG} from '../../common/Logo';
import {styles} from './styles';

const AppBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name={menuIcon} />
      </View>
      <LogoSVG size={50} />
      <View style={styles.iconContainer}>
        <Icon name={logoutIcon} />
      </View>
    </View>
  );
};

export default AppBar;
