import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [isHigh, setIsHigh] = useState(false); //Show greeting gif
  const [score, setScore] = useState(0); // Store current score
  const [message, setMessage] = useState(""); // Store feedback message
  const [highscore, setHighscore] = useState(""); // Store high score
  const [correctNumber, setCorrectNumber] = useState(
    Math.floor(Math.random() * 4) + 1
  ); // Generate random correct number (1-4)

  // Handle guess logic
  const handleGuess = (number) => {
    if (number === correctNumber) {
      setScore(score + 10); // Increase score by 10 for correct guess
      setMessage("Correct! You earned 10 points.");
    } else {
      setScore(score - 2); // Decrease score by 2 for wrong guess
      setMessage("Wrong guess! You lost 2 points.");
    }
    // Generate new correct number after each guess
    setCorrectNumber(Math.floor(Math.random() * 4) + 1);
  };

  // Clear the message after a delay
  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 1500);
  }, [score]); // Depend on score change

  // Update highscore if logged in and score surpasses highscore
  useEffect(() => {
    if (localStorage.getItem("login") === "true") {
      setHighscore(localStorage.getItem("score")); // Get saved high score
      if (parseInt(localStorage.getItem("score")) < score) {
        alert("hurray you break your record..");
        let datascore = {
          username: localStorage.getItem("username"),
          password: localStorage.getItem("password"),
          highScore: score,
        };
        const updateScore = async () => {
          try {
            const response = await axios.post(
              "https://game-server-sb04.onrender.com/api/auth/score",
              datascore,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            console.log(response.data.message);
            if (response.data.message === "Score updated successfully") {
              localStorage.setItem("score", score); // Update local storage with new high score
              navigate("/"); // Navigate to home after updating score
            }
          } catch (error) {
            console.error("Error updating score:", error);
          }
        };
        updateScore(); // Call function to update score
      }
    } else {
      // If not logged in, track the high score locally
      if (score > highscore) {
        setIsHigh(true);
        setHighscore(score);
        setTimeout(() => {
          setIsHigh(false);
        }, 1500);
      }
    }
  }, [score, highscore, navigate]); // Depend on score change

  return (
    <div>
      <div className="w-screen min-h-screen pt-[10vh] flex flex-col items-center bg-zinc-700 text-white">
        <div className="gamebox w-[80vw] rounded-md relative bg-orange-100 h-[50vh] flex flex-col items-center justify-center">
          {/* Display high score */}
          <div className="score w-[20vw] absolute top-1  left-2 ">
            <span className=" text-purple-400 text-[20px] font-semibold font-mono ">
              Maximum score:
            </span>
            <span className=" font-bold ml-3 px-1 text-zinc-800 bg-zinc-200 text-center  ">
              {highscore}
            </span>
          </div>
          {/* Display current score */}
          <div className="score-box mb-4">
            <h2 className="absolute  top-1 right-[10vw]  text-purple-400 text-[20px] font-semibold font-mono">
              Score:
              <span className=" font-bold ml-3 px-1 text-zinc-800 bg-zinc-200 text-center">
                {score}
              </span>
            </h2>
          </div>

          {/* Render buttons for guessing numbers */}
          <div className="numbers flex space-x-4">
            {[1, 2, 3, 4].map((number) => (
              <button
                key={number}
                onClick={() => handleGuess(number)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 active:bg-blue-700 transition-all"
              >
                {number}
              </button>
            ))}
          </div>
          {/* Show feedback message */}
          <div className="message mt-4">
            <div className="me h-7 text-center text-zinc-600 ">
              <p>{message}</p>
            </div>
          </div>
        </div>
        {/* absolute  w-screen overflow-hidden h-screen z-50 top-0 right-0 */}
        {/* {
          const [ishigh, setishigh] = useState("none")
        } */}
        <div
          className={`absolute ${
            isHigh ? "visible-class" : "hidden"
          } w-screen overflow-hidden h-screen z-50 top-0 right-0`}
        >
          <div className="relative w-full h-full">
            <img
              className="w-full h-full absolute top-0 right-[5vh] object-cover"
              src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnJueGxydjR2eDVtdWprem82M3F5Mmo1OW13N2Z3cWJhdjB3a3dnaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/h8aKaIyzl1pQ53d2i5/giphy.gif"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
