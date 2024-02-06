import React, {useEffect, useRef, useState} from "react";
import {Letter} from "./Letter";

interface wordProps{
    active : boolean
    id : number
    content : string
    activePosition : number
    previousCorrectness : boolean
    sendDataToParent : (wordId : number, isNext: boolean) => void
    sendCorrectnessToParent : (data : boolean) => void
    sendCursorPropsToParent: (data: {top: number, left : number}) => void
    currentPosition:number
}

function isAlphabet(keyName : string){
    return !!(keyName.match("[a-zA-Z]+")?.length && keyName.length === 1);
}

interface letterProps{
    left : number,
    right: number,
    top: number,
    id:number,
    letter: string
}

export function Word({active,id,content, activePosition, previousCorrectness, sendDataToParent, sendCorrectnessToParent, sendCursorPropsToParent, currentPosition} : wordProps){
    const position = useRef(currentPosition);
    const [states, setStates] = useState(initPositionState(content));;
    const cursorProps = useRef({top:0,left:0,right:0});
    const [letterProps, setLetterProps] = useState<letterProps[]>([]);
    function initPositionState(word: string){
        return getLetters(word).map((index) =>'');
    }
    function getLetters(word : string) : string[]{
        return word.split('');
    }
    abstract class stateHandler{

        public static handleSetStates(index : number,state : string) : void{
            const newArray = [...states];
            newArray[index] = state;
            setStates(newArray);
        }
        public static handleStatesOnSkip(){
            const newArray = [...states];
            for(let i = position.current ; i < letters.length; i++){
                newArray[i] = 'incorrect';
            }
            position.current = letters.length;
            setStates(newArray);
        }
    }
    function setClassNameForActiveWord(index: number){
        return index < position.current ? states[index] : "";
    }
    function setClassNameForActiveLetter(index : number) : string{
        return index === position.current ? "letter-cursor" : "";
    }

    function validCorrectness() : boolean{
        stateHandler.handleStatesOnSkip()
        return states.filter(state => state === 'correct').length === letters.length;
    }
    function handleSkippingToNextWord(space : boolean){
        if(!space)
            return;
        sendCorrectnessToParent(validCorrectness());
        sendDataToParent(id + 1, true);
    }
    function handlePropsFromCurrentLetter(newProps : letterProps){
        cursorProps.current = {top:newProps.top, left:newProps.left, right:newProps.right};
        sendCursorPropsToParent({top: newProps.top, left: newProps.left});
    }
    function sendCursorPropsToParentWhenLast(){
        if(position.current === content.length)
            sendCursorPropsToParent({top:cursorProps.current.top, left:cursorProps.current.right});
    }

    function handlePropsFromLetter(newProps: letterProps){

        const duplicates = letterProps.some((props) => props.id === newProps.id);
        if(!duplicates){
            setLetterProps((letterProps) => [...letterProps, newProps]);
        }
    }
    function updateCursor(id:number){
        cursorProps.current = {top:letterProps[id]?.top, left: letterProps[id]?.left, right: letterProps[id]?.right};
        sendCursorPropsToParent({top: cursorProps.current.top, left: cursorProps.current.right});
    }
    function handleBackToPreviousWord(backspace : boolean){
        if(!backspace)
            return;
        if(id === 0)
            return;
        if(position.current !== 0)
            return;
        if(!previousCorrectness){
            sendDataToParent(id - 1, false);
        }
    }

    useEffect(()=>{
        if(!active) {
            return;
        }
        if(position.current === content.length){
            updateCursor(position.current - 1);
        }
        function handleKeyPress(e : any){
            const letter = getLetters(content)[position.current];
            if(!active){
                return;
            }
            if(e.key === 'Backspace' && position.current >= 0){
                stateHandler.handleSetStates(position.current - 1, '');
                position.current = position.current === 0 ? position.current : position.current - 1;
            } else if(position.current < content.length && isAlphabet(e.key)){
                stateHandler.handleSetStates(position.current, e.key === letter ? 'correct' : 'incorrect');
                position.current++;
            }
            sendCursorPropsToParentWhenLast();
            handleSkippingToNextWord(e.key === ' ');
            handleBackToPreviousWord(e.key === 'Backspace');
        }
        function handleResize(){
            console.log('halo kursor');
            cursorProps.current = {top:letterProps[id]?.top, left: letterProps[id]?.left, right: letterProps[id]?.right};
            sendCursorPropsToParent({top: cursorProps.current.top, left: cursorProps.current.left});
        }
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('resize', handleResize);
        }
    },[content, position, states, active, letterProps])
    const letters = getLetters(content);
    if(active || id < activePosition){
        return (
            <li key={id} className={`select-none tracking-wide active `}>{letters.map((letter, index) => (
                <Letter
                    active={index === position.current}
                    sendDataToParent={handlePropsFromCurrentLetter}
                    content={letter}
                    key={index}
                    className={setClassNameForActiveWord(index)+ ` ` + setClassNameForActiveLetter(index)}
                    id={index}
                    sendPropsToParent={handlePropsFromLetter}
                    activeWord={active}
                />
            ))}</li>
        )
    }else{
        return (
            <li key={id} className={`select-none tracking-wide `}>{getLetters(content).map((letter, index) => (
                <Letter
                    active={false}
                    sendDataToParent={handlePropsFromCurrentLetter}
                    content={letter}
                    key={index}
                    className={""}
                    id={index}
                    sendPropsToParent={handlePropsFromLetter}
                    activeWord={false}
                />
            ))}</li>
        )
    }

}