import {useEffect, useState} from 'react';
import {BACKEND_URL} from '../common/constants';
import {IResponseTask, ITask} from '../common/types';

export const useGetTask = (query: string, page: number) => {
  const BASE_URL = `${BACKEND_URL}/tasks/task/?`;
  const [results, setResults] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [hasPrev, setHasPrev] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const urlParams = new URLSearchParams();
      urlParams.append('limit', '5');
      urlParams.append('offset', `${page * 5}`);
      if (query) {
        urlParams.append('search', query);
      }
      console.log(BASE_URL + urlParams.toString());
      const data = await fetch(BASE_URL + urlParams.toString());
      const {results: newResults, next, previous} = await data.json();
      setHasPrev(previous !== null);
      setHasMore(next !== null);
      setResults(
        newResults.map(
          (singleResult: IResponseTask): ITask => ({
            taskTitle: singleResult.title,
            pupilName: singleResult.pupil_name,
            taskId: singleResult.id,
            pupilId: singleResult.pupil,
          })
        )
      );
      console.log(newResults);
      setLoading(false);
    })();
  }, [query, page]);

  return {results, loading, hasMore, hasPrev};
};
