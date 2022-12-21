import React, {useEffect, useState} from 'react';
import {Form} from 'react-bootstrap';
import {StepProp} from '../../common/types';

const myType = 'text';
const TextStep = ({onChangeStep, index, step}: StepProp) => {
  const [text, setText] = useState<string>();
  const [desc, setDesc] = useState<string>();
  const [settingFromParent, setSettingFromParent] = useState<boolean>(true);

  useEffect(() => {
    if (!settingFromParent) {
      onChangeStep({title: text, file: desc, type: myType}, index, myType);
    }
  }, [text, desc, index]);

  useEffect(() => {
    setSettingFromParent(true);
    setText(step.title ?? '');
    setDesc(step.file);
  }, [step]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setSettingFromParent(false);
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
    setSettingFromParent(false);
  };

  return (
    <div className="pasoCompleto">
      <Form.Control
        className="borders"
        type="text"
        placeholder="Introduzca el título"
        value={text}
        onChange={handleTitleChange}
      />
      <Form.Control
        className="borders mt-2"
        as="textarea"
        rows={3}
        placeholder="Introduzca la descripción"
        value={desc}
        onChange={handleDescChange}
      />
    </div>
  );
};

export default TextStep;
