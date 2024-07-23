import { forwardRef, useEffect, useRef, useState } from "react";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentWord, setPosition } from "../../store/cursor/cursorSlice";
import { letterPropsType } from "./TypingContainer";

interface LetterProps {
    wordId: number;
    content: string;
    letterId: number;
    className: string;
    sendLetterProps: (
        wordId: number,
        letterId: number,
        props: letterPropsType
    ) => void;
}
export function Letter({
    wordId,
    content,
    letterId,
    className,
    sendLetterProps,
}: LetterProps) {
    const cursor = useSelector((state: RootState) => state.cursor.currentWord);
    const dispatch = useDispatch();
    const letterRef = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        if (letterRef.current) {
            const left = Math.floor(
                letterRef.current.getBoundingClientRect().left
            );
            const top = Math.floor(
                letterRef.current.getBoundingClientRect().top
            );
            const right = Math.floor(
                letterRef.current.getBoundingClientRect().right
            );
            sendLetterProps(wordId, letterId, {
                top: top,
                left: left,
                right: right,
            });
        }
        let resizeTimeout: NodeJS.Timeout;
        function handleResize() {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = setTimeout(() => {
                if (letterRef.current) {
                    const left = Math.floor(
                        letterRef.current.getBoundingClientRect().left
                    );
                    const top = Math.floor(
                        letterRef.current.getBoundingClientRect().top
                    );
                    const right = Math.floor(
                        letterRef.current.getBoundingClientRect().right
                    );
                    sendLetterProps(wordId, letterId, {
                        top: top,
                        left: left,
                        right: right,
                    });
                }
            }, 1000);
        }
        window.addEventListener("resize", handleResize);
        return () => {
            window.addEventListener("resize", handleResize);
        };
    }, []);
    // useEffect(() => {
    //     if (letterRef.current) {
    //         const left = Math.floor(
    //             letterRef.current.getBoundingClientRect().left
    //         );
    // const top = Math.floor(
    //     letterRef.current.getBoundingClientRect().top
    // );
    //         const right = Math.floor(
    //             letterRef.current.getBoundingClientRect().right
    //         );
    //         if (wordId === cursor.wordId && letterId === cursor.letterId) {
    //             if (cursor.getRightValue) {
    //                 dispatch(setPosition({ top: top, left: right }));
    //             } else {
    //                 dispatch(setPosition({ top: top, left: left }));
    //             }
    //         }
    //     }

    // window.addEventListener("resize", handleResize);
    // return () => {
    //     window.addEventListener("resize", handleResize);
    // };
    // }, []);

    return (
        <span className={`letter ${className}`} ref={letterRef}>
            {content}
        </span>
    );
}
