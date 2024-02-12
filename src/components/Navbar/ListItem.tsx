import {ListItemProps} from "../../types/common";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function ListItem({content, href, iconContent} : ListItemProps){
    return (
        <li>
            <a href={href}>{
                iconContent ?  <FontAwesomeIcon icon={iconContent}/> : content
            }</a>
        </li>
    )
}