import {useEffect, useState} from 'react';

export interface ArasacImg {
  id: number;
  url: string;
  meaning: string;
  keywords: string[];
}

interface ArasaacResponseImg {
  _id: number;
  keywords: {keyword: string; meaning: string}[];
}

export const useArasaacSearch = (searchTerm: string) => {
  const BASE_URL = 'https://api.arasaac.org/api/pictograms/es/search/';
  const [results, setResults] = useState<ArasacImg[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      (async () => {
        try {
          const response = await fetch(`${BASE_URL}${searchTerm}`);
          const data = await response.json();
          setResults(
            data.map(({_id, keywords}: ArasaacResponseImg) => ({
              id: _id,
              meaning: keywords[0].meaning,
              keywords: keywords.map(({keyword}) => keyword),
              url: `https://api.arasaac.org/api/pictograms/${_id}`,
            }))
          );
          setLoading(false);
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      })();
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  return {results, loading};
};
