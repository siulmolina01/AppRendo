import React from 'react';
import {Task} from '../../common/types';
import {Image} from 'react-native';
import {styles} from './style';
import {defaultTaskIcon} from '../../common/constants';

const ImgSteps = (tarea: Task) => {
  const steps = tarea.steps.filter(single => single.type === 'image');
  return steps.map(singleStep => ({
    element: (
      <Image
        source={{uri: singleStep.image ?? defaultTaskIcon}}
        style={styles.image}
      />
    ),
    id: singleStep.id,
    isDone: singleStep.isDone,
  }));
};

export default ImgSteps;
