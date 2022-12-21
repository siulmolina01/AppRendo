import React, {ReactNode} from 'react';
import {Container} from 'react-bootstrap';
import './styles.css';

const Page = ({title, children}: {title: string; children: ReactNode}) => {
  return (
    <Container>
      <h1 className="task-title">{title}</h1>
      <div className="main-content">{children}</div>
    </Container>
  );
};

export default Page;
