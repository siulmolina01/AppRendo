import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {red} from '../../common/colors';
import {fileIcon, rightArrowIcon} from '../../common/constants';
import {useGetTasks} from '../../common/hooks/useGetTasks';
import Screen from '../../components/Screen';
import {styles} from './style';
import {getFontScale} from 'react-native-device-info';
import Icon from 'react-native-remix-icon';
import {Task} from '../../common/types';
import {ParamListBase} from '@react-navigation/native';
const pupilID = 2;

const Tasks = ({navigation}: ParamListBase) => {
  const {tasks, loading, error} = useGetTasks(pupilID);
  const [fontScale, setFontScale] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const fontSc = await getFontScale();
        setFontScale(fontSc);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleOnPress = (id: number) => {
    // @ts-ignore next line
    navigation?.navigate('TaskSummary', {taskId: id});
  };

  const Item = ({item}: {item: Task}) => {
    return (
      <TouchableOpacity
        style={styles.taskEntryContainer}
        key={item.id}
        onPress={() => handleOnPress(item.id)}>
        <Text style={[styles.taskEntry, {fontSize: 20 * fontScale}]}>
          {item.title}
        </Text>
        <Icon name={rightArrowIcon} size={fontScale * 20} />
      </TouchableOpacity>
    );
  };

  const Result = () => {
    if (loading) {
      return <ActivityIndicator size="large" color={red} />;
    }
    if (error) {
      return (
        <Text style={[styles.errorText, {fontSize: fontScale * 20}]}>
          Hubo un error al cargar las tareas
        </Text>
      );
    }
    if (tasks?.length === 0) {
      return (
        <Text style={[styles.errorText, {fontSize: fontScale * 20}]}>
          No hay tareas
        </Text>
      );
    }
    return (
      <FlatList
        style={styles.mainContent}
        data={tasks}
        renderItem={Item}
        keyExtractor={item => item.id.toString()}
      />
    );
  };

  return (
    <Screen title="tareas" icon={fileIcon}>
      <View style={styles.container}>
        <Result />
      </View>
    </Screen>
  );
};

export default Tasks;
