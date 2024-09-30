interface ScorePanelProps {
  score: number;
}

export default function ScorePanel({ score }: ScorePanelProps) {
  return (
    <div className="flex items-center flex-col p-10 gap-2">
      <p className="text-3xl">words per minute</p>
      <h2 className="text-7xl text-white">{score}</h2>
    </div>
  );
}
