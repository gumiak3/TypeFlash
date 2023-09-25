import react, {useEffect, useState} from 'react';
import {getData} from './fetchData';
import {DictionaryController} from "./DictionaryController";


export default function Dictionary() {
    const [dictionary  , setDictionary ] = useState(["initial value"]);
    useEffect(() => {
        getData().then((data) => {
            const filteredData : string[] = DictionaryController.getInstance().filter(data);
            const randomWords : string[] = DictionaryController.getInstance().generateRandomWords(filteredData , 100);
            setDictionary(filteredData);

        }).catch((err) => {
            console.error(err);
        })
    }, [])

    return (
        <>
        </>
    )
}