import {useEffect, useRef, useState} from "react";

interface letterPropsToSend{
    id : number,
    left: number,
    right: number,
    top: number,
    letter : string
}
interface letterProps{
    content : string,
    key:number,
    className: string,
    sendDataToParent: (props: letterPropsToSend) => void,
    active: boolean,
    id:number,
    sendPropsToParent: (props: letterPropsToSend) => void
    activeWord:boolean,

}
export function Letter({id, content, className, sendDataToParent, active,sendPropsToParent, activeWord} : letterProps){
    const letterRef = useRef<HTMLSpanElement>(null);
    useEffect(() =>{

        if(letterRef.current){
            const left = Math.floor(letterRef.current.getBoundingClientRect().left);
            const top = Math.floor(letterRef.current.getBoundingClientRect().top);
            const right = Math.floor(letterRef.current.getBoundingClientRect().right);
            if(active){
                sendDataToParent({id: id, left: left, right: right, top: top, letter :content});
            }
            if(activeWord){
                sendPropsToParent({id: id, left: left, right: right, top: top, letter :content});
            }

        }
        function handleResize(){
            if(letterRef.current){
                const left = Math.floor(letterRef.current.getBoundingClientRect().left);
                const top = Math.floor(letterRef.current.getBoundingClientRect().top);
                const right = Math.floor(letterRef.current.getBoundingClientRect().right);
                if(active){
                    sendDataToParent({id: id, left: left, right: right, top: top, letter :content});
                }

            }
        }

        window.addEventListener('resize', handleResize);
        return () =>{
            window.addEventListener('resize', handleResize);
        }
    }, [active, activeWord])

    return(
        <span ref={letterRef} className={className}>{content}</span>
    )
}