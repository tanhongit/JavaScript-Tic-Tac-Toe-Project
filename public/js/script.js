
var origBoard;
const oPlayer = 'O';
const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
    document.querySelector(".endgame").style.display = "none";
    origBoard = Array.from(Array(9).keys());
    console.log(origBoard);
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = ''; //clear
        cells[i].style.removeProperty('background-color');
        //add a event process vào click mouse event
        cells[i].addEventListener('click', turnClick, false);
    }
}


function turnClick(square) {
    // // write down the ID of any cell clicked
    console.log(square.target.id)

    // pass in the ID that clicking 
    turn(square.target.id, oPlayer)
}

function turn(squareId, objectPlayer) {
    origBoard[squareId] = objectPlayer; //shows the player who has clicked the cell
    document.getElementById(squareId).innerText = objectPlayer; //put more string in the cell with the ID just called
}