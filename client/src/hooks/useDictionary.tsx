import { useEffect, useState } from 'react';
import { DictionaryController } from './DictionaryController';

const useDictionary = (url: string) => {
  const [dictionary, setDictionary] = useState<string[]>([]);

  async function fetchData(url: string): Promise<string[]> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Something went wrong with fetching a data from API');
      }
      const data = await response.json();
      if (data.length === 0) {
        throw new Error('Fetched data is empty');
      }
      const filteredData: string[] = DictionaryController.getInstance().filter(data);

      return DictionaryController.getInstance().generateRandomWords(filteredData, 300);
    } catch (err) {
      console.error(err);
    }
    return [];
  }
  async function refetchData() {
    return fetchData(url);
  }

  useEffect(() => {
    async function fetch() {
      setDictionary(await fetchData(url));
    }
    fetch();
  }, [url]);

  return { dictionary, refetchData };
};
export default useDictionary;
