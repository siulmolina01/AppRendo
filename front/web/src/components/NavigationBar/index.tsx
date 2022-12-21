import React from 'react';
import {Navbar, Container} from 'react-bootstrap';
import logo from '../../assets/logo.svg';
import './styles.css';
import {useLocation} from 'wouter';

const NavigationBar = () => {
  const [, updateLocation] = useLocation();
  return (
    <Navbar variant="apprendo" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => updateLocation('/')} style={{cursor: 'pointer'}}>
          <img src={logo} width={50} height={50} alt="Logo" />
          <span className="app-title">AppRendo</span>
        </Navbar.Brand>
        <Navbar.Text>
          Bienvenido, <a href="#">Admin</a>
        </Navbar.Text>
        {/* <Navbar.Toggle /> */}
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
