import React from 'react';
import {Task} from '../../common/types';
import Video from 'react-native-video';
import {Dimensions, View} from 'react-native';

const VideoSteps = (tarea: Task) => {
  const steps = tarea.steps.filter(single => single.type === 'video');
  const w = Dimensions.get('window').width;
  const h = Dimensions.get('window').height;
  return steps.map(singleStep => ({
    element: (
      <View
        style={{
          zIndex: 999999,
          width: w - 20,
          height: h / 3,
        }}>
        <Video
          source={{uri: singleStep.video ?? undefined}}
          onLoad={() => console.log('Video cargado')}
          onError={() => console.error('Error al cargar el video')}
          controls
          resizeMode="contain"
          style={{flex: 1}}
        />
      </View>
    ),
    id: singleStep.id,
    isDone: singleStep.isDone,
  }));
};

export default VideoSteps;
