import {ButtonProps} from "../types/common";

export function Button({text, type, handleClick} : ButtonProps){
    return (
        <button type={type} onClick={handleClick}>
            {text}
        </button>
    )
}