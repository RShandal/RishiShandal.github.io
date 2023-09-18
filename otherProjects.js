/*Curent date and time
updateTime();
setInterval(updateTime, 1000);

function updateTime(){
    let date = new Date();
    date = date.toLocaleString();
    currentDateTime.innerHTML = `Today is:  ${date}`;
}*/

/*Last Updated
const lastUpdate = document.querySelector("#lastUpdate");
if (Date.parse(document.lastModified) != 0){
    lastUpdate.textContent = `(Last updated:  ${document.lastModified})`;
}*/

//Stopwatch
const timeDisplay = document.querySelector("#timeDisplay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hours = 0;
let min = 0;
let sec = 0;

startBtn.addEventListener("click", () => {
    if(paused){
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 1000);
    }
});
pauseBtn.addEventListener("click", () => {
    if(!paused){
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
});
resetBtn.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    hours = 0;
    min = 0;
    sec = 0;
    timeDisplay.textContent = "00:00:00";
});

function updateTime(){
    elapsedTime = Date.now() - startTime;

    sec = Math.floor((elapsedTime / 1000) % 60);
    min = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

    sec = pad(sec);
    min = pad(min);
    hours = pad(hours);

    timeDisplay.textContent = `${hours}:${min}:${sec}`;

    function pad(unit){
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }
}

//Rock, Paper, Scissors
const playerText = document.querySelector("#playerText");
const computerText = document.querySelector("#computerText");
const resultText = document.querySelector("#resultText");
const choiceBtns = document.querySelectorAll(".choiceBtn");
const gamesWonText = document.querySelector("#gamesWon");

let player;
let computer;
let result;
let gamesWon = 0;

choiceBtns.forEach(button => button.addEventListener("click", () => {

    player = button.textContent;
    computerTurn();
    playerText.textContent = `You: ${player}`;
    computerText.textContent = `Computer: ${computer}`;
    resultText.textContent = checkWinner();
    if(resultText.textContent == "Winner!"){
        gamesWon++;
    }
    gamesWonText.textContent = `Amount of games won: ${gamesWon}`;
}));

function computerTurn(){
    const randNum = Math.floor(Math.random() * 3) + 1;

    switch(randNum){
        case 1:
            computer = "Rock";
            break;
        case 2:
            computer = "Paper";
            break;
        case 3:
            computer = "Scissors";
            break;
    }
}

function checkWinner(){
    if(player == computer){
        return "Draw!";
    }
    else if(computer == "Rock"){
        return (player == "Paper") ? "Winner!" : "You Lose!";
    }
    else if(computer == "Paper"){
        return (player == "Scissors") ? "Winner!" : "You Lose!";
    }
    else if(computer == "Scissors"){
        return (player == "Rock") ? "Winner!" : "You Lose!";
    }
}

//Tic Tac Toe - Learned from Bro Code tutorial
const grid = document.querySelectorAll(".grid");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    running = true;
    grid.forEach(grid => grid.addEventListener("click", gridClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
}
function gridClicked(){
    const gridIndex = this.getAttribute("gridIndex");

    if(options[gridIndex] != "" || !running){
        return;
    }

    updateGrid(this, gridIndex);
    checkWin();
}
function updateGrid(grid, index){
    options[index] = currentPlayer;
    grid.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWin(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const gridA = options[condition[0]];
        const gridB = options[condition[1]];
        const gridC = options[condition[2]];

        if(gridA == "" || gridB == "" || gridC == ""){
            continue;
        }
        if(gridA == gridB && gridB == gridC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} won!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
    }
    else{
        changePlayer();
    }
}
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    grid.forEach(grid => grid.textContent = "");
    running = true;   
}

//Snake Game
const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetSnakeGame = document.querySelector("#resetSnakeGame");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 15;
let sgRunning = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];

window.addEventListener("keydown", changeDirection);

resetSnakeGame.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    sgRunning = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(sgRunning){
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 120);
    }
    else {
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) *unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};
function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};
    snake.unshift(head);
    if(snake[0].x == foodX && snake[0].y == foodY){
        score++;
        scoreText.textContent = score;
        createFood();
    }
    else{
        snake.pop();
    }
};
function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
function changeDirection(){
    const keyPressed = event.keyCode;
    //w,a,s,d keys
    const left = 65; 
    const right = 68;
    const down = 83;
    const up = 87;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);
    const goingRight = (xVelocity == unitSize);

    switch(true){
        case(keyPressed == left && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == up && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keyPressed == right && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == down && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
};
function checkGameOver(){
    switch(true){
        case(snake[0].x < 0):
            sgRunning = false;
            break;
        case(snake[0].x >= gameWidth):
            sgRunning = false;
            break;
        case(snake[0].y < 0):
            sgRunning = false;
            break;
        case(snake[0].y >= gameHeight):
            sgRunning = false;
            break; 
    }
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            sgRunning = false;
        }
    }
};
function displayGameOver(){
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(`GAME OVER! Final score: ${score}`, gameWidth / 2, gameHeight / 2);
    sgRunning = false;
};
function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    gameStart();
};

