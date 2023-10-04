
interface wordProps{
    content : string
}
export function Word({content} : wordProps){
    function getLetters(word : string){
        const letters = [];
        for(let i=0;i<word.length;i++){
            letters.push(word[i]);
        }
        return letters;
    }

    return (
        <li>{getLetters(content).map(letter => (
            <span>{letter}</span>
        ))}</li>
    )
}