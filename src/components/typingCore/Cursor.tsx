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
    useEffect(()=>{
        if(cursorRef.current){
            cursorRef.current.style.top = `${top}px`;
            cursorRef.current.style.left = `${left}px`;
        }
    },[top,left]);
    return (
        <div ref={cursorRef} style={cursorStyle} className={"letter-cursor-typing bg-white w-px h-7 absolute"}></div>
    )
}