import { useEffect, useRef } from 'react';

interface SneakPeekProps {
  children: string;
}
export default function SneakPeek({ children }: SneakPeekProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        ref.current.classList.remove('sneak-peek-hide');
        ref.current.classList.add('sneak-peek-show');
      }
    }, 250);
  });
  return (
    <div
      ref={ref}
      className={'sneak-peek-hide absolute px-4 bg-slate-700 top-8 rounded select-none'}
    >
      {children}
    </div>
  );
}
