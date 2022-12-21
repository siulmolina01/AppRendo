import {faSearch, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {Col, Form, InputGroup, Row, Spinner, Table, Alert} from 'react-bootstrap';
import {useLocation} from 'wouter';
import {ITask} from '../../common/types';
import {useGetPupils} from '../../hooks/useGetPupils';
import {useGetTask} from '../../hooks/useGetTask';
import AssignRow from '../AssignRow';
import TaskPagination from '../TaskPagination';
import './stylesheet.css';

const TaskAssignment = ({page}: {page: string | undefined}) => {
  const [query, setQuery] = useState<string>('');
  const {results, loading, hasMore, hasPrev} = useGetTask(query, page ? parseInt(page) - 1 : 1);
  const [, updateLocation] = useLocation();
  const {pupils, loading: loadingPupils} = useGetPupils();

  const handleInputChange = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(value);
    updateLocation('/tasks/assign/1');
  };

  return (
    <div>
      <Row>
        <Col>
          <h1 className="mb-4 title">Asignar tareas</h1>
        </Col>
        <Col className="">
          <InputGroup className="fit-content float-right">
            <Form.Control
              className="borders-no-round font no-border-right"
              type="text"
              placeholder="Escribe para buscar..."
              value={query}
              onChange={handleInputChange}
            />
            <InputGroup.Text className="font borders-right no-border-left background-white">
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>
      {loading ? (
        <div style={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
          <Spinner animation="border" />
        </div>
      ) : results.length > 0 ? (
        <Table className="table-border">
          <thead className="table-header-font">
            <tr>
              <th className="ps-5 pt-4 pb-4">Título</th>
              <th className="ps-5 pt-4 pb-4">Alumno</th>
            </tr>
          </thead>
          <tbody className="no-border">
            {results.map(({taskId, taskTitle, pupilId, pupilName}: ITask) => {
              return (
                <AssignRow
                  taskId={taskId}
                  taskTitle={taskTitle}
                  pupilId={pupilId}
                  pupilName={pupilName}
                  pupilList={pupils}
                  loading={loadingPupils}
                />
              );
            })}
          </tbody>
        </Table>
      ) : (
        <Alert variant="warning">No hay tareas para mostrar</Alert>
      )}
      <div className="mt-5">
        <TaskPagination page={page ? parseInt(page) : 1} hasNext={hasMore} hasPrev={hasPrev} />
      </div>
    </div>
  );
};

export default TaskAssignment;
