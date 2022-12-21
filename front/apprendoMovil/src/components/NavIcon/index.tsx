import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-remix-icon';
import {white} from '../../common/colors';

const NavIcon = ({
  name,
  iconName,
  focused,
  color,
}: {
  name: string;
  iconName: string;
  focused: boolean;
  color: string;
}) => {
  return (
    <View
      style={[styles.container, {backgroundColor: focused ? color : white}]}>
      <View style={[styles.iconContainer]}>
        <Icon name={iconName} color={focused ? white : color} />
      </View>
      <Text
        style={[
          styles.textStyle,
          {
            color: focused ? white : color,
            fontWeight: focused ? '800' : '600',
          },
        ]}>
        {name}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    padding: 7,
  },
  textStyle: {
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 14,
  },
});

export default NavIcon;
