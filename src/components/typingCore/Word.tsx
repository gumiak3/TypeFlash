import {useEffect, useRef, useState} from "react";

interface wordProps{
    active : boolean
    id : number
    content : string
    sendDataToParent : (data : number) => void;
}

function isAlphabet(keyName : string){
    return keyName.match("[a-zA-Z]+")?.length && keyName.length === 1 ? true : false;
}

export function Word({active,id,content, sendDataToParent} : wordProps){
    const position = useRef(0);
    const [states, setStates] = useState(initPositionState(content))
    function initPositionState(word: string){
        return getLetters(word).map((letter, index) =>'');
    }
    function getLetters(word : string) : string[]{
        return word.split('');
    }
    function handleSetStates(index : number,state : string){
        const newArray = [...states];
        newArray[index] = state;
        setStates(newArray);
    }
    useEffect(()=>{
        if(!active){
            return;
        }
        function handleKeyPress(e : any){
            const letter = getLetters(content)[position.current];
            if(!active)
                return;
            if(e.key === 'Backspace' && position.current >= 0){
                handleSetStates(position.current - 1, '');
                position.current = position.current === 0 ? position.current : position.current - 1;
            }else if(e.key === ' ' && position.current < content.length){
                handleSetStates(position.current, 'incorrect');
                position.current++;
            } else if(position.current < content.length && isAlphabet(e.key)){
                handleSetStates(position.current, e.key === letter ? 'correct' : 'incorrect');
                position.current++;
            }
        }
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        }
    },[content, position, states])
    const letters = getLetters(content);
    if(active){
        return (
            <li key={id} className={`select-none active`}>{letters.map((letter, index) => (
                <span className={index <= position.current ? states[index] : '' } key={index}>{letter}</span>
            ))}</li>
        )
    }else{
        return (
            <li key={id} className={`select-none`}>{getLetters(content).map((letter, index) => (
                <span  key={index}>{letter}</span>
            ))}</li>
        )
    }

}