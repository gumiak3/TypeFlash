import {useEffect, useRef, useState} from 'react';

const cursorStyle = {
    left: 0,
    top:0,
}
interface cursorProps{
    left: number;
    top: number;
}
export function Cursor({top, left}: cursorProps){
    const [position, setPosition] = useState(cursorStyle);
    const cursorRef = useRef<HTMLDivElement>(null);
    const [typing, setTyping] = useState('not-typing');
    useEffect(()=>{
        let timeoutId : NodeJS.Timeout;
        if(cursorRef.current){
            cursorRef.current.style.top = `${top}px`;
            cursorRef.current.style.left = `${left}px`;
        }
        function handleKeyDown(){
            if(typing !== 'typing'){
                setTyping('typing');
                if(timeoutId){
                    clearTimeout(timeoutId)
                }
            }

        }
        function handleKeyUp(){
            timeoutId = setTimeout(()=>{
                setTyping('not-typing');
            }, 1000);
        }
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return ()=>{
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            clearTimeout(timeoutId);
        }
    },[top,left, typing]);
    return (
        <div ref={cursorRef} style={cursorStyle} className={`letter-cursor-${typing} bg-white w-px h-7 absolute`}></div>
    )
}