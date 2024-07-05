import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Letter } from "./Letter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
    setState,
    setStatesForWholeWord,
} from "../../store/wordsStates/wordsStatesSlice";
import { setCurrentWord, setPosition } from "../../store/cursor/cursorSlice";
import { letterPropsType } from "./TypingContainer";
import { send } from "process";

interface WordProps {
    content: string;
    wordId: number;
    sendLetterProps: (
        wordId: number,
        letterId: number,
        props: letterPropsType
    ) => void;
}
export function Word({ content, wordId, sendLetterProps }: WordProps) {
    const states = useSelector((state: RootState) => state.wordsStates.value);

    function getLetters(word: string): string[] {
        return word.split("");
    }

    return (
        <li key={wordId}>
            {getLetters(content).map((letter, index) => (
                <Letter
                    className={states.length > 0 ? states[wordId][index] : ""}
                    wordId={wordId}
                    key={index}
                    content={letter}
                    letterId={index}
                    sendLetterProps={sendLetterProps}
                />
            ))}
        </li>
    );
}
