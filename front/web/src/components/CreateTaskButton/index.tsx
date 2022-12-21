import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencil} from '@fortawesome/free-solid-svg-icons';
import './style.css';

const createTaskButton = () => {
  return (
    <button className="createTaskButton">
      <div className="pencilIcon-div mt-5 mb-5">
        <FontAwesomeIcon className="pencilIcon" icon={faPencil} />
      </div>
      <div className="createTaskText mb-5">Crear Tarea</div>
    </button>
  );
};

export default createTaskButton;
