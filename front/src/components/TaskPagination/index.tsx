import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import {useLocation} from 'wouter';
import './stylesheet.css';

interface IPagination {
  page: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const TaskPagination = ({page, hasNext, hasPrev}: IPagination) => {
  const [location, setLocation] = useLocation();

  const prevLocation = () => {
    const path = location.split('/');
    path[path.length - 1] = `${page - 1}`;
    console.log(path.join('/'));
    setLocation(path.join('/'));
  };

  const nextLocation = () => {
    const path = location.split('/');
    path[path.length - 1] = `${page + 1}`;
    console.log(path.join('/'));
    setLocation(path.join('/'));
  };

  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <button className="button-prev-next" onClick={prevLocation} disabled={!hasPrev}>
        <FontAwesomeIcon icon={faArrowLeft} />
        <div>Anterior</div>
      </button>
      <div className="page">{page ?? 1}</div>
      <button className="button-prev-next" onClick={nextLocation} disabled={!hasNext}>
        <div>Siguiente</div>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};
export default TaskPagination;
