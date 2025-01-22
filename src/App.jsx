// import React from "react";
import Navbar from "./components/Navbar";
import CountdownTimer from "./components/CountDownTimer";

const App = () => {
  return (
    <div className="w-full bg-white font-inter scroll-smooth">
      {/* Navbar */}
      <Navbar />

      {/* Sections */}
      <div className="flex items-center justify-center w-full min-h-screen pt-20">
        <CountdownTimer />
      </div>
    </div>
  );
};

export default App;
