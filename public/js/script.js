
var origBoard;
const oPlayer = 'O';
const winCombos = [
    //horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //slant
    [0, 4, 8],
    [6, 4, 2]
]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
    document.querySelector(".endgame").style.display = "none";
    origBoard = Array.from(Array(9).keys());
    // console.log(origBoard);
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = ''; //clear
        cells[i].style.removeProperty('background-color');
        //add a event process vào click mouse event
        cells[i].addEventListener('click', turnClick, false);
    }
}


function turnClick(square) {
    // // write down the ID of any cell clicked
    // console.log(square.target.id)

    // pass in the ID that clicking 
    turn(square.target.id, oPlayer)
}

function turn(squareId, objectPlayer) {
    origBoard[squareId] = objectPlayer; //shows the player who has clicked the cell
    document.getElementById(squareId).innerText = objectPlayer; //put more string in the cell with the ID just called

    let gameWon = checkWin(origBoard, objectPlayer) //check win
    if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []); /* Use the minify method which will go through every element in the board array. And the concat function will not change the current array, but it will return a new array that will contain the values of the arrays passed in.
    // a is the final value to be returned
    // e is the element in the board array we are running through and indexing*/
    let gameWon = null;
    for (let [index, win] of winCombos.entries())
    /* entries: Returns the enumerable property array of [key, value] pairs with the given object, similar to using the for ... in iteration. */ {
        if (win.every(elem => plays.indexOf(elem) > -1))  
        //In essence the every function has the same effect as using a loop to loop through all elements of the array. 
        //The indexOf function will look for an element in the array based on the value of the element, it returns the position (key) of the element if found, and -1 if it is not found.
        {
            //if the player satisfies any array of values in winCombos
            gameWon = { index: index, player: player };
            break;
        }
    }
    return gameWon;
}

//create highlights all cells that make up a victory and prevents the user from entering any more boxes
function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == oPlayer ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
}
