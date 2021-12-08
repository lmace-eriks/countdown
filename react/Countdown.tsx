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
  titleSecondLine: string,
  titleSecondLineFontSize: string,
  titleSecondLineColor: string,
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
  titleSecondLine,
  titleSecondLineFontSize,
  titleSecondLineColor,
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

  // Wrapping Anchor Tag --
  const aStyle: CSSProperties = {
    textDecoration: "none"
  }

  // Block or Background --
  const blockDiv: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: blockBackgroundColor,
    width: "100%",
    cursor: "pointer"
  }

  // Title First Line --
  const h2Style: CSSProperties = {
    color: countdownTitleColor,
    fontSize: countdownTitleFontSize,
    textAlign: "center",
    margin: "0",
    padding: "0"
  }

  // Title Second Line --
  const h2SecondLineStyle: CSSProperties = {
    color: titleSecondLineColor || countdownTitleColor,
    fontSize: titleSecondLineFontSize || countdownTitleFontSize,
    textAlign: "center",
    margin: "0",
    padding: "0"
  }

  // Countdown --
  const h3Style: CSSProperties = {
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
          <h2 style={h2Style}>{countdownTitle}</h2>

          {/* Renders only if defined */}
           {titleSecondLine && <h2 style={h2SecondLineStyle}>{titleSecondLine}</h2>}

          {/* Renders "s" if time value is anything other than 1. Prevents "1 minutes"  */}
          <h3 style={h3Style}>{timeRemaining.days} Day{(timeRemaining.days === "1") ? "" : "s"}, {timeRemaining.hours} Hour{(timeRemaining.hours === "01") ? "" : "s"}, {timeRemaining.minutes} Minute{(timeRemaining.minutes === "01") ? "" : "s"} and {timeRemaining.seconds} Second{(timeRemaining.seconds === "01") ? "" : "s"}</h3>
        
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
      default: "2099-01-01"
    },

    blockLink: {
      title: "Link",
      description: "Full path to URL. https://www...",
      type: "string",
      default: "#"
    },

    countdownTitle: {
      title: "Countdown Title",
      description: "Free shipping ends in...",
      type: "string",
      default: null
    },

    countdownTitleFontSize: {
      title: "Title Font Size",
      description: "2rem, 2.8rem, 20px",
      type: "string",
      default: null
    },

    countdownTitleColor: {
      title: "Title Line Color",
      description: "red, black, #00FF11",
      type: "string",
      default: null
    },

    titleSecondLine: {
      title: "Title Second Line",
      description: "Hidden if left blank.",
      type: "string",
      default: null
    },

    titleSecondLineFontSize: {
      title: "Second Title Font Size",
      description: "Inherits first line's font size if left blank.",
      type: "string",
      default: null
    },

    titleSecondLineColor: {
      title: "Second Title Color",
      description: "Inherits first line's color if left blank.",
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
