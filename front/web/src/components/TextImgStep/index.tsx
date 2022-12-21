import {faUpload} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useRef, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {StepProp} from '../../common/types';
import './styles.css';

const myType = 'text';

const TextImgStep = ({onChangeStep, index, step}: StepProp) => {
  const [text, setText] = useState<string>('');
  const [img, setImg] = useState<File | undefined>();
  const [settingFromParent, setSettingFromParent] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettingFromParent(false);
    if (e.target.files) {
      setImg(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (!settingFromParent) {
      onChangeStep({title: text, file: img, type: myType}, index, myType);
    }
  }, [text, img, index, settingFromParent]);

  useEffect(() => {
    setSettingFromParent(true);
    setText(step.title ?? '');
    setImg(step.file);
  }, [step]);

  return (
    <div className="pasoCompleto">
      <Form.Control
        className="borders font mb-2"
        type="text"
        placeholder="Introduzca las instrucciones"
        value={text}
        onChange={e => {
          setSettingFromParent(false);
          setText(e.target.value);
        }}
      />
      <div className="imagen">
        {img ? (
          <>
            <div style={{overflow: 'hidden', width: '100%', flexDirection: 'row', display: 'flex'}}>
              <img
                src={URL.createObjectURL(img)}
                style={{marginTop: -50, height: 175}}
                alt={img.name}
              />
              <div
                style={{
                  flexDirection: 'column',
                  display: 'flex',
                  justifyContent: 'space-around',
                  padding: 20,
                }}
              >
                <h6 style={{alignSelf: 'center'}}>{img.name}</h6>
                <Button variant="upload" onClick={() => inputRef.current?.click()}>
                  <FontAwesomeIcon icon={faUpload} style={{marginRight: 10}} />
                  Cambiar imagen
                </Button>
              </div>
            </div>
            <Form.Control
              ref={inputRef}
              className="font borders"
              type="file"
              placeholder="Selecciona una imagen"
              onChange={handleUpload}
              accept=".jpg, .jpeg, .png"
              style={{display: 'none'}}
              multiple={false}
            />
          </>
        ) : (
          <Form.Control
            className="font borders"
            type="file"
            placeholder="Selecciona una imagen"
            onChange={handleUpload}
            multiple={false}
            accept=".jpg, .jpeg, .png"
          />
        )}
      </div>
    </div>
  );
};

export default TextImgStep;
