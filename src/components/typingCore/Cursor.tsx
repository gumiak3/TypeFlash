import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const cursorStyle = {
    left: 0,
    top: 0,
};

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
            style={cursorStyle}
            className={`letter-cursor-${typing} bg-white w-px h-11 absolute`}
        ></div>
    );
}
