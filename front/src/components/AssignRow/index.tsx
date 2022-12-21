import {faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {ReactNode, useState} from 'react';
import {Form, InputGroup, Spinner} from 'react-bootstrap';
import {ITask, Pupil} from '../../common/types';
import {Store} from 'react-notifications-component';
import {BACKEND_URL} from '../../common/constants';

interface AssignRowProps extends ITask {
  pupilList: Pupil[];
  loading: boolean;
}

const AssignRow = ({taskTitle, pupilName, taskId, pupilId, pupilList, loading}: AssignRowProps) => {
  const BASE_URL = `${BACKEND_URL}/tasks/task/${taskId}/`;

  const handleChange = async ({target: {value}}: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({pupil: value === 'unassigned' ? null : value}),
      });
      const data = await response.json();
      if (data.id) {
        Store.addNotification({
          title: '¡Genial!',
          message: 'Se ha asignado la tarea correctamente',
          type: 'success',
          insert: 'top',
          container: 'bottom-right',
          animationIn: ['animated', 'fadeIn'],
          animationOut: ['animated', 'fadeOut'],
          dismiss: {
            duration: 6000,
            onScreen: true,
          },
        });
      } else {
        throw new Error('Error al asignar la tarea');
      }
    } catch (error) {
      Store.addNotification({
        title: '¡Oh no!',
        message: 'No se ha asignado la tarea correctamente',
        type: 'danger',
        insert: 'top',
        container: 'bottom-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {
          duration: 6000,
          onScreen: true,
        },
      });
    }
  };

  return (
    <tr className="ptb-5">
      <td className="middle ps-5 pt-4 pb-4 table-title-font">{taskTitle}</td>
      <td className="ps-5 pt-4 pb-4">
        <InputGroup>
          <InputGroup.Text className="font borders-left no-border-right background-white">
            <FontAwesomeIcon icon={faUser} />
          </InputGroup.Text>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <Form.Select className="font borders-right no-border-left" onChange={handleChange}>
              <option value={'unassigned'} selected={pupilId === null}>
                Selecciona un alumno
              </option>
              {pupilList.map(pupil => (
                <option key={pupil.id} value={pupil.id} selected={pupil.id === pupilId}>
                  {pupil.name}
                </option>
              ))}
            </Form.Select>
          )}
        </InputGroup>
      </td>
    </tr>
  );
};

export default AssignRow;
