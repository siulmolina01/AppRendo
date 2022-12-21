import {useEffect, useState} from 'react';
import {BACKEND_URL} from '../constants';
import {ResponseTask, Task} from '../types';

export const useGetSingleTask = (taskId: number) => {
  const url = `${BACKEND_URL}/tasks/task/${taskId}`;
  const [task, setTask] = useState<Task>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetch(url);
        const newTask: ResponseTask = await data.json();
        setTask({
          id: newTask.id,
          title: newTask.title,
          startDate: newTask.start_date,
          endDate: newTask.end_date,
          image: newTask.image,
          pictogram: newTask.pictogram,
          isDone: newTask.is_done,
          pupil: newTask.pupil,
          pupilName: newTask.pupil_name,
          description: newTask.pictogram_description,
          steps: newTask.steps.map(singleStep => ({
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
        });

        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    })();
  }, [url]);

  return {task, loading, error};
};
