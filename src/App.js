import React, { useState } from "react";
import "./App.css";
const App = () => {

  //state variables
  const [sudoku, setSudoku] = useState([
    [0, 0, 0, 2, 4, 5, 6, 0, 7],
    [0, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 0, 9, 0, 0, 0, 3, 0, 8],
    [0, 0, 0, 4, 0, 0, 8, 7, 0],
    [0, 0, 0, 5, 6, 3, 0, 0, 0],
    [0, 4, 6, 0, 0, 9, 0, 0, 0],
    [5, 0, 4, 0, 0, 0, 9, 0, 0],
    [0, 8, 0, 0, 0, 0, 0, 0, 0],
    [7, 0, 2, 1, 8, 4, 0, 0, 0]
  ]);

  const[speed, setSpeed] = useState(10);
  const[id, setId] = useState(0);

  let table = [
    [0, 0, 0, 2, 4, 5, 6, 0, 7],
    [0, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 0, 9, 0, 0, 0, 3, 0, 8],
    [0, 0, 0, 4, 0, 0, 8, 7, 0],
    [0, 0, 0, 5, 6, 3, 0, 0, 0],
    [0, 4, 6, 0, 0, 9, 0, 0, 0],
    [5, 0, 4, 0, 0, 0, 9, 0, 0],
    [0, 8, 0, 0, 0, 0, 0, 0, 0],
    [7, 0, 2, 1, 8, 4, 0, 0, 0]
  ];

  let pastTables = [];
  let currentTable = 0;

  const reset = () => {
    setSudoku([
      [0, 0, 0, 2, 4, 5, 6, 0, 7],
      [0, 0, 0, 0, 0, 0, 0, 2, 0],
      [0, 0, 9, 0, 0, 0, 3, 0, 8],
      [0, 0, 0, 4, 0, 0, 8, 7, 0],
      [0, 0, 0, 5, 6, 3, 0, 0, 0],
      [0, 4, 6, 0, 0, 9, 0, 0, 0],
      [5, 0, 4, 0, 0, 0, 9, 0, 0],
      [0, 8, 0, 0, 0, 0, 0, 0, 0],
      [7, 0, 2, 1, 8, 4, 0, 0, 0]
    ]);
    pastTables = [];
    currentTable = 0;
    setId(0);
    table = [
      [0, 0, 0, 2, 4, 5, 6, 0, 7],
      [0, 0, 0, 0, 0, 0, 0, 2, 0],
      [0, 0, 9, 0, 0, 0, 3, 0, 8],
      [0, 0, 0, 4, 0, 0, 8, 7, 0],
      [0, 0, 0, 5, 6, 3, 0, 0, 0],
      [0, 4, 6, 0, 0, 9, 0, 0, 0],
      [5, 0, 4, 0, 0, 0, 9, 0, 0],
      [0, 8, 0, 0, 0, 0, 0, 0, 0],
      [7, 0, 2, 1, 8, 4, 0, 0, 0]
    ];
  };

  const containsInRow = (row, num) => {
    return table[row].includes(num);
  };

  const containsInCol = (col, num) => {
    table.forEach(row => {
      if (row[col] === num) {
        return true;
      }
    });
    return false;
  };

  const containsInBlock = (row, col, num) => {
    let r = row - (row % 3);
    let c = col - (col % 3);

    for (let i = r; i < r + 3; i++) {
      for (let j = c; j < c + 3; j++) {
        if (table[i][j] === num) {
          return true;
        }
      }
    }
    return false;
  };

  const isAllowed = (row, col, num) => {
    return !(
      containsInRow(row, num) ||
      containsInCol(col, num) ||
      containsInBlock(row, col, num)
    );
  };

  const solveSudoku = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (table[row][col] === 0) {
          for (let testNum = 1; testNum <= 9; testNum++) {
            if (isAllowed(row, col, testNum)) {
              table[row][col] = testNum;
              pastTables.push([
                [...table[0]],
                [...table[1]],
                [...table[2]],
                [...table[3]],
                [...table[4]],
                [...table[5]],
                [...table[6]],
                [...table[7]],
                [...table[8]]
              ]);
              if (solveSudoku()) {
                return true;
              } else {
                table[row][col] = 0;
                pastTables.push([
                  [...table[0]],
                  [...table[1]],
                  [...table[2]],
                  [...table[3]],
                  [...table[4]],
                  [...table[5]],
                  [...table[6]],
                  [...table[7]],
                  [...table[8]]
                ]);
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const onSolve = () => {
    if(!id){
    solveSudoku();
     let intervalId = setInterval(() => {
      setSudoku(pastTables[currentTable]);
      currentTable += 1;
      if (currentTable === pastTables.length) {
        clearInterval(intervalId);
      }
    }, speed);
    setId(intervalId);
  }
  };

  const onSpeedChange = (evt) => {
    setSpeed(evt.target.value);
  };

  const onStop = () => {
    if(id){
    clearInterval(id);
    reset();
    setId(0);
    }
  }

  return (
    <div>
      <main>
        <ul>
          {sudoku.map((row, indexOuter) =>
            row.map((val, indexInner) => (
              <li key={indexOuter + "," + indexInner}>
                <span>{val === 0 ? " " : val}</span>
              </li>
            ))
          )}
        </ul>
        <div className="note">
          Your browser doesn't support CSS Grid. You'll need{" "}
          <a href="http://gridbyexample.com/browsers/">a browser that does</a>{" "}
          to use this app.
        </div>
      </main>
      <div style={{ textAlign: "center"}}>
        <button onClick={onSolve}>Visualize!</button>
        <button onClick={onStop}>Stop!</button>
        <button onClick={reset}>Reset!</button>
        <label htmlFor="speed">Speed: {speed}ms </label>
        <input id="speed" value={speed} onChange={onSpeedChange} style={{verticalAlign: 'middle'}} type="range" min="10" max="1000"/>
        
      </div>
    </div>
  );
};

export default App;
