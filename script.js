let playerO = prompt('Enter first player name:', 'Shradha');
let playerX = prompt('Enter second player name:', 'Aman');
let game = document.querySelector('.game');
let startPlaying = document.querySelector('#start-playing');

startPlaying.addEventListener('click', () => {
    game.style.display = 'grid';
    startPlaying.style.display = 'none';
})


let boxes = document.querySelectorAll(".boxes");
let turnO = true;

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        switchTurn(box);
        getWinner();
    })
})

let newGameBtn = document.getElementById('new-game');
let msg = document.getElementById('msg');

newGameBtn.addEventListener('click', () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = '';
    }
    msg.innerText = '';
    turnO = true;
    newGameBtn.style.display = 'none';
})

const switchTurn = (box) => {
    if(box.innerText === '') {
        if (turnO) {
            box.innerText = 'O';
            turnO = false;
        } else {
            box.innerText = 'X';
            turnO = true;
        }
    }
}

const getWinner = () => {
    // Checking who is the winner
    let winningPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let pattern of winningPatterns) {
        let position1 = boxes[pattern[0]].innerText;
        let position2 = boxes[pattern[1]].innerText;
        let position3 = boxes[pattern[2]].innerText;
        if (position1 !== '' && position2 !== '' && position3 !== '' && position1 === position2 && position1 === position3) {
            for (let box of boxes) {
                box.disabled = true;
            }
            msg.innerText = position1 === 'O' ? `Congratulations, ${playerO}! You are the winner.` : `Congratulations, ${playerX}! You are the winner.`;
        }
    }
    // Checking if the game is draw
    let emptyBox = 0;
    for (let allBox of boxes) {
        if (allBox.innerText === '') {
            emptyBox++;
        }
    }
    if (emptyBox === 0) {
        msg.innerText = 'Sorry, the game is draw!';         
    }
    newGameBtn.style.display = 'inline-block';
}
