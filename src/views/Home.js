import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import "../App.css";
import Presets from "../components/Presets";

// now that number of rows and columns are created, run app
// make sure they're mutable
let numRows = 50;
let numCols = 75;

const Home = (props) => {
  // setting counter logic

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
  // creating custom glide off function
  // and storing 2d array for glider test later
  const glider = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2], [20], [50]];
  // const gliderTest = [
  //   [0, 0, 1, 0, 0],
  //   [0, 1, 0, 1, 0],
  //   [0, 1, 1, 1, 0],
  //   [0, 0, 0, 1, 0],
  //   [0, 1, 0, 0, 1],
  // ];
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
  const [generation, setGeneration] = useState(0);
  // set state logic to control range of speed input for timeout delay

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
    if (setGrid) {
      setGeneration((prevState) => (prevState += 1));
    }
    setTimeout(runSimulation, 90);
  }, [traverseNeighbors]);
  // run glider simulation
  const runGlider = useCallback(() => {
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
            glider.forEach(([x, y]) => {
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
    if (setGrid) {
      setGeneration((prevState) => (prevState += 1));
    }
    setTimeout(runGlider, 190);
  }, [glider]);

  return (
    <>
      <header>
        <br />
        <h1>Welcome to Conways Game of Life, Begin!</h1>
        <br />
      </header>
      <div className="container">
        <div className="App">
          <section>
            <h2>
              Press Random + Run to see Results, or select starting cell
              pattern:
            </h2>
            {/* <h4>Grid Count: {75}</h4> */}
            <div className="rules">
              <h4>
                The Rules:
                <br />
                For a space that is 'populated': Each cell with one or no
                neighbors dies, solitude.
                <br />
                Each cell with four or more neighbors dies, as if by
                overpopulation.
                <br />
                Each cell with two or three neighbors survives. For a space that
                is 'empty.'
                <br />
                Each cell with three neighbors becomes populated.
              </h4>
            </div>
            <div>
              <h4>
                Enter any of the shapes you see below with your mouse, run to
                see the results:
              </h4>
              <img
                src="https://ix.cs.uoregon.edu/~norris/cis330/projects/gameoflife.png"
                alt=""
                width="480px"
                height="400px"
              />
              <img
                src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Surveillance_re_8tkl.svg"
                alt=""
                width="480px"
                height="400px"
              />
              <br />
              <h4>
                Enter shape you click on to create responds with cell automaton
                results:
              </h4>
              <img
                src="https://i1.wp.com/blog.faq400.com/wp-content/uploads/2020/04/1024px-Game_of_life_glider_gun.svg-1.png?fit=1024%2C299&ssl=1&resize=1280%2C720"
                width="140px"
                height="80px"
                alt=""
                className="demo"
              />
              <Presets />
              <h4>Speed:</h4>
              <input
                type="range"
                min="0"
                max="100"
                // onChange={handleChange}
              ></input>
            </div>
            <h4>Generation: {generation}</h4>
          </section>
          <section className="buttons">
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
              className="run"
              onClick={() => {
                setRunning(!running);
                if (!running) {
                  runningRef.current = true;
                  runGlider();
                }
              }}
            >
              {running ? "stop" : "glide off"}
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
                    Array.from(Array(numCols), () =>
                      Math.random() > 0.69 ? 1 : 0
                    )
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
          </section>
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
                  className="cell"
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
                    border: "solid 1px #333",
                    borderRadius: "4px",
                  }}
                />
              ))
            )}
          </div>
        </div>
        <footer>
          <br />
          <a href="https://github.com/nottolivc/conways-game">Github</a>
          <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
            About
          </a>
        </footer>
      </div>
    </>
  );
};

export default Home;
