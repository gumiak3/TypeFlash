import ListItem from './ListItem'
import {lists} from './ListItem.data'
export default function Navbar() {
    return (
        <nav className="w-full">
            <ul className="flex h-full items-center justify-end">
                {lists.map((list) => (
                    <ListItem {...list}/>
                ))}
            </ul>
        </nav>
    )
}