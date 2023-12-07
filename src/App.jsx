import { useState, useEffect } from "react";
import "./App.css";
import Box from "./components/Box";
import Swal from "sweetalert2";

function App() {
  const [isChangePlayer, setIsChangePlayer] = useState(true);
  const [data, setData] = useState(Array(9).fill(null));
  const [isPlaying, setIsPlaying] = useState(false);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    setWinner(calculateWinner(data));
  }, [data]);

  const handleBoxClick = (value) => {
    if (!isPlaying || calculateWinner(data) !== null) {
      Swal.fire({
        icon: "warning",
        text: `The Game Has Ended`,
        allowOutsideClick: false,
      });
    } else {
      setData((prevData) => {
        const newData = [...prevData];
        newData[value.index] = isChangePlayer ? 0 : 1;
        setIsChangePlayer(!isChangePlayer);

        return newData;
      });
    }
  };

  const resetData = () => {
    setIsPlaying(false);
    setData(Array(9).fill(null));
  };

  return (
    <>
      <h1 className="text-teal-500">Tic Tac Toe {winner}</h1>
      {!isPlaying ? (
        <div className="card">
          <button onClick={() => setIsPlaying(true)}>Start</button>
        </div>
      ) : (
        <div className="card grid">
          <button onClick={() => resetData()}>
            {winner ? "Try Again" : "Reset Game"}
          </button>
          {winner ? (
            <span className="my-2 text-lg">Winner is {winner}</span>
          ) : null}
        </div>
      )}
      <div className="grid grid-cols-3 pa-0 ma-0 gap-0">
        {data.map((data, index) => (
          <Box
            key={index}
            value={{ index, data }}
            handleBoxClick={handleBoxClick}
          />
        ))}
      </div>
      <br />
    </>
  );
}

function calculateWinner(data) {
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
      return data[a];
    }
  }
  return null;
}

export default App;
