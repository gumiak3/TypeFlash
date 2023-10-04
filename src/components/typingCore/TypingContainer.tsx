import React, {useEffect, useState} from 'react';
import {getData} from './fetchData';
import {DictionaryController} from "./DictionaryController";
import {Word} from './Word'

export default function TypingContainer() {
    const [dictionary  , setDictionary ] = useState([""]);

    useEffect(() => {
        getData().then((data) => {
            const filteredData : string[] = DictionaryController.getInstance().filter(data);
            const randomWords : string[] = DictionaryController.getInstance().generateRandomWords(filteredData , 100);
            setDictionary(randomWords);
        }).catch((err) => {
            console.error(err);
        })
    }, []);
    let id = 0;
    return (
        <section>
            <ul className="flex flex-wrap gap-4 text-gray-500">
                {dictionary.map((word) => (
                    <Word
                        key={id++}
                        content={word}
                    />
                ))}
            </ul>
        </section>
    )
}