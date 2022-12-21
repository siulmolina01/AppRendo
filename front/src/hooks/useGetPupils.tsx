import {useEffect, useState} from 'react';
import {BACKEND_URL} from '../common/constants';
import {Pupil, IResponsePupil} from '../common/types';

export const useGetPupils = () => {
  const [pupils, setPupils] = useState<Pupil[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const BASE_URL = `${BACKEND_URL}/accounts/pupil/`;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setPupils(
        data.map(
          (single: IResponsePupil): Pupil => ({
            id: single.id,
            name: single.first_name + ' ' + single.last_name,
            email: single.email,
            userType: single.user_type,
            user: single.username,
            calculate: single.calculate_command_totals,
          })
        )
      );
      setLoading(false);
    })();
  }, []);

  return {pupils, loading};
};
