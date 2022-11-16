import {board,rows,getPiece,getPieceData, isCellEmpty,getOpponentColor} from "./utils.js";
import {identifyPiece} from "../script.js"
import { swapPieces } from "./position.js";
const rook = {};
const knight = {};
const bishop = {};
const queen = {};
const pawn = {};
const king = {};

// array to store moves
let moves = [];
let pawnSteps = []; // pawnSteps will contain straight moves wich are not applicable for elimination
let tempKingMoves = [];


rook.moves = function(piece){
    // clearMoves();
    const cellData = getPieceData(piece);
    const row = parseInt(cellData.position.row);
    const column = parseInt(cellData.position.column);
    const color = cellData.color;
    
    let i = null;  

    i=column+1;
    while(i<=8){
        const cell = getPiece(row,i);
        if(!isCellValid(cell,color)) break;
        moves.push(cell);
        i++;
    }

    i=column-1;
    while(i>0){
        const cell = getPiece(row,i);
        if(!isCellValid(cell,color)) break;
        moves.push(cell);
        i--;
    }

    i=row+1;
    while(i<=8){
        const cell = getPiece(i,column);
        if(!isCellValid(cell,color)) break;
        moves.push(cell);
        i++;
    }

    i=row-1;
    while(i>0){
        const cell = getPiece(i,column);
        if(!isCellValid(cell,color)) break;
        moves.push(cell);
        i--;
    }

    // console.log(moves)
}

knight.moves = function(piece){
    const pieceData = getPieceData(piece); 
    let row = parseInt(pieceData.position.row) ;
    let col = parseInt(pieceData.position.column) ;
    let cell;

    if(row>1){ // row>1
        if(col>2) {// col>2
            cell = getPiece(row-1,col-2)
            if(isCellValid(cell))
            moves.push(cell);
        }
        if(col<7){ //col<7
            cell = getPiece(row-1,col+2)
            if(isCellValid(cell))
            moves.push(cell);
        }
    }

    if(row < 8){ //row<8
        if(col>2){ // col>2
            cell = getPiece(row+1,col-2);
            if(isCellValid(cell))
            moves.push(cell);
        }

        if(col<7){ //col<7
            cell = getPiece(row+1,col+2);
            if(isCellValid(cell))
            moves.push(cell);
        }
    }

    if(row>2){

        if(col>1){
            cell = getPiece(row-2,col-1)
            if(isCellValid(cell))
            moves.push(cell);
        }

        if(col<8){
            cell = getPiece(row-2,col+1);
            if(isCellValid(cell))
            moves.push(cell);
        }

    }

    if(row < 7){
        if(col>1){
            cell =getPiece(row+2,col-1)
            if(isCellValid(cell))
            moves.push(cell);
        }

        if(col<8){
            cell = getPiece(row+2 , col+1)
            if(isCellValid(cell))
            moves.push(cell);
        }
    }


    function isCellValid(cell){
        return cell.getAttribute("data-coin-color") !== pieceData.color;
    }
}

bishop.moves = function(piece){
    const pieceData = getPieceData(piece);
    console.log(pieceData);
    const pieceColor = pieceData.color;
    let row,col,cell;
    
    // upper Right Diaagonal
    row = parseInt(pieceData.position.row)-1;
    col = parseInt(pieceData.position.column)+1;

    while(row>=1 && col<=8){
        cell = getPiece(row,col)

        if(!isCellValid(cell)) break;
        moves.push(cell)

        row--;
        col++;
    }

    // upper Left diagonal
    row = parseInt(pieceData.position.row)-1;
    col = parseInt(pieceData.position.column)-1;

    while(row>=1 && col>=1){
        cell = getPiece(row,col)

        if(!isCellValid(cell)) break;
        moves.push(cell)

        row--;
        col--;
    }

    
    // lower righth diagonal
    row = parseInt(pieceData.position.row)+1;
    col = parseInt(pieceData.position.column)+1;

    while(row<=8 && col<=8){
        cell = getPiece(row,col)

        if(!isCellValid(cell)) break;
        moves.push(cell)

        row++;
        col++;
    }


    // lower left diagonal
    row = parseInt(pieceData.position.row)+1;
    col = parseInt(pieceData.position.column)-1;

    while(row<=8 && col>=1){
        cell = getPiece(row,col)

        if(!isCellValid(cell)) break;
        moves.push(cell)

        row++;
        col--;
    }

    //
    function isCellValid(cell){
        console.log(cell)
        const cellColor = cell.getAttribute("data-coin-color");
        if(cellColor == null) return true;
        if(cellColor != pieceColor) moves.push(cell);
        return false;
    }

}

queen.moves = function(piece){
    rook.moves(piece);
    bishop.moves(piece);

}

pawn.moves = function(piece){
    const pieceData = getPieceData(piece);
    const row = parseInt(pieceData.position.row);
    const col = parseInt(pieceData.position.column);
    const pieceColor = pieceData.color;
    let cell;

    if(pieceColor === "black"){
        // next row Same Column
        cell = getPiece(row+1,col)
        if(isCellEmpty(cell))
        pawnSteps.push(cell);
                    
        //first move has  possiblity row+2
        if(row === 2){
            if(isCellEmpty(getPiece(row+1,col)) && isCellEmpty(getPiece(row+2,col)))
            pawnSteps.push(getPiece(row+2,col));
        }

        if(col<8){
            cell = getPiece(row+1,col+1)
            if(isCellValid(cell))
            moves.push(cell);
        }

        if(col>1){
            cell = getPiece(row+1,col-1);
            if(isCellValid(cell))
            moves.push(cell);
        }
    }

    if(pieceColor === "white"){
        cell = getPiece(row-1,col)
        if(isCellEmpty(cell))
        pawnSteps.push(cell);
                    
        //first move has  possiblity row+2
        if(row === 7){
            // console.log(getPiece(6,col))
            // console.log(getPiece(5,col))
            if(isCellEmpty(getPiece(6,col)) && isCellEmpty(getPiece(5,col)))
            pawnSteps.push(getPiece(5,col));
        }

        if(col<8){
            cell = getPiece(row-1,col+1)
            if(isCellValid(cell))
            moves.push(cell);
        }

        if(col>1){
            cell = getPiece(row-1,col-1);
            if(isCellValid(cell))
            moves.push(cell);
        }
    }

    checkForPromotion(piece);

    function checkForPromotion(piece){
        getPieceData(piece);
        if(pieceData.position.row == 1){
            // popup promotion box div for white pieces
        }
        else if(pieceData.position.row == 8){
            // popup promotion box div for black pieces
        }

        // let the player select the promotion piece and 
        // make changes in eliminatedPiece array and currentPosition array
        // render the changes or whole
    }

    function isCellValid(cell){
        return cell.getAttribute("data-coin-color") === getOpponentColor(pieceColor);
    }
}

// The kings way 
king.moves = function(piece){
    // first lets find all the simple moves and store it ino the temprory array 
    // we will remove checks and other moves from it 
    
    // Remarks//
    //2 kings never comes side by side  (it puts both king in check)
    //IF moves array has king in it then king is checked
    // king should not move to possible checked cells
    // king must move if it is checked 
    // if king is checked and has nowhere to go "THE GAME OVER" -- CHECKMATE

    const pieceData = getPieceData(piece);
    const pieceColor = pieceData.color;
    const row = parseInt(pieceData.position.row);
    const col = parseInt(pieceData.position.column);

    let r=null,c=null,count = 0,cell=null;
    r=row-1;
    c=col-1;
    while(count<3){
        console.log({r,c})
        if(!validRowCol(r,c)){
            c++;
            count++;
            continue;
        }
        cell = getPiece(r,c);
        if(isCellValid(cell)){
            tempKingMoves.push(cell);
        }
        count++;
        c++;
    }

    r=row;
    c=col-1;
    count=0;
    while(count<3){
        console.log({r,c})
        if(!validRowCol(r,c)){
            c++;
            count++;
            continue;
        }
        cell = getPiece(r,c);
        if(isCellValid(cell)){
            tempKingMoves.push(cell);
        }
        count++;
        c++;
    }

    r=row+1;
    c=col-1;
    count=0;
    while(count<3){
        console.log({r,c})
        if(!validRowCol(r,c)){
            c++;
            count++;
            continue;
        }
        cell = getPiece(r,c);
        if(isCellValid(cell)){
            tempKingMoves.push(cell);
        }
        count++;
        c++;
    }

    console.log(tempKingMoves);
    moves = [...tempKingMoves]

    // we need to remove checked possiblie moves


    function isCellValid(cell){
        if(cell.getAttribute("data-coin-color") == pieceData.color)
        return false;
        return true;
    }

    function validRowCol(row,col){
        return (row<=8 && row>=1 && col>=1 && col<=8)
    }
    
}
// Helper Functions


function removeThreatMoves(piece){
    // const pieceData = getPieceData(piece);
    // const opponentColor = getOpponentColor(pieceData.color);
    // const opponentPieces = document.querySelectorAll(`[data-coin-color = ${opponentColor}]`);
    // const opponentPawns = document.querySelectorAll(`[data-coin-name = ${"pawn"}][data-coin-color = ${opponentColor}]`);
    // console.log(opponentPieces);

    // opponentPieces.forEach(piece => {
    //     // if(piece.dataset.coinName != king )
    //     identifyPiece(piece);
    // });
    // opponentPawns.forEach(findPawnThreats); // killing when king tries to go to 1.5th step
    // let threatCells = [...moves];
    // console.log(threatCells)
    // clearMoves();

    // moves = tempKingMoves.filter(cell=> {
    //     return !(threatCells.includes(cell))
    // })

    // console.log(moves)

}

function findPawnThreats(pawn){
    const pawnData = getPieceData(pawn);
    const row = parseInt(pawnData.position.row);
    const col = parseInt(pawnData.position.column);
    const pawnColor = pawnData.color;
    let cell = null;

    if(pawnColor === "white"){
        if(col>1 && row>1){
            cell = getPiece(row-1,col-1);
            if(isCellValid(cell))
            moves.push(cell);
        }

        if(col<8 && row<8){
            cell = getPiece(row-1,col+1);
            if(isCellValid(cell))
            moves.push(cell);
        }
    }
    else{
        if(row<8 && col>1){
            cell = getPiece(row+1,col-1);
            if(isCellValid(cell))
            moves.push(cell);
        }

        if(row<8 && col<8){
            cell = getPiece(row+1,col+1);
            if(isCellValid(cell))
            moves.push(cell);
        }
    }

    function isCellValid(cell){
        const cellColor = cell.getAttribute("data-coin-color");
        if( cellColor == null || cellColor == pawnColor) return true;
        return false;
    }
}


function isCellValid(cell,pieceColor){
    const cellColor = cell.getAttribute("data-coin-color");
    if(cellColor == null) 
    return true;

    if(cellColor != pieceColor)     
    moves.push(cell);
    
    return false;
}

function clearMoves(){
    moves = [];
    pawnSteps = [];
}

function getMoves(){
    console.log(moves);
}


export {rook,knight,bishop,queen,king,pawn,moves,pawnSteps,clearMoves,getMoves,removeThreatMoves};
