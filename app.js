
const newGameButton = document.querySelector(".game-table .buttons-area .new-game");
const rollDiceButton = document.querySelector(".game-table .buttons-area .roll-dice");
const holdButton = document.querySelector(".game-table .buttons-area .hold");

const diceImage = document.querySelector(".game-table .buttons-area .dice");


class Player {

    constructor(id, hasFocus, uiSection) {
        this.id = id;
        this.currentScore = 0;
        this.totalScore = 0;
        this.hasFocus = hasFocus;
        this.uiSection = document.querySelector(uiSection);
        this.uiCurrentScore = document.querySelector(`${uiSection} .current-score`);
        this.uiTotalScore = document.querySelector(`${uiSection} .total-score`);
    }
    
    _syncUI() {
        this.uiCurrentScore.textContent = this.currentScore;
        this.uiTotalScore.textContent = this.totalScore;
        if (this.hasFocus) {
            this.uiSection.classList.add("focused");
        } else {
            this.uiSection.classList.remove("focused");
        }
    }
    
    resetCurrentScore() {
        this.currentScore = 0;
        this._syncUI();
    }

    increaseCurrentScore(value) {
        this.currentScore += value;
        this._syncUI();
    }
    
    updateTotalScore() {
        this.totalScore += this.currentScore;
        this._syncUI();
    }
    
    setFocus(hasFocus) {
        this.hasFocus = hasFocus;
        this._syncUI();
    }
    
    reset() {
        this.currentScore = 0;
        this.totalScore = 0;
        this.hasFocus = false;
        this._syncUI();
    }

}


const player1 = new Player(1, true, ".game-table .player1")
const player2 = new Player(2, false, ".game-table .player2")

let currentPlayer = player1;

const dices = [
    {
        imagePath: "./Dice Images/dice-one.png",
        value: 1
    },
    {
        imagePath: "./Dice Images/dice-two.png",
        value: 2
    },
    {
        imagePath: "./Dice Images/dice-three.png",
        value: 3
    },
    {
        imagePath: "./Dice Images/dice-four.png",
        value: 4
    },
    {
        imagePath: "./Dice Images/dice-five.png",
        value: 5
    },
    {
        imagePath: "./Dice Images/dice-six.png",
        value: 6
    },
]

rollDiceButton.addEventListener('click', () => {
    const dice = dices[Math.floor(Math.random() * dices.length )];
    diceImage.src = dice.imagePath;
    if (dice.value === 1) {
        currentPlayer.resetCurrentScore();
        switchPlayer();
    } else {
        currentPlayer.increaseCurrentScore(dice.value);
    }
})


holdButton.addEventListener('click', () => {
    currentPlayer.updateTotalScore();
    currentPlayer.resetCurrentScore();
    switchPlayer();
})

newGameButton.addEventListener('click', () => {
    player1.reset();
    player2.reset();
    currentPlayer = player1;
    currentPlayer.setFocus(true);
    diceImage.src = dices[0].imagePath;
})


const switchPlayer = () => {
    currentPlayer.setFocus(false);
    if (currentPlayer === player1) {
        currentPlayer = player2;
    } else {
        currentPlayer = player1;
    }
    currentPlayer.setFocus(true);
}