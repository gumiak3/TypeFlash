import React, {Component, useEffect, useRef, useState} from 'react';
import {getData} from './fetchData';
import {DictionaryController} from "./DictionaryController";
import {Word} from './Word'
import {Cursor} from "./Cursor";

export interface WordElement{
    id:number,
    element: HTMLLIElement
}

export default function TypingContainer() {
    const [dictionary  , setDictionary ] = useState([""]);
    const [position, setPosition] = useState(0);
    const wordCorrectness : React.MutableRefObject<any[]> = useRef([]);
    const [cursorPosition, setCursorPosition] = useState({top:0, left:0});
    const [letterPosition, setLetterPosition] = useState(0);
    const [wordElements, setWordElements] = useState<WordElement[]>([]);
    const [wordElementsPosition, setWordElementsPosition] = useState<number[]>([]);
    const topPositionDiff = useRef(88)
    useEffect(() => {
        fetchData();
        const newElements: number[] = [];
        wordElements.forEach((elem) =>{
            const position = elem.element.getBoundingClientRect().top;
            newElements.push(position);
        });
        setWordElementsPosition(newElements);
    }, [wordElements]);
    async function fetchData(){
        try{
            const data = await getData();
            const filteredData : string[] = DictionaryController.getInstance().filter(data);
            const randomWords : string[] = DictionaryController.getInstance().generateRandomWords(filteredData , 100);
            setDictionary(randomWords);
            wordCorrectness.current = randomWords.map(word => '');
        }catch(err){
            console.error(err);
        }
    }

    function handleDataFromChild(wordId : number, isNext: boolean){
        setPosition(wordId);
        setLetterPosition(isNext ? 0 : dictionary[wordId].length);
    }
    function handleCorrectness(data : boolean){
        wordCorrectness.current[position] = data;
    }

    function handleCursorProps(data : {top: number, left: number}){
        setCursorPosition({top:data.top, left:data.left})
    }
    function showWord(index: number): boolean{
        if(wordElementsPosition[index] && wordElementsPosition[position]){
            return wordElementsPosition[index] >= wordElementsPosition[position];
        }
        return true;
    }
    function handleWordRef(element : WordElement){
        const duplicates = wordElements.some((e) => e.id === element.id);
        if(!duplicates){
            setWordElements((prevElements) => [...prevElements, element]);
        }
    }

    return (
        <section>
            <Cursor
                top={cursorPosition.top}
                left={cursorPosition.left}
            />
            <ul className="typing-container flex flex-wrap gap-4 text-gray-500 text-xl box-border max-w-screen-lg m-auto max-h-40 overflow-hidden">
                {dictionary.map((word,index) => (
                showWord(index) &&
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
                        currentPosition={letterPosition}
                        sendWordRef={handleWordRef}
                    />
                ))}
            </ul>
        </section>
    )
}