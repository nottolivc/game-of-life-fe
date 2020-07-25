This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Current deployment on netlify: (https://zealous-murdock-8481c3.netlify.app/)

## Cellular Automata and Conway's "Game of Life"

Welcome to John Conway's "Game of Life"! This is a computer science classic from 1970, a program that simulates a cellular automaton (plural automata). It has connections to all kinds of different aspects of computer science and nature.

## Rules

The Rules:
For a space that is 'populated':
Each cell with one or no neighbors dies, as if by solitude.
Each cell with four or more neighbors dies, as if by overpopulation.
Each cell with two or three neighbors survives.
For a space that is 'empty' or 'unpopulated'
Each cell with three neighbors becomes populated.

## The basis for the Algortithm for the game of life:

`in javascript`

```
// There are eight possible neighbors for a "cell". The above mentioned rules apply as so:
[
 [-1,-1],
 [-1,0],
 [-1,1],
 [0,-1],
 [0,0],
 [0,1],
 [1,-1],
 [1,0],
 [1,1]
]
// Once we have written the possibilities in to an array, we can use a double for loop to
// iterate through possibilities or directions a cell can move on a grid of a given size, 25x25 cells.

// Start loops

for(let i = 0; i < rows; i++){
// Nested loop to traverse both axis of the cells
      for(let j = 0; j < cols; j++){
        let neighbors = 0;
            directions.forEach(([x,y])=> {
            const nextI = i + x;
            const nextJ = j + y;
        if(nextI >= 0 && nextI<rows && nextJ >= 0 && nextJ < cols){
            neighbors += grid[nextI][nextJ]
          }
        });
        if (neighbors < 2 || neighbors > 3){
          temporaryGrid[i][j] =  0;
        } else if (grid[i][j] === 0 && neighbors === 3) {
          temporaryGrid[i][j] = 1;
        }
      };
    }
// Note that we are using a temporary grid here, and a new one
// can be created to run the process again.
```

## Available Scripts

In the project client directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
