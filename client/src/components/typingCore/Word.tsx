import { Letter } from "./Letter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { letterPropsType } from "./TypingContainer";

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
                    key={index + states.length}
                    content={letter}
                    letterId={index}
                    sendLetterProps={sendLetterProps}
                />
            ))}
        </li>
    );
}
