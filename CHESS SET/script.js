import {positionOfPieces , currPositionOfPieces, swapPieces } from "./scripts/position.js"
import {rook,knight,bishop,queen,king,pawn,moves,pawnSteps,clearMoves,getMoves,removeThreatMoves} from "./scripts/moves.js"
import {board,rows,getPiece,isCellEmpty,renderPiece} from "./scripts/utils.js"
// constants
export {identifyPiece}

// color the board
rows.forEach(row=>{
    const rowNo = parseInt(row.getAttribute('data-row'));
    if(rowNo%2==0)colorTheRow(rowNo-1,"light")
    else{
        colorTheRow(rowNo-1,"dark")
    }
})

function colorTheRow(i,color){
    for(let j=0;j<8;j++){
        rows[i].children[j].classList.add(color);
        color = swapColor(color);
    }
}

function swapColor(color){
    if(color == "light") return "dark";
    return "light";
}

// setting up the pieces on board
positionOfPieces.forEach(renderPiece)


// variables
let currPiece = null;

//EventListener for pieces
document.addEventListener('click', e => { 
    // checking for correct players turn
    // should be implemented at last to make testing while developing easy

    // to avoid this function runnning when cell has a highlight class on it
    if(e.target.matches(".highlight")) return; // it wont be needed later when we add chances 
    
    // clear previous highlights and moves
    erasePreviousMoves();
    
    //breaking the flow of function if cell is empty
    if(!e.target.matches("[data-coin-name]")) return;
    // console.log(e.target)
    currPiece = e.target;
    
    identifyPiece(currPiece);
    if(currPiece.dataset.coinName === "king") removeThreatMoves(currPiece);
    toggleHighlightMoves();
    
})

//EventListener for swaping pieces
document.addEventListener('click', e=> {
    if(!e.target.matches(".highlight")) return;
    const clickedCell = e.target;

    swapPieces(currPiece , clickedCell);
    erasePreviousMoves();
})

// event Listner for HIGLIGHTED MIVES for changing positions 

function identifyPiece(piece){
    const pieceName = piece.dataset.coinName;
    switch(pieceName){

        case "rook" : rook.moves(piece); break;
        case "knight" : knight.moves(piece); break;
        case "bishop" : bishop.moves(piece); break;
        case "king" : king.moves(piece); break;
        case "queen" : queen.moves(piece); break;
        case "pawn" : pawn.moves(piece); break;

        default : console.error("Error With Piece Name"); break;
    }
}

function toggleHighlightMoves(){
    console.log("highlighting")
    moves.forEach(move=>{
        move.classList.toggle("highlight");
    })
    pawnSteps.forEach(step => {
        step.classList.toggle("highlight");
    })
}

function erasePreviousMoves(){
    toggleHighlightMoves();
    clearMoves();// All moves includes pawnSteps
}