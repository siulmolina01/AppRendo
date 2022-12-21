import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';
import './style.css';

const assignTaskButton = () => {
  return (
    <button className="assignTaskButton">
      <div className="userlIcon-div mt-5 mb-5">
        <FontAwesomeIcon className="userlIcon" icon={faUserPlus} />
      </div>
      <div className="assignTaskText mb-5">Asignar Tarea</div>
    </button>
  );
};

export default assignTaskButton;
