import { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [inputMinutes, setInputMinutes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);

  // Load completed tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks =
      JSON.parse(localStorage.getItem("completedTasks")) || [];
    setCompletedTasks(storedTasks);
  }, []);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      // Save the completed task to localStorage
      const newTask = { taskName, time: inputMinutes };
      const updatedTasks = [...completedTasks, newTask];
      setCompletedTasks(updatedTasks);
      localStorage.setItem("completedTasks", JSON.stringify(updatedTasks));
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, taskName, inputMinutes, completedTasks]);

  const startTimer = () => {
    setTimeLeft(inputMinutes * 60);
    setIsRunning(true);
  };

  const resetTimer = () => {
    setInputMinutes(0);
    setTimeLeft(0);
    setIsRunning(false);
    setTaskName("");
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex w-full flex-col items-center justify-center min-h-[87vh] lg:min-h-[88.5vh] dark:bg-gray-900 bg-gray-100">
      <div className="grid justify-center w-full grid-cols-1 gap-4 px-6 py-5 lg:px-80 md:grid-cols-2">
        {/* Timer Section */}
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <h1 className="pt-3 pb-6 text-2xl font-bold text-center">
            Focused Timer
          </h1>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name"
              className="p-2 border border-gray-300 rounded-lg"
              disabled={isRunning}
            />
            <input
              type="number"
              value={inputMinutes}
              onChange={(e) => setInputMinutes(parseInt(e.target.value, 10))}
              placeholder="Enter minutes"
              className="p-2 border border-gray-300 rounded-lg"
              disabled={isRunning}
            />
            <div className="flex items-center justify-center w-56 h-56 mx-auto text-4xl font-bold border-2 border-gray-100 rounded-full">
              <span>{formatTime(timeLeft)}</span>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={resetTimer}
                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Reset
              </button>
              <button
                onClick={startTimer}
                disabled={isRunning || inputMinutes <= 0}
                className="px-4 py-2 text-white bg-gray-900 rounded-lg hover:bg-gray-600 disabled:bg-gray-400"
              >
                Start
              </button>
            </div>
          </div>
        </div>

        {/* Completed Tasks Section */}
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-center">
            Completed Tasks
          </h2>
          {completedTasks.length > 0 ? (
            <ul className="space-y-2">
              {completedTasks.map((task, index) => (
                <li
                  key={index}
                  className="p-2 border border-gray-200 rounded-lg"
                >
                  <span className="font-semibold">{task.taskName}</span> -{" "}
                  <span>{task.time} minutes</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks completed yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
