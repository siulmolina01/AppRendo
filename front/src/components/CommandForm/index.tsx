import React, {useContext, useState} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import {Form, InputGroup, Row, Col, OverlayTrigger, Tooltip, Spinner} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faSearch, faCalendarAlt, faXmark} from '@fortawesome/free-solid-svg-icons';
import './stylesheet.css';
import PictogramSearch from '../PictogramSearch';
import {ArasacImg} from '../../hooks/useArasaacSearch';
import {CommandStoreContext} from '../../pages/NewCommand';
import {useGetPupils} from '../../hooks/useGetPupils';

const CommandForm = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [show, setShow] = useState<boolean>(false);
  const [pictogram, setPictogram] = useState<ArasacImg | null>(null);
  const [img, setImg] = useState<File | null>(null);
  const [showPictoTooltip, setShowPictoTooltip] = useState<boolean>(false);
  const [showImgTooltip, setShowImgTooltip] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const dispatch = useContext(CommandStoreContext);

  const {pupils, loading} = useGetPupils();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handlePictogramSelected = (picto: ArasacImg) => {
    setPictogram(picto);
    dispatch({type: 'SET_ICON', payload: picto.url});
    dispatch({type: 'ICON_TYPE', payload: 'picto'});
    dispatch({type: 'SET_ALT_TEXT', payload: picto.meaning});

    handleClose();
  };

  const clearPictogram = () => {
    setPictogram(null);
    dispatch({type: 'SET_ICON', payload: null});
    dispatch({type: 'ICON_TYPE', payload: ''});
    dispatch({type: 'SET_ALT_TEXT', payload: null});
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImg(e.target.files[0]);
      dispatch({type: 'SET_ICON', payload: e.target.files[0]});
      dispatch({type: 'ICON_TYPE', payload: 'img'});
      dispatch({type: 'SET_ALT_TEXT', payload: 'Imagen de la comanda'});
    }
  };

  const handlePictoOnMouseEnter = () => {
    if (!!img) {
      setShowPictoTooltip(true);
      disableTooltip(() => setShowPictoTooltip(false));
    }
  };

  const handleImgOnMouseEnter = () => {
    if (!!pictogram) {
      setShowImgTooltip(true);
      disableTooltip(() => setShowImgTooltip(false));
    }
  };

  const disableTooltip = (disable: () => void) => {
    setTimeout(() => disable(), 2000);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    dispatch({type: 'SET_TITLE', payload: e.target.value});
  };

  const handlePupilChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({type: 'SET_PUPIL', payload: e.target.value});
  };

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
    dispatch({type: 'SET_START_DATE', payload: date});
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
    dispatch({type: 'SET_END_DATE', payload: date});
  };

  return (
    <div>
      <PictogramSearch
        show={show}
        onHide={handleClose}
        onPictogramSelected={handlePictogramSelected}
      />
      <h1 className="mb-4 title">Crear comanda</h1>
      <Form>
        <Form.Group className="mb-4">
          <Row>
            <Col>
              <InputGroup>
                <Form.Control
                  className="borders font"
                  type="text"
                  placeholder="Título"
                  value={title}
                  onChange={handleTitleChange}
                />
              </InputGroup>
            </Col>
            <Col>
              {loading ? (
                <Spinner animation="border" />
              ) : (
                <InputGroup>
                  <InputGroup.Text className="font borders-left no-border-right background-white">
                    <FontAwesomeIcon icon={faUser} />
                  </InputGroup.Text>

                  <Form.Select
                    className="font borders-right no-border-left"
                    onChange={handlePupilChange}
                  >
                    <option selected value={'unassigned'}>
                      Selecciona un alumno
                    </option>
                    {pupils.map(pupil => (
                      <option key={pupil.id} value={pupil.id}>
                        {pupil.name}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              )}
            </Col>
          </Row>
        </Form.Group>

        <div onMouseEnter={handlePictoOnMouseEnter}>
          <OverlayTrigger
            overlay={
              <Tooltip id="tooltip-disabled">
                No se puede elegir un pictograma si ya hay imagen subida
              </Tooltip>
            }
            placement="bottom"
            show={showPictoTooltip}
            trigger="hover"
          >
            <Form.Group>
              <InputGroup className="mb-5 background-white keyword">
                <InputGroup.Text className="font borders-left no-border-right background-white">
                  {pictogram ? (
                    <img
                      className="small-picto"
                      alt={pictogram.meaning}
                      src={pictogram.url}
                      style={{width: 50, height: 50}}
                    />
                  ) : null}
                </InputGroup.Text>
                <Form.Control
                  className="borders-no-round font no-border-left no-border-right"
                  type="text"
                  placeholder="Pulsa para buscar un pictograma..."
                  onClick={handleShow}
                  value={pictogram?.keywords[0] || ''}
                  disabled={!!img}
                />
                <InputGroup.Text className="font borders-right no-border-left background-white">
                  {pictogram ? (
                    <FontAwesomeIcon
                      icon={faXmark}
                      onClick={clearPictogram}
                      style={{cursor: 'pointer'}}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faSearch} />
                  )}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </OverlayTrigger>
        </div>

        <div id="separator" className="mb-5 font">
          — o —
        </div>

        <div onMouseEnter={handleImgOnMouseEnter}>
          <OverlayTrigger
            overlay={
              <Tooltip id="tooltip-disabled">
                No se puede subir una imagen si ya hay un pictograma
              </Tooltip>
            }
            trigger="hover"
            show={showImgTooltip}
          >
            <Form.Group className="mb-4">
              <Form.Control
                className="font borders"
                type="file"
                disabled={!!pictogram}
                accept=".jpg, .jpeg, .png"
                onChange={handleUpload}
              />
            </Form.Group>
          </OverlayTrigger>
        </div>

        <Form.Group className="mb-4 command-checkbox">
          <input className="command-checkbox-input" type="checkbox" />
          <span className="ms-2 command-checkbox-text">
            Permitir el cálculo automático de cantidades
          </span>
        </Form.Group>
      </Form>
    </div>
  );
};

export default CommandForm;
