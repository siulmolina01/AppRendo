import React, {createContext, useEffect, useReducer, useState} from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import {Step} from '../common/types';
import Page from '../components/Page/Page';
import StepsForm from '../components/StepsForm';
import TaskForm from '../components/TaskForm';
import {Store} from 'react-notifications-component';
import {format} from 'date-fns';
import {BACKEND_URL} from '../common/constants';

interface FullTask {
  title: string;
  pupil: number | 'unassigned';
  startDate: Date | null;
  endDate: Date;
  icon: string | File | null;
  altText: string | null;
  iconType: string;
  steps: {
    text: Step[];
    img: Step[];
    picto: Step[];
    video: Step[];
  };
}

const initialState: FullTask = {
  title: '',
  pupil: 'unassigned',
  startDate: new Date(),
  endDate: new Date(),
  icon: null,
  altText: null,
  iconType: '',
  steps: {
    text: [],
    img: [],
    picto: [],
    video: [],
  },
};

const TaskReducer = (state: FullTask, action: any) => {
  switch (action.type) {
    case 'SET_TITLE':
      return {...state, title: action.payload};
    case 'SET_PUPIL':
      return {...state, pupil: action.payload};
    case 'SET_START_DATE':
      return {...state, startDate: action.payload};
    case 'SET_END_DATE':
      return {...state, endDate: action.payload};
    case 'SET_ICON':
      return {...state, icon: action.payload};
    case 'SET_STEPS':
      return {...state, steps: action.payload};
    case 'ICON_TYPE':
      return {...state, iconType: action.payload};
    case 'SET_ALT_TEXT':
      return {...state, altText: action.payload};
    default:
      return state;
  }
};

export const TaskStoreContext = createContext((null as unknown) as React.Dispatch<any>);

const isStepValid = (step: Step) => {
  return step.title || step.file;
};

const sendData = async (data: FormData, formType: number) => {
  if (formType === 1) {
    const response = await fetch(`${BACKEND_URL}/tasks/task/`, {
      method: 'POST',
      body: data,
    });
    return response;
  } else if (formType === 2) {
    const response = await fetch(`${BACKEND_URL}/tasks/command/`, {
      method: 'POST',
      body: data,
    });
    return response;
  }
};

const NewTask = () => {
  const [task, dispatch] = useReducer(TaskReducer, initialState);
  const [formType, setFormType] = useState<number>(0);

  const uploadTask = async () => {
    const data = new FormData();
    data.append('title', task.title);
    if (task.pupil !== 'unassigned') {
      data.append('pupil', task.pupil.toString());
    }
    data.append('startDate', format(task.startDate, 'dd/MM/yyyy'));
    data.append('endDate', format(task.endDate, 'dd/MM/yyyy'));
    if (task.iconType === 'picto') {
      data.append('picto', task.icon);
    } else if (task.iconType === 'img') {
      data.append('img', task.icon);
    }
    data.append('altText', task.altText);

    const textSteps = task.steps.text
      .filter((single: Step) => isStepValid(single))
      .map((step: Step) => ({
        title: step.title,
        text: step.file,
      }));

    const pictoSteps = task.steps.picto
      .filter((single: Step) => isStepValid(single))
      .map((step: Step) => ({
        title: step.title,
        picto: step.file?.url ?? '',
        altText: step.file?.meaning ?? 'pictograma de paso',
      }));

    data.append('textSteps', JSON.stringify(textSteps));
    data.append('pictoSteps', JSON.stringify(pictoSteps));

    // files
    data.append(
      'imgCount',
      task.steps.img.filter((single: Step) => isStepValid(single)).length.toString()
    );
    task.steps.img
      .filter((single: Step) => isStepValid(single))
      .forEach((step: Step, index: number) => {
        data.append(`imgTitle${index}`, step.title ?? '');
        data.append(`img${index}`, step.file);
        data.append(`imgAltText${index}`, 'Imagen del paso');
      });

    data.append(
      'videoCount',
      task.steps.video.filter((single: Step) => isStepValid(single)).length.toString()
    );
    task.steps.video
      .filter((single: Step) => isStepValid(single))
      .forEach((step: Step, index: number) => {
        data.append(`videoTitle${index}`, step.title ?? '');
        data.append(`video${index}`, step.file);
        data.append(`videoAltText${index}`, 'Video del paso');
      });

    // type of task
    switch (formType) {
      case 1:
        data.append('type', 'general');
        break;
      case 2:
        data.append('type', 'comanda');
        break;
    }
    // errors

    if (formType === 0) {
      Store.addNotification({
        title: '¡Oh no!',
        message: 'Debes elegir un tipo de tarea',
        type: 'danger',
        insert: 'top',
        container: 'bottom-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      return;
    }

    if (!task.title) {
      Store.addNotification({
        title: '¡Oh no!',
        message: 'El título no puede estar vacío',
        type: 'danger',
        insert: 'top',
        container: 'bottom-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      return;
    }

    if (!task.icon) {
      Store.addNotification({
        title: '¡Oh no!',
        message: 'Debes seleccionar un pictograma o imagen',
        type: 'danger',
        insert: 'top',
        container: 'bottom-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      return;
    }
    console.log(data);
    const response = await sendData(data, formType);

    if (!response || response.status === 201 || response.status === 200) {
      Store.addNotification({
        title: '¡Genial!',
        message: 'La tarea se ha creado correctamente',
        type: 'success',
        insert: 'top',
        container: 'bottom-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    } else {
      Store.addNotification({
        title: '¡Oh no!',
        message: 'Ha ocurrido un error al crear la tarea',
        type: 'danger',
        insert: 'top',
        container: 'bottom-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    }
  };

  const RightIcon = () => {
    if (task.icon) {
      return task.iconType === 'picto' ? (
        <img src={task.icon} alt={task.altText} />
      ) : (
        <img src={URL.createObjectURL(task.icon)} alt={task.altText} />
      );
    }
    return null;
  };

  return (
    <TaskStoreContext.Provider value={dispatch}>
      <Page title="Tareas">
        <Row>
          <Col lg={true}>
            <TaskForm formType={formType} updateFormType={t => setFormType(t)} />
          </Col>
          <Col lg={true} className="ps-5">
            {formType === 1 ? <StepsForm /> : null}
            {formType === 2 ? <RightIcon /> : null}
          </Col>
        </Row>
        <Button className="crear-tarea mt-5 mb-5" size="lg" onClick={uploadTask}>
          Crear tarea
        </Button>
      </Page>
    </TaskStoreContext.Provider>
  );
};
export default NewTask;
