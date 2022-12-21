import React from 'react';
import CategoryButton from '../components/CategoryButton';
import Page from '../components/Page/Page';
import {faPencil, faUserPlus, faFile} from '@fortawesome/free-solid-svg-icons';
import {useLocation} from 'wouter';

const Home = () => {
  const [, updateLocation] = useLocation();
  const goNewTask = () => updateLocation('/tasks/new');
  const goAssignTask = () => updateLocation('/tasks/assign/1');

  return (
    <Page title="Home">
      <div className="task-buttons">
        <CategoryButton title="Crear tarea" icon={faPencil} color="#BFDAEE" onClick={goNewTask} />

        <CategoryButton
          title="Asignar tareas"
          icon={faUserPlus}
          color="#F6D579"
          onClick={goAssignTask}
        />

        <CategoryButton
          title="Ver tareas"
          icon={faFile}
          color="#E88673"
          onClick={() => alert('Todavía no 🤬')}
        />
      </div>
    </Page>
  );
};

export default Home;
