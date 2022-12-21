import React from 'react';
import {Task} from '../../common/types';
import {Image} from 'react-native';
import {styles} from './style';
import {defaultTaskIcon} from '../../common/constants';

const PictoSteps = (tarea: Task) => {
  const steps = tarea.steps.filter(single => single.type === 'picto');
  return steps.map(singleStep => ({
    element: (
      <Image
        source={{uri: singleStep.picto ?? defaultTaskIcon}}
        style={styles.picto}
      />
    ),
    id: singleStep.id,
    isDone: singleStep.isDone,
  }));
};

export default PictoSteps;
