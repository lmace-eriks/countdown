import React from 'react';
import { useState, useEffect } from 'react';
import { TimeSplit } from "./typings/global";
import { tick, getTwoDaysFromNow } from "./utils/time";
import { CSSProperties } from 'react';
import { relative } from 'path';

interface CountdownProps {
  targetDate: string,
  blockLink: string,
  countdownTitle: string,
  countdownTitleColor: string,
  countdownTitleFontSize: string,
  countdownColor: string,
  countdownFontSize: string,
  blockBackgroundColor: string
}

const Countdown: StorefrontFunctionComponent<CountdownProps> = ({
  targetDate,
  blockLink,
  countdownTitle,
  countdownTitleColor,
  countdownTitleFontSize,
  countdownColor,
  countdownFontSize,
  blockBackgroundColor
}) => {

  const [timeRemaining, setTime] = useState<TimeSplit>({
    days: "0",
    hours: "00",
    minutes: "00",
    seconds: "00",
    timeOver: true // Prevents initial loading of countdown if the target time has passed --
  });

  const DEFAULT_TARGET_DATE = getTwoDaysFromNow();

  tick(targetDate, setTime);

  // Component Styles. Some values are fed by SiteEdior --
  const aStyle: CSSProperties = {
    textDecoration: "none"
  }

  const blockDiv: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: blockBackgroundColor,
    width: "100%",
    cursor: "pointer"
  }

  const h1Style: CSSProperties = {
    color: countdownTitleColor,
    fontSize: countdownTitleFontSize,
    textAlign: "center",
    margin: "0",
    padding: "0"
  }

  const h2Style: CSSProperties = {
    color: countdownColor,
    fontSize: countdownFontSize,
    textAlign: "center",
    margin: "0",
    padding: "0",
    paddingBottom: "0.25rem"
  }

  if (!!timeRemaining.timeOver) {
    return (<></>) // Block dissapears if Target Date has passed --
  } else {
    return (
      <a style={aStyle} href={blockLink}>
        <div style={blockDiv}>
          <h1 style={h1Style}>{countdownTitle}</h1>
          {/* Renders "s" if time value is anything other than 1. Prevents "1 minutes"  */}
          <h2 style={h2Style}>{timeRemaining.days} Day{(timeRemaining.days === "1") ? "" : "s"}, {timeRemaining.hours} Hour{(timeRemaining.hours === "01") ? "" : "s"}, {timeRemaining.minutes} Minute{(timeRemaining.minutes === "01") ? "" : "s"} and {timeRemaining.seconds} Second{(timeRemaining.seconds === "01") ? "" : "s"}</h2>
        </div>
      </a>
    )
  }
}

Countdown.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {
    targetDate: {
      title: "Final Date",
      description: "Final date used in the countdown YYYY-MM-DD. Treats date as midnight the morning of date.",
      type: "string",
      default: null
    },
    blockLink: {
      title: "Link",
      description: "https://www...",
      type: "string",
      default: "#"
    },
    countdownTitle: {
      title: "Countdown Title",
      description: "Free shipping ends in...",
      type: "string",
      default: null
    },
    countdownTitleColor: {
      title: "Title Color",
      description: "red, black, #00FF11",
      type: "string",
      default: null
    },
    countdownTitleFontSize: {
      title: "Title Font Size",
      description: "2rem, 2.8rem, 20px",
      type: "string",
      default: null
    },
    countdownColor: {
      title: "Countdown Color",
      description: "red, black, #00FF11",
      type: "string",
      default: null
    },
    countdownFontSize: {
      title: "Countdown Font Size",
      description: "2rem, 2.8rem, 20px",
      type: "string",
      default: null
    },
    blockBackgroundColor: {
      title: "Background Color",
      description: "black, transparent, #00FF00",
      type: "string",
      default: null
    }
  }
}

export default Countdown
