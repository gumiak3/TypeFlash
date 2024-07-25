import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export function Cursor() {
    const props = useSelector((state: RootState) => state.cursor);
    const cursorRef = useRef<HTMLDivElement>(null);
    const [typing, setTyping] = useState("not-typing");
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (cursorRef.current) {
            cursorRef.current.style.top = `${props.position.top}px`;
            cursorRef.current.style.left = `${props.position.left}px`;
        }
        function handleKeyDown() {
            if (typing !== "typing") {
                setTyping("typing");
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
            }
        }
        function handleKeyUp() {
            timeoutId = setTimeout(() => {
                setTyping("not-typing");
            }, 1000);
        }
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            clearTimeout(timeoutId);
        };
    }, [props.position, typing]);
    return (
        <div
            ref={cursorRef}
            className={`letter-cursor-${typing} bg-white w-px h-11 absolute`}
        ></div>
    );
}
