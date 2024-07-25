import { Dispatch } from "redux";
import {
    Cursor,
    nextLine,
    previousLine,
    setCurrentWord,
    setLine,
    setPosition,
} from "../../../store/cursor/cursorSlice";
import { letterPropsType } from "../TypingContainer";

type Position = {
    top: number;
    left: number;
    getRightValue: boolean;
};

export class CursorHandler {
    private dispatch: Dispatch;
    private static instance: CursorHandler;
    constructor(dispatch: Dispatch) {
        this.dispatch = dispatch;
    }
    public static getInstance(dispatch: Dispatch) {
        if (!this.instance) {
            this.instance = new CursorHandler(dispatch);
        }
        return this.instance;
    }
    public setPosition(newPosition: Position) {
        this.dispatch(setPosition(newPosition));
    }
    public setCurrentWord(wordId: number, letterId: number) {
        this.dispatch(setCurrentWord({ wordId: wordId, letterId: letterId }));
    }
    public updateCursor(
        wordId: number,
        letterId: number,
        newPosition: Position,
        prevPosition: Position
    ) {
        this.setCurrentWord(wordId, letterId);
        if (newPosition.top > prevPosition.top) {
            this.dispatch(nextLine());
        } else if (newPosition.top < prevPosition.top) {
            this.dispatch(previousLine());
        }
        this.setPosition(newPosition);
    }
    public initPosition(letterProps: letterPropsType[][]) {
        if (!letterProps[0]) return;

        this.setCurrentWord(0, 0);
        this.setPosition({
            top: letterProps[0][0].top,
            left: letterProps[0][0].left,
            getRightValue: false,
        });
        this.dispatch(setLine(0));
    }
}
