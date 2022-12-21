import React, {useEffect, useState} from 'react';
import {Task} from '../../common/types';
import {View, Text, Image} from 'react-native';
import {styles} from './styles';
import {defaultTaskIcon} from '../../common/constants';
import {getFontScale} from 'react-native-device-info';

const TextSteps = (tarea: Task) => {
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

  const steps = tarea.steps.filter(single => single.type === 'text');
  return steps.map(singleStep => ({
    element: (
      <View style={styles.container}>
        <Text style={[styles.title, {fontSize: fontScale * 20}]}>
          {tarea.title}
        </Text>
        <Image
          accessible
          accessibilityLabel={tarea.description ?? 'Descripcion de la tarea'}
          source={{
            uri: tarea.pictogram ?? tarea.image ?? defaultTaskIcon,
          }}
          style={styles.icon}
        />
        <View style={styles.step}>
          <Text style={[styles.position, {fontSize: fontScale * 24}]}>
            {singleStep.position}
          </Text>
          <Text style={[styles.stepTitle, {fontSize: fontScale * 15}]}>
            {singleStep.title}
          </Text>
        </View>
        <Text style={[styles.description, {fontSize: fontScale * 15}]}>
          {singleStep.text}
        </Text>
      </View>
    ),
    id: singleStep.id,
    isDone: singleStep.isDone,
  }));
};

export default TextSteps;
