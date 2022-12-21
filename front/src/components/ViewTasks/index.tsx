import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFile} from '@fortawesome/free-solid-svg-icons';
import './style.css';

const viewTasksButton = () => {
  return (
    <button className="viewTasksButton">
      <div className="fileIcon-div mt-5 mb-5">
        <FontAwesomeIcon className="fileIcon" icon={faFile} />
      </div>
      <div className="viewTasksText mb-5">Crear Tarea</div>
    </button>
  );
};

export default viewTasksButton;
