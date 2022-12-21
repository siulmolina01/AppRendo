import {useEffect, useState} from 'react';
import {BACKEND_URL} from '../constants';
import {ResponseTask, Task} from '../types';

export const useGetTasks = (pupilId: number) => {
  const url = `${BACKEND_URL}/tasks/task/`;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetch(url);
        const newTasks = await data.json();
        setTasks(
          newTasks
            .filter((single: ResponseTask) => single.pupil === pupilId)
            .map(
              (single: ResponseTask): Task => ({
                id: single.id,
                title: single.title,
                startDate: single.start_date,
                endDate: single.end_date,
                image: single.image,
                pictogram: single.pictogram,
                isDone: single.is_done,
                pupil: single.pupil,
                pupilName: single.pupil_name,
                description: single.pictogram_description,
                steps: single.steps.map(singleStep => ({
                  id: singleStep.id,
                  title: singleStep.title,
                  text: singleStep.text,
                  image: singleStep.image,
                  isDone: singleStep.is_done,
                  task: singleStep.task,
                  type: singleStep.type,
                  video: singleStep.video,
                  position: singleStep.position,
                  picto: singleStep.pictogram,
                  pictoDescription: singleStep.pictogram_description,
                })),
              }),
            ),
        );

        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError('Error al obtener tareas');
      }
    })();
  }, [pupilId, url]);

  return {tasks, loading, error};
};
