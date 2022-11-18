import './style.scss';


// IMPORTANT Consts ***
const squares = [...document.querySelectorAll('.square')]; // Convert the HTMLCollection from ".square" to Array

// ***************** loop for coloring black squares *****************
for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        let p = (2 * i) + (16 * j) + 1;
        let q = (2 * i) + (16 * j) + 10;
        let r = (2 * i) + (16 * j) + 2;
        let s = (2 * i) + (16 * j) + 9;

        // BLACK
        document.querySelector(`.square-container :nth-child(${p})`).classList.add('black');
        document.querySelector(`.square-container :nth-child(${q})`).classList.add('black');
        // WHITE
        document.querySelector(`.square-container :nth-child(${r})`).classList.add('white');
        document.querySelector(`.square-container :nth-child(${s})`).classList.add('white');
    }
}

// ***************** Assigning FILES and RANKS in the board *****************
// FILES = Columns; RANKS = Rows
const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

for (let i = 0; i < 64; i++) {
    squares[i].setAttribute('id', `${files[i%8]}${Math.floor(i/8)+1}`);
    // console.log(squares);
}

// ***************** Click Handling *****************
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
    })
})