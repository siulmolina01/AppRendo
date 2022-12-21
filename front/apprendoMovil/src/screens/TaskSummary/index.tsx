import {ParamListBase, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-remix-icon';
import {grey, red, white} from '../../common/colors';
import {
  BACKEND_URL,
  checkIcon,
  defaultTaskIcon,
  fileIcon,
  warningIcon,
} from '../../common/constants';
import {useGetPupil} from '../../common/hooks/useGetPupil';
import {useGetSingleTask} from '../../common/hooks/useGetSingleTask';
import {emptyStep, Task, ViewType} from '../../common/types';
import ImgSteps from '../../components/ImgSteps';
import VideoSteps from '../../components/VideoSteps';
import PictoSteps from '../../components/PictoSteps';
import Screen from '../../components/Screen';
import Steps from '../../components/Steps';
import TextSteps from '../../components/TextStep';
import {styles} from './styles';

const TaskSummary = ({route}: ParamListBase) => {
  // ignoring next line because TS doesn't know that route.params exists
  // @ts-ignore next line
  const taskId = route?.params?.taskId ?? -1;
  const {
    task,
    loading: loadingTask,
    error: errorTask,
  } = useGetSingleTask(taskId);
  const {pupil, loading: loadingPupil, error: errorPupil} = useGetPupil(2);
  const [done, setDone] = useState<boolean>(false);
  const navigator = useNavigation();
  const [stepType, setStepType] = useState<ViewType>('picto');

  useEffect(() => {
    setDone(task?.isDone ?? false);
  }, [task]);

  useEffect(() => {
    if (pupil) {
      setStepType(pupil.viewType);
    }
  }, [pupil]);

  const handleOnPress = () => {
    const newDone = !done;
    (async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/tasks/task/${taskId}/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({is_done: newDone}),
        });
        const data = await response.json();
        setDone(data.is_done);
        if (data.is_done) {
          navigator.goBack();
        }
      } catch (err) {
        console.log(err);
      }
    })();
  };

  const adaptedSteps = (type: ViewType, tarea: Task) => {
    if (tarea.steps?.filter(({type: stype}) => stype === stepType).length > 0) {
      switch (type) {
        case 'picto':
          return PictoSteps(tarea);
        case 'image':
          return ImgSteps(tarea);
        case 'text':
          return TextSteps(tarea);
        case 'video':
          return VideoSteps(tarea);
        default:
          return [emptyStep];
      }
    } else {
      return [emptyStep];
    }
  };

  const MainContent = () => {
    if (loadingTask || loadingPupil) {
      return <ActivityIndicator size="large" color={red} />;
    }
    return task?.steps?.filter(({type: stype}) => stype === stepType).length ===
      0 ? (
      <View style={styles.mainContent}>
        <Text style={styles.title}>{task?.title}</Text>
        <Image
          accessible
          accessibilityLabel={task?.description ?? 'pictograma de la tarea'}
          source={{
            uri: task?.pictogram ?? task?.image ?? defaultTaskIcon,
          }}
          style={styles.icon}
        />
        <Text style={styles.done}>¿Hecho?</Text>
        <TouchableOpacity
          accessible
          accessibilityLabel={
            done ? 'Botón: tarea hecha' : 'Botón: tarea no hecha'
          }
          style={done ? styles.checkDone : styles.check}
          onPress={handleOnPress}>
          <Icon name={checkIcon} size={40} color={done ? white : grey} />
        </TouchableOpacity>
      </View>
    ) : (
      <Steps
        done={done}
        onFinish={handleOnPress}
        steps={adaptedSteps(stepType, task!)}
        showHand={stepType !== 'text'}
      />
    );
  };

  const ErrorComponent = () => {
    return (
      <View style={[styles.mainContent, styles.errorContainer]}>
        <Icon name={warningIcon} color={red} size={50} />
        <Text style={styles.errorText}>
          Hubo un error{'\n'}Inténtalo de nuevo
        </Text>
      </View>
    );
  };

  return (
    <Screen title="tarea" icon={fileIcon} backButton>
      <View style={styles.container}>
        {errorTask || errorPupil ? <ErrorComponent /> : <MainContent />}
      </View>
    </Screen>
  );
};

export default TaskSummary;
