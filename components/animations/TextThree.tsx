"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

interface TextThreeProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

// check if user wants reduced motion
function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServer() {
  return false;
}

function subscribeReducedMotion(cb: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
}

// typewriter animation - types out text one character at a time
export default function TextThree({
  text,
  className = "",
  speed = 80,
  delay = 500,
}: TextThreeProps) {
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [done, setDone] = useState(false);
  const cursorRef = useRef(true);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer
  );

  // skip animation if user prefers reduced motion
  const displayText = reducedMotion ? text : typedText;
  const showCursor = reducedMotion ? false : cursorVisible;

  useEffect(() => {
    if (reducedMotion) return;

    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        if (i < text.length) {
          setTypedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setDone(true);
          setTimeout(() => setCursorVisible(false), 2000);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, delay, reducedMotion]);

  // blinking cursor
  useEffect(() => {
    if (reducedMotion || done) return;
    const blink = setInterval(() => {
      cursorRef.current = !cursorRef.current;
      setCursorVisible(cursorRef.current);
    }, 530);
    return () => clearInterval(blink);
  }, [reducedMotion, done]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">
        {displayText}
        {showCursor && (
          <span className="inline-block w-[2px] h-[1em] bg-current ml-[2px] align-middle animate-pulse" />
        )}
      </span>
    </span>
  );
}
