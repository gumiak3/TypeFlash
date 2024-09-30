import { useEffect, useRef, useState } from 'react';
import { Word } from './Word';
import { Cursor } from './Cursor';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { remove, setValue } from '../../store/wordsStates/wordsStatesSlice';
import { TypingHandler } from './handlers/TypingHandler';
import { CursorHandler } from './handlers/CursorHandler';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

export interface WordElement {
  id: number;
  element: HTMLLIElement;
}
export type letterPropsType = {
  top: number;
  left: number;
  right: number;
};

const initLetterPropsState = {
  top: 0,
  left: 0,
  right: 0
};

interface ITypingContainer {
  start: () => void;
  dictionary: string[];
  isLoading: boolean;
  className?: string;
}

export default function TypingContainer({
  start,
  dictionary,
  isLoading,
  className = ''
}: ITypingContainer) {
  const letterProps = useRef<letterPropsType[][]>([]);
  // redux variables
  const cursor = useSelector((state: RootState) => state.cursor);
  const correctWordCounter = useSelector((state: RootState) => state.correctWordCounter.value);
  const letterStates = useSelector((state: RootState) => state.wordsStates.value);
  const dispatch = useDispatch();

  // cursor
  const cursorHandler = CursorHandler.getInstance(dispatch);
  const [updateCursorTrigger, setUpdateCursorTrigger] = useState(0);
  const [lineTopValue, setLineTopValue] = useState<number[]>([]);

  // game
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    dispatch(setValue(initWordStates()));
    cursorHandler.initPosition(letterProps.current);
    initLineTopValue();
    setMounted(true);
  }, [dictionary]);

  function initLineTopValue() {
    const lineTopValue = new Set<number>();
    letterProps.current.forEach((wordProps) => {
      if (wordProps.length > 0) {
        lineTopValue.add(wordProps[0].top);
      }
    });
    setLineTopValue(Array.from(lineTopValue));
  }

  function setLetterProps(wordId: number, letterId: number, props: letterPropsType) {
    if (!letterProps.current[wordId]) {
      letterProps.current[wordId] = new Array(dictionary[wordId].length);
    }
    letterProps.current[wordId][letterId] = props;
    setUpdateCursorTrigger((prev) => prev + 1);
  }

  useEffect(() => {
    const { wordId, letterId } = cursor.currentWord;
    if (!letterProps.current[wordId]) {
      return;
    }
    cursorHandler.updateCursor(
      wordId,
      letterId,
      {
        top: letterProps.current[wordId][letterId].top,
        left: cursor.position.getRightValue
          ? letterProps.current[wordId][letterId].right
          : letterProps.current[wordId][letterId].left,
        getRightValue: cursor.position.getRightValue
      },
      cursor.position
    );
  }, [updateCursorTrigger]);

  useEffect(() => {
    if (dictionary.length === 0 || !letterProps.current) return;

    const typingHandler = new TypingHandler(
      cursor,
      letterProps.current,
      dispatch,
      dictionary,
      letterStates,
      start,
      mounted,
      setMounted
    );

    // because the keyword "this" will be pointed to window instead of TypingHandler
    const boundHandleKeyPress = typingHandler.handleKeyPress.bind(typingHandler);
    window.addEventListener('keydown', boundHandleKeyPress);
    return () => {
      window.removeEventListener('keydown', boundHandleKeyPress);
    };
  }, [cursor, dictionary]);

  function lineBehaviour() {
    if (cursor.position.line === 2) {
      let removed = 0;
      // remove first line of words
      letterProps.current.forEach((word) => {
        if (word.length > 0) {
          if (word[0].top === lineTopValue[0]) {
            dictionary.shift();
            dispatch(remove(0));
            removed++;
          }
        }
      });
      cursorHandler.setCurrentWord(
        cursor.currentWord.wordId - removed,
        cursor.currentWord.letterId
      );
    }
  }
  useEffect(lineBehaviour, [cursor.position.line]);

  useEffect(() => {}, [dictionary]);
  function getLetters(word: string): string[] {
    return word.split('');
  }
  function initWordStates(): string[][] {
    const states: string[][] = [];
    dictionary.forEach((word) => {
      states.push(getLetters(word).map((index) => ''));
    });
    return states;
  }
  function isShowed(wordId: number) {
    if (letterProps.current.length === 0) return true;
    if (letterProps.current[wordId].length > 0) {
      if (letterProps.current[wordId][0].top > lineTopValue[4]) {
        return false;
      }
    }
    return true;
  }
  return (
    <section className={`text-3xl box-border m-auto h-[204px] overflow-hidden ${className}`}>
      {dictionary.length > 0 && !isLoading && <Cursor />}
      {dictionary.length === 0 || isLoading ? (
        <div className="flex justify-center align-middle h-full">
          <CircularProgress className={'m-auto'} color={'inherit'} />
        </div>
      ) : (
        <ul className="typing-container flex flex-wrap gap-4 box-border">
          {dictionary.map(
            (word, index) =>
              isShowed(index) && (
                <Word
                  key={index + dictionary.length}
                  wordId={index}
                  content={word}
                  sendLetterProps={setLetterProps}
                />
              )
          )}
        </ul>
      )}
    </section>
  );
}
