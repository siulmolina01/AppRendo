import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-remix-icon';
import {grey2, red} from '../../common/colors';
import {goBackIcon} from '../../common/constants';
import {styles} from './styles';

interface ScreenProps {
  children: React.ReactNode;
  title: string;
  icon: string;
  backButton?: boolean;
}

const Screen = ({children, title, icon, backButton = false}: ScreenProps) => {
  const navigator = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {backButton ? (
          <TouchableOpacity
            accessible
            accessibilityLabel="Navegación: boton ir atras"
            style={styles.back}
            onPress={() => navigator.goBack()}>
            <Icon name={goBackIcon} color={grey2} />
          </TouchableOpacity>
        ) : null}
        <View
          accessible={true}
          accessibilityLabel={title}
          style={[styles.titleContainer, backButton && {}]}>
          <View style={styles.iconContainer}>
            <Icon name={icon} color={red} />
          </View>
          <Text style={styles.title}>{title}</Text>
        </View>
        {/* pequeña triquiñuela de alieamiento */}
        {backButton && <View style={styles.hidden} />}
      </View>
      {children}
    </View>
  );
};

export default Screen;
