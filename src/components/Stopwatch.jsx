import { useEffect, useState } from "react";

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const pauseStopwatch = () => {
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const addLap = () => {
    if (time > 0) {
      setLaps([...laps, formatTime(time)]);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Stopwatch</h2>

      <div className="time-display">{formatTime(time)}</div>

      <div className="buttons">
        <button
          className="start-btn"
          onClick={startStopwatch}
          disabled={isRunning}
        >
          Start
        </button>

        <button
          className="pause-btn"
          onClick={pauseStopwatch}
          disabled={!isRunning}
        >
          Pause
        </button>

        <button className="reset-btn" onClick={resetStopwatch}>
          Reset
        </button>

        <button className="lap-btn" onClick={addLap}>
          Lap
        </button>
      </div>

      {laps.length > 0 && (
        <div className="laps-container">
          <h3>Laps</h3>

          {laps.map((lap, index) => (
            <div key={index} className="lap-item">
              Lap {index + 1}: {lap}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Stopwatch;