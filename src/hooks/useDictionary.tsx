import {useEffect, useState} from 'react'
import { DictionaryController } from '../components/typingCore/DictionaryController';


const useDictionary = (url : string) => {
    const [dictionary, setDictionary] = useState<string[]>([]);

    useEffect(() => {
        async function fetchData(url : string){
            try{
                const response = await fetch(url)
                if(!response.ok){
                    throw new Error('Something went wrong with fetching a data from API');
                }
                const data = await response.json();
                if(data.length === 0){
                    throw new Error('Fetched data is empty');
                }
                const filteredData : string[] = DictionaryController.getInstance().filter(data);
                const randomWords : string[] = DictionaryController.getInstance().generateRandomWords(filteredData , 100);
                setDictionary(randomWords);
            }catch(err){
                console.error(err);
            }
        } 
        fetchData(url);
    },[url])

    return [dictionary];
}
export default useDictionary;
