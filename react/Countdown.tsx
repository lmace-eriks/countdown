import React from 'react';
import { useState, useEffect } from 'react';
import { TimeSplit } from "./typings/global";
import { tick, getTwoDaysFromNow } from "./utils/time";
import { CSSProperties } from 'react';
import { relative } from 'path';

interface CountdownProps {
  targetDate: string,
  countdownTitle: string,
  countdownTitleColor: string,
  countdownTitleFontSize: string,
  countdownColor: string,
  countdownFontSize: string,
  blockBackgroundColor: string
  // blockBackgroundImage: string
}

const Countdown: StorefrontFunctionComponent<CountdownProps> = ({
  targetDate,
  countdownTitle,
  countdownTitleColor,
  countdownTitleFontSize,
  countdownColor,
  countdownFontSize,
  blockBackgroundColor
  // blockBackgroundImage
}) => {

  const [timeRemaining, setTime] = useState<TimeSplit>({
    days: "0",
    hours: "00",
    minutes: "00",
    seconds: "00",
    timeOver: true // Prevents initial loading of countdown if the target time has passed --
  });

  const [userHideAction, setUserHideAction] = useState<boolean>(false);

  const DEFAULT_TARGET_DATE = getTwoDaysFromNow();

  tick(targetDate, setTime);

  // Component Styles. Some values are fed by SiteEdior --
  const blockDiv: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: blockBackgroundColor,
    width: "100%"
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

  const closeButtonStyle: CSSProperties = {
    color: countdownTitleColor,
    fontSize: "1rem",
    textAlign: "right",
    padding: "0",
    margin: "0",
    cursor: "pointer",
    alignSelf: "flex-end",
    marginRight: "0.75rem",
    position: "relative",
    top: "0.75rem",
    lineHeight: "0"
  }

  const handleCloseClick = () => {
    setUserHideAction(true);
  };

  if (!!timeRemaining.timeOver || userHideAction) {
    return (<></>) // Block dissapears if Target Date has passed or user clicks [ x ] --
  } else {
    return (
      <div style={blockDiv}>
        <p style={closeButtonStyle} onClick={handleCloseClick}>[ x ]</p>
        <h1 style={h1Style}>{countdownTitle}</h1>
        {/* Renders "s" if time value is anything other than 1. Prevents "1 minutes"  */}
        <h2 style={h2Style}>{timeRemaining.days} Day{(timeRemaining.days === "1") ? "" : "s"}, {timeRemaining.hours} Hour{(timeRemaining.hours === "01") ? "" : "s"}, {timeRemaining.minutes} Minute{(timeRemaining.minutes === "01") ? "" : "s"} and {timeRemaining.seconds} Second{(timeRemaining.seconds === "01") ? "" : "s"}</h2>
      </div>
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
