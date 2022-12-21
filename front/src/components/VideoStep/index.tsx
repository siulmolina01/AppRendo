import {faUpload} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useRef, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {StepProp} from '../../common/types';
import './styles.css';

const myType = 'video';
const VideoStep = ({onChangeStep, index, step}: StepProp) => {
  const [text, setText] = useState<string>('');
  const [video, setVideo] = useState<File | undefined>();
  const [settingFromParent, setSettingFromParent] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettingFromParent(false);
    if (e.target.files) {
      setVideo(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (!settingFromParent) {
      onChangeStep({title: text, file: video, type: myType}, index, myType);
    }
  }, [text, video, index]);

  useEffect(() => {
    setSettingFromParent(true);
    setText(step.title ?? '');
    setVideo(step.file);
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
        {video ? (
          <>
            <div style={{overflow: 'hidden', width: '100%', flexDirection: 'row', display: 'flex'}}>
              <video style={{marginTop: -50, height: 175}}>
                <source src={URL.createObjectURL(video)} type={video.type} />
              </video>

              <div
                style={{
                  flexDirection: 'column',
                  display: 'flex',
                  justifyContent: 'space-around',
                  padding: 20,
                }}
              >
                <h6 style={{alignSelf: 'center'}}>{video.name}</h6>
                <Button variant="upload" onClick={() => inputRef.current?.click()}>
                  <FontAwesomeIcon icon={faUpload} style={{marginRight: 10}} />
                  Cambiar video
                </Button>
              </div>
            </div>
            <Form.Control
              ref={inputRef}
              className="font borders"
              type="file"
              placeholder="Selecciona una imagen"
              onChange={handleUpload}
              accept=".mp4, .webm, .mpg, .mpeg"
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
            accept=".mp4, .webm, .mpg, .mpeg"
          />
        )}
      </div>
    </div>
  );
};

export default VideoStep;
