import React, {useEffect, useState} from 'react';
import {useLocation} from 'wouter';
import Page from '../components/Page/Page';
import TaskAssignment from '../components/TaskAssignment';

const Assign = ({page}: {page: string | undefined}) => {
  const [_, updateLocation] = useLocation();
  // useEffect para que si no es valido el page, redirija a la pagina 1
  useEffect(() => {
    if (page) {
      const pageInt = parseInt(page);
      if (!pageInt) {
        updateLocation('/tasks/assign/1');
      }
    } else {
      updateLocation('/tasks/assign/1');
    }
  }, [page, updateLocation]);

  return (
    <Page title="Tareas">
      <TaskAssignment page={page} />
    </Page>
  );
};

export default Assign;
