import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import "./App.css";

// now that number of rows and columns are created, run app

// make sure they're mutable
let numRows = 50;
let numCols = 75;

const App = () => {
  // setting counter logic
  let [count, setCount] = useState(75);
  // setting conways rules for possible values for traversal in 9x9 grid of cells
  const traverseNeighbors = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
  ];
  // creating a grid generator
  const createGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  };

  // use stateful logic to set initial values in state on grid
  const [grid, setGrid] = useState(() => {
    return createGrid();
  });

  // init to not running hook
  const [running, setRunning] = useState(false);

  // refer useref to whether running or not to toggle state
  const runningRef = useRef(running);
  runningRef.current = running;
  // set state logic to control range of speed input for timeout delay
  let [range, setRange] = useState(75);
  const handleChange = (event) => {
    setRange({ range: event.target.value });
  };
  // if not currently running, use callback to simulate update with setTimeout time value
  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((currGrid) => {
      return produce(currGrid, (gridCopy) => {
        // create double for loop to check every value in the grid and update
        // produce sets immutable new grid
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighbors = 0;
            traverseNeighbors.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                neighbors += currGrid[newI][newJ];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;
            } else if (currGrid[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, { range });
  }, []);

  return (
    <>
      <header>
        <br />
        <h1>Welcome to Conways Game of Life, Begin!</h1>
        <br />
      </header>
      <div className="App">
        <section>
          <h2>
            Press Random + Run to see Results, or select starting cell pattern:
          </h2>
          {/* <p>
            The Rules: For a space that is 'populated': Each cell with one or no
            neighbors dies, as if by solitude. Each cell with four or more
            neighbors dies, as if by overpopulation. Each cell with two or three
            neighbors survives. For a space that is 'empty' or 'unpopulated'
            Each cell with three neighbors becomes populated.
          </p> */}
          <h4>Grid Count: {count}</h4>
        </section>
        <div>
          <h4>
            Enter any of the shapes below with your mouse to see the results:
          </h4>
          <img
            // src="https://evolvingweb.ca/sites/default/files/inline-images/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f3456565a547654717a5252304255774e49482f67697068792e676966.gif"
            src="https://img.itch.zone/aW1nLzIxNTk1NTYucG5n/original/nS1Wxk.png"
            alt=""
            width="520px"
            height="400px"
          />
          <br />
          <p>Speed:</p>
          <input type="range" min="0" max="100" onChange={handleChange}></input>
        </div>
        <button
          className="run"
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
        >
          {running ? "stop" : "run"}
        </button>
        <button
          className="pause"
          onClick={() => {
            setRunning(!running);
          }}
        >
          {running ? "pause" : "pause"}
        </button>
        <button
          className="start"
          onClick={() => {
            const rows = [];
            for (let i = 0; i < numRows; i++) {
              rows.push(
                Array.from(Array(numCols), () => (Math.random() > 0.69 ? 1 : 0))
              );
            }

            setGrid(rows);
          }}
        >
          random
        </button>
        <button
          className="clear"
          onClick={() => {
            setGrid(createGrid());
          }}
        >
          clear
        </button>
        {/* set div size with style and then run logic to map out cells */}
        <div
          className="grid"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${numCols},12.5px)`,
          }}
        >
          {grid.map((rows, i) =>
            rows.map((col, j) => (
              <div
                key={`${i}-${j}`}
                onClick={() => {
                  const newGrid = produce(grid, (gridCopy) => {
                    gridCopy[i][j] = grid[i][j] ? 0 : 1;
                  });
                  setGrid(newGrid);
                }}
                style={{
                  width: 12.5,
                  height: 12.5,
                  backgroundColor: grid[i][j] ? "#00ddff" : null,
                  border: "solid 1px #444",
                }}
              />
            ))
          )}
        </div>
      </div>
      <footer>
        <br />
        <a href="#">Home</a>
        <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
          About
        </a>
      </footer>
    </>
  );
};

export default App;
