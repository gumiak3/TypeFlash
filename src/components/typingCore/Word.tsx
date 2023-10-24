import {useEffect, useState} from "react";

interface wordProps{
    active : boolean
    id : number
    content : string
    sendDataToParent : (data : number) => void;
}
export function Word({active,id,content, sendDataToParent} : wordProps){
    const [position, setPosition] = useState(0);
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
            const letter = getLetters(content)[position];
            if(e.key === 'Backspace' && position >=0 ){
                setPosition((prevPosition) => prevPosition - 1);
            }else if(active && position < content.length && e.key !== 'Backspace'){
                handleSetStates(position, letter === e.key ? 'correct' : 'incorrect');
                setPosition((prevPosition) => prevPosition + 1);
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
                <span className={index <= position ? states[index] : '' } key={index}>{letter}</span>
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