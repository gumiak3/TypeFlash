import { useEffect } from 'react';

interface TimerProps {
  value: number;
}

export default function Timer({ value }: TimerProps) {
  // add animation when time value is less than 5 (the beating animation)
  return <p className={`text-xl text-white ${value <= 5 && 'animate-ping'}`}>{value}</p>;
}
