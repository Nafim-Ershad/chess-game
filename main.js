import './style.scss';


// IMPORTANT Consts ***
const squares = [...document.querySelectorAll('.square')]; // Convert the HTMLCollection from ".square" to Array
const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']; // FILES = Columns
const ranks = [1, 2, 3, 4, 5, 6, 7, 8]; //RANKS = Rows
const whites = [...document.querySelectorAll('.white')];
const blacks = [...document.querySelectorAll('.black')];

// PLAYER CONSTS
const player1 = {
    turn: 0,
    piece: 'white'
};
const player2 = {
    turn: 0,
    piece: 'black'
};
// VARIABLES
var turn = 0; // Who's turn it is

// FUNCTIONS
function clearMoves(moves) {
    moves.forEach(move => move.classList.remove('available_square'));
}

// ***************** loop for coloring black squares *****************
for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        let p = (2 * i) + (16 * j) + 1;
        let q = (2 * i) + (16 * j) + 10;
        let r = (2 * i) + (16 * j) + 2;
        let s = (2 * i) + (16 * j) + 9;

        // BLACK
        document.querySelector(`.square-container :nth-child(${p})`).classList.add('black_square');
        document.querySelector(`.square-container :nth-child(${q})`).classList.add('black_square');
        // WHITE
        document.querySelector(`.square-container :nth-child(${r})`).classList.add('white_square');
        document.querySelector(`.square-container :nth-child(${s})`).classList.add('white_square');
    }
}

// ***************** Assigning FILES and RANKS in the board *****************


for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        squares[(8 * i) + j].setAttribute('id', `${files[j]}${ranks[i]}`);
        // console.log(squares);
    }
}

// ***************** Clicked Color Handling *****************
var clicked = '';

squares.forEach(square => {
    square.addEventListener('click', function() {
        const innerHTML = [...square.children];
        // This is for when there is sprite on the square <div> 
        // the click will register 
        if (innerHTML.length) {
            if (clicked) {
                // To remove style from the previous clicked element
                // before it is changed again 
                clicked.removeAttribute('style');
            }
            // Sets the required 
            clicked = square;
            // Sets only when there is element in the clicked variable
            clicked.style.backgroundColor = '#bacb33';
        }

        // console.log(square.getAttribute('id'));
    })
});

// ***************** Position Handling *****************

// Function to generate availability of movement
var move = [];

// WHITE PIECES
whites.forEach(piece => {
    piece.addEventListener('click', () => {
        // Clears the 'move' array
        if (move.length) {
            move.forEach(el => el.classList.remove('available_square'));
            move = [];
        }
        // PAWN movement
        switch (piece.classList[0]) {
            case 'pawn':

                const currentPos = piece.parentNode.getAttribute('id').split("");

                // Get the predicted available squares
                move.push(document.querySelector(`#${currentPos[0]}${Number(currentPos[1])-1}`));
                move.push(document.querySelector(`#${currentPos[0]}${Number(currentPos[1])-2}`));

                // Loop for getting click event
                move.forEach(el => {
                    el.classList.add('available_square')
                    el.addEventListener('click', () => {
                        el.appendChild(piece);
                        turn++;
                        console.log(turn);
                    });
                });
        }
    });
});

// BLACK PIECES
blacks.forEach(piece => {
    piece.addEventListener('click', () => {
        // Clears the 'move' array
        if (move.length) {
            move.forEach(el => el.classList.remove('available_square'));
            move = [];
        }
        // PAWN movement
        switch (piece.classList[0]) {
            case 'pawn':

                const currentPos = piece.parentNode.getAttribute('id').split("");

                move.push(document.querySelector(`#${currentPos[0]}${Number(currentPos[1])+1}`));
                move.push(document.querySelector(`#${currentPos[0]}${Number(currentPos[1])+2}`));

                // Loop for getting click event
                move.forEach(el => {
                    el.classList.add('available_square');
                    el.addEventListener('click', () => {
                        el.appendChild(piece);
                        turn++;
                        console.log(turn);
                    });
                });
        }
    });
});