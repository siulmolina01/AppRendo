import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import Form from 'react-bootstrap/Form';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import {Step} from '../../common/types';
import {Nav} from 'react-bootstrap';
import StepList from '../StepList';
import {TaskStoreContext} from '../../pages/NewTask';

export const emptyStep = (step: Step) => {
  return step.title === '' && step.file === undefined;
};

const StepsForm = () => {
  const [textSteps, setTextSteps] = useState<Step[]>([{}, {}, {}]);
  const [imgSteps, setImgSteps] = useState<Step[]>([{}, {}, {}]);
  const [pictoSteps, setPictoSteps] = useState<Step[]>([{}, {}, {}]);
  const [videoSteps, setVideoSteps] = useState<Step[]>([{}, {}, {}]);
  const [currentType, setCurrentType] = useState<string>('text');
  const dispatch = useContext(TaskStoreContext);

  const onAddStep = useCallback(() => {
    switch (currentType) {
      case 'text':
        setTextSteps(prev => [...prev, {}]);
        break;
      case 'img':
        setImgSteps(prev => [...prev, {}]);
        break;
      case 'picto':
        setPictoSteps(prev => [...prev, {}]);
        break;
      case 'video':
        setVideoSteps(prev => [...prev, {}]);
        break;
    }
  }, [currentType]);

  useEffect(() => {
    dispatch({
      type: 'SET_STEPS',
      payload: {text: textSteps, img: imgSteps, picto: pictoSteps, video: videoSteps},
    });
    console.log(textSteps);
  }, [textSteps, imgSteps, pictoSteps, videoSteps, dispatch]);

  const changeStep = useCallback((step: Step, index: number, type: string) => {
    if (!emptyStep(step)) {
      switch (type) {
        case 'text':
          setTextSteps(prev => {
            const newSteps = [...prev];
            newSteps[index] = step;
            return newSteps;
          });
          break;
        case 'img':
          setImgSteps(prev => {
            const newSteps = [...prev];
            newSteps[index] = step;
            return newSteps;
          });
          break;
        case 'picto':
          setPictoSteps(prev => {
            const newSteps = [...prev];
            newSteps[index] = step;
            return newSteps;
          });
          break;
        case 'video':
          setVideoSteps(prev => {
            const newSteps = [...prev];
            newSteps[index] = step;
            return newSteps;
          });
          break;
      }
    }
  }, []);

  const ShowSteps = useMemo(() => {
    switch (currentType) {
      case 'text':
        return (
          <StepList
            list={textSteps}
            type={currentType}
            onChangeStep={changeStep}
            onDelete={(index: number) => setTextSteps(prev => prev.filter((_, i) => i !== index))}
          />
        );
      case 'img':
        return (
          <StepList
            list={imgSteps}
            type={currentType}
            onChangeStep={changeStep}
            onDelete={(index: number) => setImgSteps(prev => prev.filter((_, i) => i !== index))}
          />
        );
      case 'picto':
        return (
          <StepList
            list={pictoSteps}
            type={currentType}
            onChangeStep={changeStep}
            onDelete={(index: number) => setPictoSteps(prev => prev.filter((_, i) => i !== index))}
          />
        );

      case 'video':
        return (
          <StepList
            list={videoSteps}
            type={currentType}
            onChangeStep={changeStep}
            onDelete={(index: number) => setVideoSteps(prev => prev.filter((_, i) => i !== index))}
          />
        );
    }
    return <></>;
  }, [currentType, textSteps, imgSteps, pictoSteps, videoSteps]);

  return (
    <div className="FormularioPasos">
      <div className="botones-pasos">
        <h1 className="headerTitulo">Pasos</h1>
        <Nav variant="pills" defaultActiveKey="text" className="verde">
          <Nav.Item>
            <Nav.Link className="btn-izq" eventKey="text" onClick={() => setCurrentType('text')}>
              Texto
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="btn-med" eventKey="imagen" onClick={() => setCurrentType('img')}>
              Imagen
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="btn-med" eventKey="picto" onClick={() => setCurrentType('picto')}>
              Pictograma
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="btn-der" eventKey="video" onClick={() => setCurrentType('video')}>
              Vídeo
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <Form className="formulario mt-4">
        <Form.Group className="pasosNumerados">{ShowSteps}</Form.Group>
        <div className="newStep-btn" onClick={onAddStep}>
          <FontAwesomeIcon icon={faCirclePlus} className="newStep-icon" />
          <span className="newStep-txt">Añadir paso</span>
        </div>
      </Form>
    </div>
  );
};

export default StepsForm;
