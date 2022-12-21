import React, {useCallback} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {styles} from './styles';
import NavIcon from '../NavIcon';

interface TabScreen {
  name: string;
  component: JSX.Element;
  iconName: string;
  color: string;
}

interface tabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}

const NavBar = ({screens}: {screens: TabScreen[]}) => {
  const Tab = createBottomTabNavigator();

  const getTab = useCallback(
    ({name, component}: {name: string; component: JSX.Element}) => (
      <Tab.Screen key={name} name={name}>
        {_props => component}
      </Tab.Screen>
    ),
    [Tab],
  );

  const tabs = screens.map(getTab);

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIconStyle: styles.iconStyle,
          tabBarIcon: ({focused}: tabBarIconProps) => {
            const iconName =
              screens.find(({name}) => name === route.name)?.iconName ?? '';
            return (
              <NavIcon
                name={route.name}
                iconName={iconName}
                focused={focused}
                color={
                  screens.find(({name}) => name === route.name)?.color ?? ''
                }
              />
            );
          },
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBarStyle,
          headerShown: false,
          tabBarActiveBackgroundColor:
            screens.find(({name}) => name === route.name)?.color ?? '',
        })}>
        {tabs}
      </Tab.Navigator>
    </>
  );
};

export default NavBar;
