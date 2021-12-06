import { TimeSplit } from '../typings/global';

const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 60 * SECONDS_IN_MINUTE;
const SECONDS_IN_DAY = 24 * SECONDS_IN_HOUR;

const fillWithZero = (digits: number, number: number): string => {
  const filled = `${'0'.repeat(digits - 1)}${number}`;

  return filled.slice(filled.length - digits);
}

export const parseTimeRemaining = (totalSeconds: number): TimeSplit => {
  const days = Math.floor(totalSeconds / SECONDS_IN_DAY);
  const hours = Math.floor(totalSeconds % SECONDS_IN_DAY / SECONDS_IN_HOUR);
  const minutes = Math.floor(
    (totalSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE
  );

  const seconds = Math.floor(
    (totalSeconds % SECONDS_IN_HOUR) % SECONDS_IN_MINUTE
  );

  // Checks to see if the target time has passed and sets
  // our timeOver property to true. The Countdown.tsx file
  // looks for this as a conditional render --
  let timeOver: boolean = false;

  if (totalSeconds <= 0) {
    timeOver = true;
  }

  return {
    days: days.toString(),
    hours: fillWithZero(2, hours),
    minutes: fillWithZero(2, minutes),
    seconds: fillWithZero(2, seconds),
    timeOver: timeOver
  };
}

/**
 *
 * @param targetDate ISOString for the date that the countdown will expire
 * @param dispatchFn A function that updates the state of the component
 */
export const tick = (targetDate: string, dispatchFn: React.Dispatch<React.SetStateAction<TimeSplit>>) => {
  const ONE_SECOND_IN_MILLIS = 1000;
  const finalDate = new Date(targetDate);

  // Adjusting for -6 hours AKA Central Time Zone --
  finalDate.setHours(finalDate.getHours() + 6);

  const now = new Date();

  if (now <= finalDate) {
    const secondsLeft = (finalDate.getTime() - now.getTime()) / ONE_SECOND_IN_MILLIS;

    setTimeout(() => {
      dispatchFn(parseTimeRemaining(secondsLeft));
    }, ONE_SECOND_IN_MILLIS);
  }
}

export const getTwoDaysFromNow = () => {
  const today = new Date();

  today.setDate(today.getDate() + 2);

  return today.toISOString();
}