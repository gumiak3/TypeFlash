import {useEffect, useRef, useState} from "react";

interface letterPropsToSend{
    left: number,
    right: number,
    top: number
}
interface letterProps{
    content : string,
    key:number,
    className: string,
    sendDataToParent: (props: letterPropsToSend) => void,
    active: boolean,
}
export function Letter({content, className, sendDataToParent, active} : letterProps){
    const letterRef = useRef<HTMLSpanElement>(null);
    useEffect(() =>{
        if(letterRef.current){
            const left = Math.floor(letterRef.current.getBoundingClientRect().left);
            const top = Math.floor(letterRef.current.getBoundingClientRect().top);
            const right = Math.floor(letterRef.current.getBoundingClientRect().right);
            if(active){
                sendDataToParent({left: left, right: right, top: top});
            }
        }
    }, [active])

    return(
        <span ref={letterRef} className={className}>{content}</span>
    )
}