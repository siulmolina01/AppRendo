import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Button, Form, Modal, Spinner} from 'react-bootstrap';
import {ArasacImg, useArasaacSearch} from '../../hooks/useArasaacSearch';
import './styles.css';

interface PictogramSearchProps {
  show: boolean;
  onHide: () => void;
  onPictogramSelected: (pictogram: ArasacImg) => void;
}

const PictogramSearch = ({show, onHide, onPictogramSelected}: PictogramSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [keyword, setKeyword] = useState('');
  const {results: pictograms, loading} = useArasaacSearch(keyword);
  const handleInputChange = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(value);
    if (!value) {
      setKeyword('');
    }
  };

  const choosePictogram = (picto: ArasacImg) => {
    onPictogramSelected(picto);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword(searchTerm);
    return false;
  };

  const showPictograms = () => {
    if (loading) return <Spinner animation="border" />;
    if (pictograms.length === 0 && keyword) return <p>No se encontraron resultados</p>;
    return (
      <div className="pictograms-results">
        {pictograms.map(pictogram => (
          <div className="image-container">
            <img className="image" key={pictogram.id} src={pictogram.url} alt={pictogram.meaning} />
            <div className="pictogram-search-form yes-border">
              <Button variant="verde" onClick={() => choosePictogram(pictogram)}>
                Añadir pictograma
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Modal show={show} onHide={onHide} size="xl">
        <div style={{padding: 20}}>
          <h2>Buscador de pictogramas de Arasaac</h2>
          <Form onSubmit={handleSubmit} className="pictogram-search-form">
            <Form.Control
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              isValid={false}
              autoFocus={true}
            />
            <Button variant="verde" type="submit">
              Buscar
            </Button>
          </Form>
          {showPictograms()}
        </div>
      </Modal>
    </>
  );
};

export default PictogramSearch;
