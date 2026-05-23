import "./App.css";
import Stopwatch from "./components/Stopwatch";
import Timer from "./components/Timer";

function App() {
  return (
    <div className="app-container">
      <div className="overlay"></div>

      <h1 className="main-title">⏱ Stopwatch & Timer</h1>

      <div className="cards-container">
        <Stopwatch />
        <Timer />
      </div>
    </div>
  );
}

export default App;