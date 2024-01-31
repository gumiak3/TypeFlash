import React, {useEffect, useRef, useState} from "react";
import {Letter} from "./Letter";

interface wordProps{
    active : boolean
    id : number
    content : string
    activePosition : number
    previousCorrectness : boolean
    sendDataToParent : (data : number) => void
    sendCorrectnessToParent : (data : boolean) => void
    sendCursorPropsToParent: (data: {top: number, left : number}) => void
}

function isAlphabet(keyName : string){
    return !!(keyName.match("[a-zA-Z]+")?.length && keyName.length === 1);
}

interface letterProps{
    left : number,
    right: number,
    top: number,

}

export function Word({active,id,content, activePosition, previousCorrectness, sendDataToParent, sendCorrectnessToParent, sendCursorPropsToParent} : wordProps){
    const position = useRef(0);
    const [states, setStates] = useState(initPositionState(content));;
    const cursorProps = useRef({top:0,left:0,right:0});
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
        sendDataToParent(id + 1);
    }
    function handlePropsFromCurrentLetter(props : letterProps){
        cursorProps.current = {top:props.top, left:props.left, right:props.right};
        sendCursorPropsToParent({top: props.top, left: props.left});
    }
    function sendCursorPropsToParentWhenLast(){
        if(position.current === content.length)
            sendCursorPropsToParent({top:cursorProps.current.top, left:cursorProps.current.right});
    }

    function handleBackToPreviousWord(backspace : boolean){
        if(!backspace)
            return;
        if(id === 0)
            return;
        if(position.current !== 0)
            return;
        if(!previousCorrectness){
            sendDataToParent(id - 1);
        }
    }

    useEffect(()=>{
        if(!active) {
            return;
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
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        }
    },[content, position, states, active])
    const letters = getLetters(content);
    if(active || id < activePosition){
        return (
            <li key={id} className={`select-none tracking-wide active `}>{letters.map((letter, index) => (
                <Letter
                    active={index === position.current}
                    sendDataToParent={handlePropsFromCurrentLetter}
                    content={letter}
                    key={index}
                    className={setClassNameForActiveWord(index)+ " " + setClassNameForActiveLetter(index)}
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
                />
            ))}</li>
        )
    }

}