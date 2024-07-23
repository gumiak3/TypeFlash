import { Dispatch } from "redux";
import { Cursor } from "../../../store/cursor/cursorSlice";
import { letterPropsType } from "../TypingContainer";
import {
    setState,
    setStatesForWholeWord,
} from "../../../store/wordsStates/wordsStatesSlice";
import { CursorHandler } from "./CursorHandler";
import { incrementCorrectWordCounter } from "../../../store/correctWordCounter/correctWordCounterSlice";

export class TypingHandler {
    public cursor: Cursor;
    private letterProps: letterPropsType[][];
    private dispatch: Dispatch;
    private dictionary: string[];
    private letterStates: string[][];
    private cursorHandler: CursorHandler;
    constructor(
        cursor: Cursor,
        letterProps: letterPropsType[][],
        dispatch: Dispatch,
        dictionary: string[],
        letterStates: string[][]
    ) {
        this.cursor = cursor;
        this.letterProps = letterProps;
        this.dispatch = dispatch;
        this.dictionary = dictionary;
        this.letterStates = letterStates;
        this.initCursorHandler();
    }

    private initCursorHandler() {
        this.cursorHandler = CursorHandler.getInstance(this.dispatch);
    }
    private isAlphabet(key: string) {
        return !!(key.match("[a-zA-Z]+")?.length && key.length === 1);
    }
    private getLetters(word: string): string[] {
        return word.split("");
    }
    private clearLetterState(wordId: number, letterId: number) {
        this.dispatch(
            setState({ wordId: wordId, letterId: letterId, newState: "" })
        );
    }
    private isWordCorrect(wordId: number) {
        for (let i = 0; i < this.letterStates[wordId].length; i++) {
            if (this.letterStates[wordId][i] !== "correct") {
                return false;
            }
        }

        return true;
    }
    private handleBackspace(): void {
        const { letterId, wordId } = this.cursor.currentWord;

        if (letterId === 0 && wordId - 1 >= 0) {
            if (this.isWordCorrect(wordId - 1)) {
                return;
            }
            this.clearLetterState(wordId, letterId);
            const newCursorPosition = {
                top: this.letterProps[wordId - 1][
                    this.dictionary[wordId - 1].length - 1
                ].top,
                left: this.letterProps[wordId - 1][
                    this.dictionary[wordId - 1].length - 1
                ].right,
                getRightValue: true,
            };
            this.cursorHandler.updateCursor(
                wordId - 1,
                this.dictionary[wordId - 1].length - 1,
                newCursorPosition,
                this.cursor.position
            );
        } else if (
            letterId === this.dictionary[wordId].length - 1 &&
            this.cursor.position.left ===
                this.letterProps[wordId][letterId].right
        ) {
            this.clearLetterState(wordId, letterId);
            const newCursorPosition = {
                top: this.letterProps[wordId][letterId].top,
                left: this.letterProps[wordId][letterId].left,
                getRightValue: false,
            };
            this.cursorHandler.setPosition(newCursorPosition);
        } else if (letterId > 0) {
            this.clearLetterState(wordId, letterId - 1);
            const newCursorPosition = {
                top: this.letterProps[wordId][letterId - 1].top,
                left: this.letterProps[wordId][letterId - 1].left,
                getRightValue: false,
            };
            this.cursorHandler.updateCursor(
                wordId,
                letterId - 1,
                newCursorPosition,
                this.cursor.position
            );
        }
    }
    private handleJumpToNextWord() {
        const { wordId } = this.cursor.currentWord;
        const newCursorPosition = {
            top: this.letterProps[this.cursor.currentWord.wordId + 1][0].top,
            left: this.letterProps[this.cursor.currentWord.wordId + 1][0].left,
            getRightValue: false,
        };
        this.cursorHandler.updateCursor(
            wordId + 1,
            0,
            newCursorPosition,
            this.cursor.position
        );
        if (this.isWordCorrect(wordId)) {
            this.dispatch(incrementCorrectWordCounter());
        }
    }
    private skipWord(wordId: number) {
        // space
        this.dispatch(
            setStatesForWholeWord({
                wordId: wordId,
                startRange: 0,
                newState: "incorrect",
            })
        );
        const newCursorPosition = {
            top: this.letterProps[wordId + 1][0].top,
            left: this.letterProps[wordId + 1][0].left,
            getRightValue: false,
        };
        this.cursorHandler.updateCursor(
            wordId + 1,
            0,
            newCursorPosition,
            this.cursor.position
        );
    }

    public handleKeyPress(e: any) {
        const currentLetter = this.cursor.currentWord.letterId;
        const { wordId, letterId } = this.cursor.currentWord;
        const currentWord = this.dictionary[wordId];
        const letters: string[] = this.getLetters(currentWord);
        if (e.key === "Backspace") {
            this.handleBackspace();
            return;
        }
        if (e.key === " " && !this.cursor.position.getRightValue) {
            this.skipWord(wordId);
            return;
        }
        if (
            this.isAlphabet(e.key) &&
            this.cursor.position.left ===
                this.letterProps[wordId][letterId].right
        )
            return;
        if (e.key === " " && this.cursor.position.getRightValue) {
            this.handleJumpToNextWord();
            return;
        }
        if (this.isAlphabet(e.key) && currentLetter < currentWord.length) {
            this.dispatch(
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
                    top: this.letterProps[wordId][currentLetter].top,
                    left: this.letterProps[wordId][currentLetter].right,
                    getRightValue: true,
                };
                this.cursorHandler.updateCursor(
                    wordId,
                    currentLetter,
                    newCursorPosition,
                    this.cursor.position
                );
                return;
            }
            const newCursorPosition = {
                top: this.letterProps[wordId][currentLetter + 1].top,
                left: this.letterProps[wordId][currentLetter + 1].left,
                getRightValue: false,
            };
            this.cursorHandler.updateCursor(
                wordId,
                currentLetter + 1,
                newCursorPosition,
                this.cursor.position
            );
        }
    }
}
