import { useTransactionContext } from '@/hooks/useTransactionContext';
import { Button, Chip } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import RateIndicator from './RateIndicator';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface TimerIndicatorProps {
  onTimerComplete: () => void;
}

export const TimerIndicator: React.FC<TimerIndicatorProps> = ({
  onTimerComplete,
}) => {
  const { transaction } = useTransactionContext();
  const startTimeInSeconds = 15 * 60;
  const [timeLeft, setTimeLeft] = useState(startTimeInSeconds);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimerComplete();
      setTimeLeft(startTimeInSeconds);
      return;
    }

    const intervalId = setInterval(() => {
      if (transaction.commercialRate !== 0) {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onTimerComplete]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <span className="timer-indicator">
      <Button className="h-7 p-0 min-w-min" onClick={() => setTimeLeft(0)}>
        <Chip
          color="primary"
          startContent={<ArrowPathIcon className="h-4 w-4" />}
        >
          {formatTime()}
        </Chip>
      </Button>
    </span>
  );
};
