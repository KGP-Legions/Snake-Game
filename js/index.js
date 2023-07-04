//Game Constants & Variables
let inputDir = {x:0 , y:0};
const moveSound = new Audio('Piano\ Click.mp3');
const foodSound = new Audio('notification.mp3');
const gameOverSound = new Audio('Game\ Over.mp3');
const musicSound = new Audio('bgm.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{x:13, y:15}];
food = {x:11, y:9};

//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function collide(snake){
    //snake bump into itself
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
        
    }

    //snake bump into the wall
    if(snake[0].x>18 || snake[0].x<=0 || snake[0].y>18 || snake[0].y<=0){
        return true;
    }
}

function gameEngine(){
    //Part1: Update the snake array & food
    if(collide(snakeArr)){
        gameOverSound.play();
        //musicSound.pause();
        inputDir = {x:0 , y:0};
        alert("Game Over! Press enter to play again.");
        snakeArr = [{x:13, y:15}];
        //musicSound.play();
        score = 0;
        speed = 5;
    }

    //if snake has eaten the food, increment score & generate new food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score > highscoreval){
            highscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highScoreBox.innerHTML = "Highest Score: " + highscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()) , y: Math.round(a + (b-a)*Math.random())};
        if(score%3 === 0){
            speed += 1;
        }
    }

    //moving the snake
    for (let i = snakeArr.length - 2; i >=0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
        
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Part2: Display the snake & food
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}




//Game Logic
let highscore = localStorage.getItem("highscore");
if(highscore === null){
    highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval));
}
else{
    highscoreval = JSON.parse(highscore);
    highScoreBox.innerHTML = "Highest Score: " + highscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = {x:0 , y:1}; //Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp": 
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})
