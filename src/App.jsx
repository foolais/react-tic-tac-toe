import { useState, useEffect } from "react";
import "./App.css";
import Box from "./components/Box";
import Swal from "sweetalert2";

function App() {
  const [isChangePlayer, setIsChangePlayer] = useState(false);
  const [data, setData] = useState(Array(9).fill(null));
  const [isPlaying, setIsPlaying] = useState(false);
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isChangeHistory, setIsChangeHistory] = useState(false);

  // when changes data
  useEffect(() => {
    setWinner(calculateWinner(data, setIsChangePlayer));
  }, [data]);

  const handleBoxClick = (value) => {
    const isWinner = calculateWinner(data, setIsChangePlayer);

    if (!isPlaying || isWinner !== null) {
      Swal.fire({
        icon: "warning",
        text: `Please Start The Game First`,
        allowOutsideClick: false,
      });
    } else {
      setIsChangeHistory(false);
      setCurrentMove((prev) => prev + 1);
      setData((prevData) => {
        const newData = [...prevData];
        const newHistory = [...history.slice(0, currentMove + 1), newData];
        newData[value.index] = isChangePlayer ? "O" : "X";
        setHistory(newHistory);
        setIsChangePlayer(!isChangePlayer);

        return newData;
      });
      if (currentMove === 8)
        Swal.fire({
          icon: "warning",
          text: `Game Over`,
          allowOutsideClick: false,
        });
    }
  };

  const goToMove = (data) => {
    setIsChangePlayer(data.index % 2 === 0);
    setCurrentMove(data.index);
    setData(data.arr);
    setIsChangeHistory(true);
  };

  const resetGame = () => {
    setHistory([]);
    setIsPlaying(false);
    setIsChangePlayer(false);
    setCurrentMove(0);
    setData(Array(9).fill(null));
    setIsChangeHistory(false);
  };

  return (
    <>
      <div className="flex gap-20">
        <div>
          <h1 className="text-teal-500">Tic Tac Toe </h1>
          {!isPlaying ? (
            <div className="card">
              <button onClick={() => setIsPlaying(true)}>Start</button>
            </div>
          ) : (
            <div className="card grid">
              <button onClick={() => resetGame()}>
                {winner?.data ? "Try Again" : "Reset Game"}
              </button>
              {winner?.data ? (
                <span className="my-2 text-lg">Winner is {winner?.data}</span>
              ) : (
                <span className="my-2 text-lg">
                  Next Player is {isChangePlayer ? "O" : "X"}
                </span>
              )}
            </div>
          )}
          <div className="flex">
            <div className="grid grid-cols-3 pa-0 ma-0 gap-0">
              {data.map((data, index) => (
                <Box
                  key={index}
                  value={{ index, data }}
                  winnerData={winner?.box}
                  handleBoxClick={handleBoxClick}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-[13vh] text-left">
          <h2 className="text-lg font-semibold text-teal-400 mb-3">History</h2>
          <div className="grid gap-3">
            {history.map((arr, index) => {
              return (
                <div key={index} className="flex gap-2">
                  <span>{index + 1}. </span>
                  <button
                    className={`${
                      isChangeHistory && currentMove === index
                        ? "bg-teal-500"
                        : ""
                    } `}
                    onClick={() => goToMove({ arr, index })}
                  >
                    <span>Go To Move #{index + 1}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function calculateWinner(data, setIsChangePlayer) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (data[a] !== null && data[a] === data[b] && data[a] === data[c]) {
      Swal.fire({
        icon: "success",
        text: `Winner is ${data[a]}`,
        allowOutsideClick: false,
      });
      setIsChangePlayer(false);
      const payload = {
        data: data[a],
        box: [a, b, c],
      };
      return payload;
    }
  }
  return null;
}

export default App;
