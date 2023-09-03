/*Curent date and time
updateTime();
setInterval(updateTime, 1000);

function updateTime(){
    let date = new Date();
    date = date.toLocaleString();
    currentDateTime.innerHTML = `Today is:  ${date}`;
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