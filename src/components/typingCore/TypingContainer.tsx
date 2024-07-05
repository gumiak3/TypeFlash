import React, { useEffect, useRef, useState } from "react";
import { Word } from "./Word";
import { Cursor } from "./Cursor";
import useDictionary from "../../hooks/useDictionary";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
    remove,
    setState,
    setValue,
} from "../../store/wordsStates/wordsStatesSlice";
import { setCurrentWord, setPosition } from "../../store/cursor/cursorSlice";

const URL = "https://random-word-api.herokuapp.com/all";

export interface WordElement {
    id: number;
    element: HTMLLIElement;
}

function isAlphabet(keyName: string) {
    return !!(keyName.match("[a-zA-Z]+")?.length && keyName.length === 1);
}
export type letterPropsType = {
    top: number;
    left: number;
    right: number;
};

export default function TypingContainer() {
    const [dictionary] = useDictionary(URL);
    const letterProps = useRef<letterPropsType[][]>([]);
    //redux variables
    // const states = useSelector((state: RootState) => state.wordsStates.value);
    const cursor = useSelector((state: RootState) => state.cursor);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setValue(initWordStates()));
        initCursorPosition();
    }, [dictionary]);

    function initCursorPosition() {
        if (!letterProps.current[0]) return;
        updateCursorPosition(0, 0, {
            top: letterProps.current[0][0].top,
            left: letterProps.current[0][0].left,
        });
    }

    function handleJumpToNextLetter() {
        dispatch(
            setCurrentWord({
                wordId: cursor.currentWord.wordId + 1,
                letterId: 0,
            })
        );
        const newCursorPosition = {
            top: letterProps.current[cursor.currentWord.wordId + 1][0].top,
            left: letterProps.current[cursor.currentWord.wordId + 1][0].left,
        };
        dispatch(setPosition(newCursorPosition));
    }
    function setLetterProps(
        wordId: number,
        letterId: number,
        props: letterPropsType
    ) {
        if (!letterProps.current[wordId]) {
            letterProps.current[wordId] = new Array(dictionary[wordId].length);
        }
        letterProps.current[wordId][letterId] = props;
    }
    function updateCursorPosition(
        wordId: number,
        letterId: number,
        newCursorPosition: { top: number; left: number }
    ) {
        dispatch(
            setCurrentWord({
                wordId: wordId,
                letterId: letterId,
            })
        );
        dispatch(setPosition(newCursorPosition));
    }
    useEffect(() => {
        if (dictionary.length === 0 || !letterProps.current) return;

        const { wordId } = cursor.currentWord;
        const currentWord = dictionary[wordId];
        const letters: string[] = getLetters(currentWord);
        function handleKeyPress(e: any) {
            const currentLetter = cursor.currentWord.letterId;
            // to change!
            if (
                isAlphabet(e.key) &&
                cursor.position.left ===
                    letterProps.current[wordId][cursor.currentWord.letterId]
                        .right
            )
                return;
            if (
                e.key === " " &&
                cursor.position.left ===
                    letterProps.current[wordId][cursor.currentWord.letterId]
                        .right
            ) {
                handleJumpToNextLetter();
                return;
            }
            if (isAlphabet(e.key) && currentLetter < currentWord.length) {
                dispatch(
                    setState({
                        wordId: wordId,
                        letterId: currentLetter,
                        newState:
                            letters[currentLetter] === e.key
                                ? "correct"
                                : "incorrect",
                    })
                );
                // set cursor's position to next letter
                if (currentLetter + 1 === currentWord.length) {
                    // get right position of the letter instead of left position, because this letter is last
                    const newCursorPosition = {
                        top: letterProps.current[wordId][currentLetter].top,
                        left: letterProps.current[wordId][currentLetter].right,
                    };
                    updateCursorPosition(
                        wordId,
                        currentLetter,
                        newCursorPosition
                    );
                    return;
                }
                const newCursorPosition = {
                    top: letterProps.current[wordId][currentLetter + 1].top,
                    left: letterProps.current[wordId][currentLetter + 1].left,
                };
                updateCursorPosition(
                    wordId,
                    currentLetter + 1,
                    newCursorPosition
                );
            }
        }
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [cursor, dictionary]);
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

    return (
        <section>
            {dictionary.length > 0 && <Cursor />}
            <ul className="typing-container flex flex-wrap gap-4 text-gray-500 text-3xl box-border max-w-screen-lg m-auto ">
                {dictionary.map((word, index) => (
                    <Word
                        key={index}
                        wordId={index}
                        content={word}
                        sendLetterProps={setLetterProps}
                    />
                ))}
            </ul>
        </section>
    );
}
