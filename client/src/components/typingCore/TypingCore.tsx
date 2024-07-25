import { useEffect, useRef, useState } from "react";
import TypingContainer from "./TypingContainer";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { resetCorrectWordCounter } from "../../store/correctWordCounter/correctWordCounterSlice";

interface ITypingCore {
    timeOption: number;
}

export default function TypingCore({ timeOption }: ITypingCore) {
    const counter = useSelector(
        (state: RootState) => state.correctWordCounter.value
    );
    const dispatch = useDispatch();
    const [isRunning, setIsRunning] = useState(false);
    const [stopped, setStopped] = useState(false);
    function start() {
        setIsRunning(true);
    }
    function stop() {
        setIsRunning(false);
        setStopped(true);
    }
    function reset() {
        setIsRunning(false);
        setStopped(false);
        dispatch(resetCorrectWordCounter());
    }
    function handleClick() {
        reset();
    }
    function calcWordsPerMin() {
        return counter * (60 / timeOption);
    }
    useEffect(() => {
        if (isRunning) {
            setTimeout(stop, timeOption * 1000);
        }
    }, [isRunning]);
    return (
        <>
            {!stopped ? (
                <TypingContainer start={start} />
            ) : (
                <div className="flex flex-col align-middle">
                    <p>{calcWordsPerMin()}</p>
                    <button onClick={handleClick}>TRY AGAIN</button>
                </div>
            )}
        </>
    );
}
