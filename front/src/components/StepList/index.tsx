import {faXmarkCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {Step} from '../../common/types';
import PictoStep from '../PictoStep';
import ImgStep from '../ImgStep';
import VideoStep from '../VideoStep';
import TextStep from '../TextStep';

interface StepListProps {
  list: Step[];
  type: string;
  onChangeStep: (step: Step, index: number, type: string) => void;
  onDelete: (index: number) => void;
}

const StepList = ({list, type, onChangeStep, onDelete}: StepListProps) => {
  switch (type) {
    case 'text':
      return (
        <>
          {list.map((step, index) => (
            <div className="step" key={`textStep${index}`}>
              <h3 className="step-index">{index + 1}</h3>
              <TextStep index={index} onChangeStep={onChangeStep} step={step} />
              <FontAwesomeIcon
                icon={faXmarkCircle}
                style={{color: '#E88673', cursor: 'pointer', fontSize: '1.5rem', marginLeft: 10}}
                onClick={() => onDelete(index)}
              />
            </div>
          ))}
        </>
      );
    case 'img':
      return (
        <>
          {list.map((step, index) => (
            <div className="step" key={`imgStep${index}`}>
              <h3 className="step-index">{index + 1}</h3>
              <ImgStep index={index} onChangeStep={onChangeStep} step={step} />
              <FontAwesomeIcon
                icon={faXmarkCircle}
                style={{color: '#E88673', cursor: 'pointer', fontSize: '1.5rem', marginLeft: 10}}
                onClick={() => onDelete(index)}
              />
            </div>
          ))}
        </>
      );
    case 'picto':
      return (
        <>
          {list.map((step, index) => (
            <div className="step" key={`textStep${index}`}>
              <h3 className="step-index">{index + 1}</h3>
              <PictoStep index={index} onChangeStep={onChangeStep} step={step} />
              <FontAwesomeIcon
                icon={faXmarkCircle}
                style={{color: '#E88673', cursor: 'pointer', fontSize: '1.5rem', marginLeft: 10}}
                onClick={() => onDelete(index)}
              />
            </div>
          ))}
        </>
      );
    case 'video':
      return (
        <>
          {list.map((step, index) => (
            <div className="step" key={`textStep${index}`}>
              <h3 className="step-index">{index + 1}</h3>
              <VideoStep index={index} onChangeStep={onChangeStep} step={step} />
              <FontAwesomeIcon
                icon={faXmarkCircle}
                style={{color: '#E88673', cursor: 'pointer', fontSize: '1.5rem', marginLeft: 10}}
                onClick={() => onDelete(index)}
              />
            </div>
          ))}
        </>
      );
  }
  return <></>;
};

export default StepList;
