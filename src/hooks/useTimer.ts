import { useEffect, useState } from "react";

type Timer = { type: 'Finished' }
    | { type: 'Ongoing', hours: number, minutes: number, seconds: number }

const FINISHED_TIMER: Timer = { type: 'Finished' }

const createOngoingTimer = (timeLeft: number): Timer => ({
    type: 'Ongoing',
    hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeLeft % (1000 * 60)) / 1000)
})

const calculateTimeLeft = (targetTimestamp: number, currentTimestamp = Date.now()): number => targetTimestamp - currentTimestamp;

export const useTimer = (target: number, interval: number = 500 /* half a second */): Readonly<Timer> => {
    const [timeLeft, setTimeLeft] = useState<number>(calculateTimeLeft(target));
    useEffect(() => {
        const id = setInterval(() => setTimeLeft(calculateTimeLeft(target)), interval);
        return () => clearInterval(id);
    }, [target, interval]);
    return timeLeft < 0 ? FINISHED_TIMER : createOngoingTimer(timeLeft);
}
