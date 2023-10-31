import React, {useEffect, useRef, useState} from 'react';
import {getData} from './fetchData';
import {DictionaryController} from "./DictionaryController";
import {Word} from './Word'


export default function TypingContainer() {
    const [dictionary  , setDictionary ] = useState([""]);
    const [position, setPosition] = useState(0);
    const wordCorrectness : React.MutableRefObject<any[]> = useRef([]);
    useEffect(() => {
        getData().then((data) => {
            const filteredData : string[] = DictionaryController.getInstance().filter(data);
            const randomWords : string[] = DictionaryController.getInstance().generateRandomWords(filteredData , 100);
            setDictionary(randomWords);
            wordCorrectness.current = randomWords.map(word => '');
        }).catch((err) => {
            console.error(err);
        })
    }, []);

    function handleDataFromChild(data : number){
        setPosition(data);
    }
    function handleCorrectness(data : boolean){
        wordCorrectness.current[position] = data;
        console.log(wordCorrectness.current);
    }
    return (
        <section>
            <ul className="flex flex-wrap gap-4 text-gray-500">
                {dictionary.map((word,index) => (
                    <Word
                        active={position === index}
                        key={index}
                        id={index}
                        content={word}
                        activePosition={position}
                        previousCorrectness={position > 0 ? wordCorrectness.current[position - 1] : false}
                        sendDataToParent={handleDataFromChild}
                        sendCorrectnessToParent={handleCorrectness}
                    />
                ))}
            </ul>
        </section>
    )
}