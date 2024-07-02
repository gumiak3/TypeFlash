import React, { useEffect, useRef, useState } from "react";
import { Word } from "./Word";
import { Cursor } from "./Cursor";
import useDictionary from "../../hooks/useDictionary";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setState, setValue } from "../../store/wordsStates/wordsStatesSlice";

const URL = "https://random-word-api.herokuapp.com/all";

export interface WordElement {
    id: number;
    element: HTMLLIElement;
}

interface cursorProps {
    top: number;
    left: number;
}

type rootState = string[][];

export default function TypingContainer() {
    const [dictionary] = useDictionary(URL);
    const [position, setPosition] = useState(0);
    const wordCorrectness: React.MutableRefObject<any[]> = useRef([]);
    const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
    const [letterPosition, setLetterPosition] = useState(0);
    const [wordElements, setWordElements] = useState<WordElement[]>([]);
    const [wordElementsPosition, setWordElementsPosition] = useState<number[]>(
        []
    ); // style.top value
    const lineTopValues = useRef<number[]>([]);
    const linePosition = useRef<number>(0);
    const removed = useRef<number>(0);

    //redux variables
    const states = useSelector((state: RootState) => state.wordsStates);
    const dispatch = useDispatch();
    useEffect(() => {
        setLineTopValues();
        dispatch(setValue(initWordStates()));
    }, [wordElements]);

    function getLetters(word: string): string[] {
        return word.split("");
    }
    function initWordStates(): string[][] {
        const states: string[][] = [];
        dictionary.forEach((word) => {
            states.push(getLetters(word).map((index) => ""));
        });
        return states;
    }
    function setLineTopValues() {
        const topValues: number[] = [];
        wordElements.forEach((elem) => {
            const position = elem.element.getBoundingClientRect().top;
            topValues.push(position);
        });
        const noDuplicates = new Set([...topValues]);
        lineTopValues.current = Array.from(noDuplicates);
        setWordElementsPosition(topValues);
    }
    function handleDataFromChild(wordId: number, isNext: boolean) {
        setPosition(wordId);
        setLetterPosition(isNext ? 0 : dictionary[wordId].length);
    }
    function handleCorrectness(data: boolean) {
        wordCorrectness.current[position] = data;
    }
    function handleCursorProps(data: cursorProps) {
        nextLineDectection(data);
        setCursorPosition({ top: data.top, left: data.left });
    }
    function nextLineBehaviour() {
        // current line === 2 then remove first line of words
        if (linePosition.current === 3) {
            wordElementsPosition.forEach((wordTopValue, index) => {
                if (
                    wordTopValue <
                    lineTopValues.current[linePosition.current - 2]
                ) {
                    // console.log(`word: ${dictionary[index]}, top value: ${wordTopValue}`);
                    removed.current++;
                }
            });
            // after removing all words from first line we need to set cursor position to the start of 2 row
            // wordCorrectness needs to be restarted so that second row will be fresh
            setPosition(position - removed.current);

            console.log(`letter position: ${letterPosition}`);
            console.log(`cursor position: ${cursorPosition}`);
            console.log(`position: ${position}`);
        }
    }
    function nextLineDectection(nextPosition: cursorProps) {
        // detects nextLine when cursorPosition has increased
        if (nextPosition.top === undefined || cursorPosition.top === undefined)
            return;
        if (nextPosition.top > cursorPosition.top) {
            linePosition.current++;
            nextLineBehaviour();
        }
    }

    function handleWordRef(element: WordElement) {
        const duplicates = wordElements.some((e) => e.id === element.id);
        if (!duplicates) {
            setWordElements((prevElements) => [...prevElements, element]);
        }
    }
    return (
        <section>
            <Cursor top={cursorPosition.top} left={cursorPosition.left} />
            <ul className="typing-container flex flex-wrap gap-4 text-gray-500 text-3xl box-border max-w-screen-lg m-auto ">
                {dictionary.map(
                    (word, index) =>
                        removed.current <= index && (
                            <Word
                                active={position === index}
                                key={index}
                                id={index}
                                content={word}
                                activePosition={position}
                                previousCorrectness={
                                    position > 0
                                        ? wordCorrectness.current[position - 1]
                                        : false
                                }
                                sendDataToParent={handleDataFromChild}
                                sendCorrectnessToParent={handleCorrectness}
                                sendCursorPropsToParent={handleCursorProps}
                                currentPosition={letterPosition}
                                sendWordRef={handleWordRef}
                            />
                        )
                )}
            </ul>
        </section>
    );
}
