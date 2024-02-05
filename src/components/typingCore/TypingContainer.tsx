import React, {useEffect, useRef, useState} from 'react';
import {getData} from './fetchData';
import {DictionaryController} from "./DictionaryController";
import {Word} from './Word'
import {Cursor} from "./Cursor";


export default function TypingContainer() {
    const [dictionary  , setDictionary ] = useState([""]);
    const [position, setPosition] = useState(0);
    const wordCorrectness : React.MutableRefObject<any[]> = useRef([]);
    const [cursorPosition, setCursorPosition] = useState({top:0, left:0});
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
    }


    function handleCursorProps(data : {top: number, left: number}){
        setCursorPosition({top:data.top, left:data.left})
    }

    return (
        <section>
            <Cursor
                top={cursorPosition.top}
                left={cursorPosition.left}
            />
            <ul className="flex flex-wrap gap-4 text-gray-500 text-xl box-border max-w-screen-lg m-auto">
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
                        sendCursorPropsToParent={handleCursorProps}
                    />
                ))}
            </ul>
        </section>
    )
}