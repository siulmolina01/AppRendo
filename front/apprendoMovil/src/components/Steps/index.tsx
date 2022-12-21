import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View, ToastAndroid} from 'react-native';
import {styles} from './styles';
import {useArasaacIndex} from '../../common/hooks/useArasaacIndex';
import Icon from 'react-native-remix-icon';
import {
  BACKEND_URL,
  checkIcon,
  leftArrowIcon,
  rightArrowIcon,
} from '../../common/constants';
import {grey, white} from '../../common/colors';

export interface ChildStep {
  id: number;
  element: JSX.Element;
  isDone: boolean;
}
export interface StepsProps {
  steps: ChildStep[];
  onFinish: () => void;
  done: boolean;
  showHand: boolean;
}

const setDone = async (done: boolean, id: number) => {
  try {
    const response = await fetch(`${BACKEND_URL}/tasks/step/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        is_done: done,
      }),
    });
    if (response.status === 200 || response.status === 201) {
      return true;
    } else {
      throw new Error('Error al actualizar el paso');
    }
  } catch (error) {
    ToastAndroid.show('Error al marcar el paso como hecho', ToastAndroid.LONG);
    return false;
  }
};

const Steps = ({steps, onFinish, done, showHand}: StepsProps) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const currentPageIcon = useArasaacIndex(currentPage);

  useEffect(() => {
    const start = steps.findIndex(step => step.isDone === false);
    console.log(start);
    if (start !== -1) {
      setCurrentPage(start);
    } else {
      setCurrentPage(steps.length - 1);
    }
  }, [steps]);

  const renderStep = () => {
    return steps[currentPage].element ? steps[currentPage].element : null;
  };

  const BlankSpace = ({w, h}: {w: number; h: number}) => {
    return <View style={{width: w, height: h}} />;
  };

  return (
    <View style={styles.mainContent}>
      <View style={styles.handCounter}>
        {showHand ? (
          currentPageIcon ? (
            <Image
              source={{uri: currentPageIcon}}
              style={{height: 80, width: 80}}
            />
          ) : (
            <View style={{height: 80}} />
          )
        ) : null}
      </View>
      <View style={styles.children}>{renderStep()}</View>
      <View style={styles.buttons}>
        {currentPage !== 0 ? (
          <TouchableOpacity
            onPress={() => {
              setCurrentPage(prev => prev - 1);
              setDone(false, steps[currentPage - 1].id);
            }}
            style={styles.buttonContainer}>
            <Icon name={leftArrowIcon} size={25} />
          </TouchableOpacity>
        ) : (
          <BlankSpace w={30} h={30} />
        )}
        {currentPage < steps.length - 1 ? (
          <TouchableOpacity
            onPress={() => {
              setCurrentPage(prev => prev + 1);
              setDone(true, steps[currentPage].id);
            }}
            style={styles.buttonContainer}>
            <Icon name={rightArrowIcon} size={25} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            accessible
            accessibilityLabel={
              done ? 'Botón: tarea hecha' : 'Botón: tarea no hecha'
            }
            style={done ? styles.checkDone : styles.check}
            onPress={() => {
              setDone(!done, steps[currentPage].id);
              onFinish();
            }}>
            <Icon name={checkIcon} size={40} color={done ? white : grey} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Steps;
