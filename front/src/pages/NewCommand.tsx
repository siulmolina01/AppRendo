import React, {createContext, useReducer} from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import {Step} from '../common/types';
import Page from '../components/Page/Page';
import StepsForm from '../components/StepsForm';
import CommandForm from '../components/CommandForm';
import {Store} from 'react-notifications-component';
import {format} from 'date-fns';
import {BACKEND_URL} from '../common/constants';

interface FullCommand {
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

const initialState: FullCommand = {
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

const CommandReducer = (state: FullCommand, action: any) => {
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

export const CommandStoreContext = createContext((null as unknown) as React.Dispatch<any>);

const isStepValid = (step: Step) => {
  return step.title || step.file;
};

const NewCommand = () => {
  const [command, dispatch] = useReducer(CommandReducer, initialState);

  const uploadCommand = async () => {
    const data = new FormData();
    data.append('title', command.title);
    if (command.pupil !== 'unassigned') {
      data.append('pupil', command.pupil.toString());
    }
    data.append('startDate', format(command.startDate, 'dd/MM/yyyy'));
    data.append('endDate', format(command.endDate, 'dd/MM/yyyy'));
    if (command.iconType === 'picto') {
      data.append('picto', command.icon);
    } else if (command.iconType === 'img') {
      data.append('img', command.icon);
    }
    data.append('altText', command.altText);

    const textSteps = command.steps.text
      .filter((single: Step) => isStepValid(single))
      .map((step: Step) => ({
        title: step.title,
        text: step.file,
      }));

    const pictoSteps = command.steps.picto
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
      command.steps.img.filter((single: Step) => isStepValid(single)).length.toString()
    );
    command.steps.img
      .filter((single: Step) => isStepValid(single))
      .forEach((step: Step, index: number) => {
        data.append(`imgTitle${index}`, step.title ?? '');
        data.append(`img${index}`, step.file);
        data.append(`imgAltText${index}`, 'Imagen del paso');
      });

    data.append(
      'videoCount',
      command.steps.video.filter((single: Step) => isStepValid(single)).length.toString()
    );
    command.steps.video
      .filter((single: Step) => isStepValid(single))
      .forEach((step: Step, index: number) => {
        data.append(`videoTitle${index}`, step.title ?? '');
        data.append(`video${index}`, step.file);
        data.append(`videoAltText${index}`, 'Video del paso');
      });

    // errors
    if (!command.title) {
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

    if (!command.icon) {
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
    const response = await fetch(`${BACKEND_URL}/tasks/task/`, {
      method: 'POST',
      body: data,
    });

    if (response.status === 201 || response.status === 200) {
      Store.addNotification({
        title: '¡Genial!',
        message: 'La comanda se ha creado correctamente',
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
        message: 'Ha ocurrido un error al crear la comanda',
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

  return (
    <CommandStoreContext.Provider value={dispatch}>
      <Page title="Comandas">
        <Row>
          <Col lg={true}>
            <CommandForm />
          </Col>

          <Col lg={true} className="ps-5"></Col>
        </Row>
        <Button className="crear-tarea mt-5 mb-5" size="lg" onClick={uploadCommand}>
          Crear comanda
        </Button>
      </Page>
    </CommandStoreContext.Provider>

    // <CommandForm />
  );
};
export default NewCommand;
