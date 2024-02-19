import {ListItemProps} from "../../types/common";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import SneakPeek from "./SneakPeek";

export default function ListItem({content, href, iconContent} : ListItemProps){
    const [isHovering, setIsHovering] = useState(false);
    function handleMouseOver(){
        setIsHovering(true);
    }
    function handleMouseOut(){
        setIsHovering(false);
    }
    return (
        <li className="list relative h-full flex items-center justify-center text-gray-500 hover:text-white transtion duration-1000" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <a href={href} className="px-6 py-2">{
                iconContent ?  <FontAwesomeIcon icon={iconContent}/> : content
            }</a>
            {isHovering ? <SneakPeek>{content}</SneakPeek> : ''}
        </li>
    )
}