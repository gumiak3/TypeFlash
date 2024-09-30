import { useEffect, useState } from 'react';
import TypingMenu from './TypingMenu/TypingMenu';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { resetCorrectWordCounter } from '../../store/correctWordCounter/correctWordCounterSlice';
import TypingContainer from './TypingContainer';
import Timer from './TypingMenu/Timer';
import ScorePanel from './ScorePanel';
import useDictionary from '../../hooks/useDictionary';
import { BsArrowRepeat } from 'react-icons/bs';

export default function TypingDashboard() {
  const { dictionary, refetchData } = useDictionary(`${import.meta.env.VITE_GET_WORDS}/500`);
  const [timeOption, setTimeOption] = useState<number>(30);
  const [time, setTime] = useState<number>(timeOption);

  const counter = useSelector((state: RootState) => state.correctWordCounter.value);
  const dispatch = useDispatch();
  const [isRunning, setIsRunning] = useState(false);
  const [stopped, setStopped] = useState(false);

  const [data, setData] = useState<string[]>(dictionary);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function start() {
    setIsRunning(true);
  }

  useEffect(() => {
    setData(dictionary);
  }, [dictionary]);

  function stop() {
    setIsRunning(false);
    setStopped(true);
    changeTime(timeOption);
  }

  async function dataRestart() {
    setIsLoading(true);
    const newData = await refetchData();
    setData(newData);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  async function reset() {
    setIsRunning(false);
    setStopped(false);
    dispatch(resetCorrectWordCounter());
    setTime(timeOption);

    dataRestart();
  }

  function handleClick() {
    reset();
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

  function calculateScore(counter: number) {
    return counter * (60 / timeOption);
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
    document.addEventListener('keydown', (e) => {
      if (e.key === '5') {
        reset();
      }
    });
  });

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
          !stopped && (
            <TypingMenu
              isRunning={isRunning}
              selectedTimeOption={timeOption}
              sendTimeOption={handleSettingTimeOption}
            />
          )
        )}
      </div>
      <TypingContainer
        className={stopped ? 'hidden' : ''}
        isLoading={isLoading}
        start={start}
        dictionary={data}
      />
      {stopped && (
        <div className="flex flex-col align-middle">
          <ScorePanel score={calculateScore(counter)} />
          <button className="text-4xl flex justify-center " onClick={handleClick}>
            <BsArrowRepeat className="transition-transform duration-300 transform hover:rotate-180 hover:text-white" />
          </button>
        </div>
      )}
    </section>
  );
}
