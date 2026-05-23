import { useEffect, useState } from "react";

function Timer() {
  const [inputSeconds, setInputSeconds] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);

      const audio = new Audio(
        "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
      );

      audio.play();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const startTimer = () => {
    if (!inputSeconds || Number(inputSeconds) <= 0) {
      alert("Please enter a valid number greater than 0");
      return;
    }

    if (timeLeft === 0) {
      setTimeLeft(Number(inputSeconds));
    }

    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setInputSeconds("");
  };

  return (
    <div className="card">
      <h2 className="card-title">Timer</h2>

      <input
        type="number"
        placeholder="Enter time in seconds"
        value={inputSeconds}
        onChange={(e) => setInputSeconds(e.target.value)}
      />

      <div className="time-display">{formatTime(timeLeft)}</div>

      <div className="buttons">
        <button
          className="start-btn"
          onClick={startTimer}
          disabled={isRunning}
        >
          Start
        </button>

        <button
          className="pause-btn"
          onClick={pauseTimer}
          disabled={!isRunning}
        >
          Pause
        </button>

        <button className="reset-btn" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;