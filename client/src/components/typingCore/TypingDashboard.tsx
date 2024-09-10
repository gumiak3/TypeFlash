import { useEffect, useState } from 'react';
import TypingMenu from './TypingMenu/TypingMenu';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { resetCorrectWordCounter } from '../../store/correctWordCounter/correctWordCounterSlice';
import TypingContainer from './TypingContainer';
import Timer from './TypingMenu/Timer';

export default function TypingDashboard() {
  const [timeOption, setTimeOption] = useState<number>(30);
  const [time, setTime] = useState<number>(timeOption);

  const counter = useSelector((state: RootState) => state.correctWordCounter.value);
  const dispatch = useDispatch();
  const [isRunning, setIsRunning] = useState(false);
  const [stopped, setStopped] = useState(false);

  function start() {
    setIsRunning(true);
  }

  function stop() {
    setIsRunning(false);
    setStopped(true);
    changeTime(timeOption);
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

  function handleSettingTimeOption(timeOption: number) {
    setTimeOption(timeOption);
    setTime(timeOption);
  }

  function subtractTime(value: number) {
    setTime((prev) => prev - value);
  }

  function changeTime(value: number) {
    setTime(value);
  }

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning) {
      timer = setInterval(() => {
        subtractTime(1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (time <= 0) {
      stop();
    }
  }, [time]);

  return (
    <section className="box-border p-8 text-gray-500">
      <div className="h-[80px] flex justify-center items-center">
        {isRunning ? (
          <Timer value={time} />
        ) : (
          <TypingMenu
            isRunning={isRunning}
            selectedTimeOption={timeOption}
            sendTimeOption={handleSettingTimeOption}
          />
        )}
      </div>

      {!stopped ? (
        <TypingContainer start={start} />
      ) : (
        <div className="flex flex-col align-middle">
          <p>{calcWordsPerMin()}</p>
          <button onClick={handleClick}>TRY AGAIN</button>
        </div>
      )}
    </section>
  );
}
