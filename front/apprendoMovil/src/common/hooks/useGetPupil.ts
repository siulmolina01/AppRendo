import {useEffect, useState} from 'react';
import {BACKEND_URL} from '../constants';
import {Pupil, ResponsePupil} from '../types';

export const useGetPupil = (id: number) => {
  const [pupil, setPupil] = useState<Pupil | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(
          BACKEND_URL + '/accounts/pupil/' + id.toString(),
        );
        const data: ResponsePupil = await response.json();
        setPupil({
          id: id,
          username: data.username,
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          calculateCommandTotals: data.calculate_command_totals,
          viewType: data.type_of_view,
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError(true);
      }
    })();
  }, [id]);

  return {loading, error, pupil};
};
