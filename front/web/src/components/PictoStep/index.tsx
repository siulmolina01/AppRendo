import {faSearch, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {Form, InputGroup} from 'react-bootstrap';
import {StepProp} from '../../common/types';
import {ArasacImg} from '../../hooks/useArasaacSearch';
import PictogramSearch from '../PictogramSearch';
import './styles.css';

const myType = 'picto';
const PictoStep = ({onChangeStep, index, step}: StepProp) => {
  const [text, setText] = useState<string>('');
  const [picto, setPicto] = useState<ArasacImg | null>();
  const [show, setShow] = useState<boolean>(false);
  const [settingFromParent, setSettingFromParent] = useState<boolean>(true);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handlePictogramSelected = (picto: ArasacImg) => {
    setSettingFromParent(false);
    setPicto(picto);
    handleClose();
  };

  const clearPictogram = () => {
    setPicto(null);
  };

  useEffect(() => {
    if (!settingFromParent) {
      onChangeStep({title: text, file: picto, type: myType}, index, myType);
    }
  }, [text, picto, index]);

  useEffect(() => {
    setSettingFromParent(true);
    setText(step.title ?? '');
    setPicto(step.file);
  }, [step]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setSettingFromParent(false);
  };

  return (
    <div className="pasoCompleto">
      <PictogramSearch
        show={show}
        onHide={handleClose}
        onPictogramSelected={handlePictogramSelected}
      />
      <Form.Control
        className="borders"
        type="text"
        placeholder="Introduzca las instrucciones"
        value={text}
        onChange={handleTitleChange}
      />
      <InputGroup className="background-white keyword mt-2">
        <InputGroup.Text className="font borders-left no-border-right background-white">
          {picto ? (
            <img
              className="small-picto"
              alt={picto.meaning}
              src={picto.url}
              style={{width: 50, height: 50}}
            />
          ) : null}
        </InputGroup.Text>
        <Form.Control
          className="borders-no-round font no-border-left no-border-right"
          type="text"
          placeholder="Pictograma..."
          onClick={handleShow}
          value={picto?.keywords[0] || ''}
        />
        <InputGroup.Text className="font borders-right no-border-left background-white">
          {picto ? (
            <FontAwesomeIcon icon={faXmark} onClick={clearPictogram} />
          ) : (
            <FontAwesomeIcon icon={faSearch} />
          )}
        </InputGroup.Text>
      </InputGroup>
    </div>
  );
};

export default PictoStep;
