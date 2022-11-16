import { board, getPieceData , isCellEmpty, renderPiece, rows } from "./utils.js";
export {positionOfPieces , currPositionOfPieces , swapPieces};

const positionOfPieces = [
    {   
        color : "black",
        name : "rook",
        position : {
            row : "1",
            column : "1"
        }
    },

    
    {
        color : "black",
        name : "knight",
        position : {
            row : "1",
            column : "2"
        }
    },


    {
        color : "black",
        name : "bishop",
        position : {
            row : "1",
            column : "3"
        }
    },


    {
        color : "black",
        name : "queen",
        position : {
            row : "1",
            column : "4"
        }
    },


    {
        color : "black",
        name : "king",
        position : {
            row : "4",
            column : "3"
        }
    },



    {
        color : "black",
        name : "bishop",
        position : {
            row : "1",
            column : "6"
        }
    },


    {
        color : "black",
        name : "knight",
        position : {
            row : "1",
            column : "7"
        }
    },


    {
        color : "black",
        name : "rook",
        position : {
            row : "1",
            column : "8"
        }
    },

    
    {
        color : "white",
        name : "rook",
        position : {
            row : "8",
            column : "1"
        }
    },

    
    {
        color : "white",
        name : "knight",
        position : {
            row : "8",
            column : "2"
        }
    },


    {
        color : "white",
        name : "bishop",
        position : {
            row : "8",
            column : "3"
        }
    },
    
    
    {
        color : "white",
        name : "queen",
        position : {
            row : "8",
            column : "5"
        }
    },
    
    
    {
        color : "white",
        name : "king",
        position : {
            row : "8",
            column : "4"
        }
    },
    
    
    {
        color : "white",
        name : "bishop",
        position : {
            row : "8",
            column : "6"
        }
    },
    
    
    {
        color : "white",
        name : "knight",
        position : {
            row : "8",
            column : "7"
        }
    },
    
    
    {
        color : "white",
        name : "rook",
        position : {
            row : "8",
            column : "8"
        }
    },


    {
        color : "black",
        name : "pawn",
        position : {
            row : "2",
            column : "1"
        }
    },


    {
        color : "black",
        name : "pawn",
        position : {
            row : "2",
            column : "2"
        }
    },


    {
        color : "black",
        name : "pawn",
        position : {
            row : "2",
            column : "3"
        }
    },


    {
        color : "black",
        name : "pawn",
        position : {
            row : "2",
            column : "4"
        }
    },


    {
        color : "black",
        name : "pawn",
        position : {
            row : "2",
            column : "5"
        }
    },


    {
        color : "black",
        name : "pawn",
        position : {
            row : "2",
            column : "6"
        }
    },


    {
        color : "black",
        name : "pawn",
        position : {
            row : "2",
            column : "7"
        }
    },

    {
        color : "black",
        name : "pawn",
        position : {
            row : "2",
            column : "8"
        }
    },

    
    {
        color : "white",
        name : "pawn",
        position : {
            row : "7",
            column : "1"
        }
    },

    
    {
        color : "white",
        name : "pawn",
        position : {
            row : "7",
            column : "2"
        }
    },


    {
        color : "white",
        name : "pawn",
        position : {
            row : "7",
            column : "3"
        }
    },


    {
        color : "white",
        name : "pawn",
        position : {
            row : "7",
            column : "4"
        }
    },


    {
        color : "white",
        name : "pawn",
        position : {
            row : "7",
            column : "5"
        }
    },


    {
        color : "white",
        name : "pawn",
        position : {
            row : "7",
            column : "6"
        }
    },


    {
        color : "white",
        name : "pawn",
        position : {
            row : "7",
            column : "7"
        }
    },


    {
        color : "white",
        name : "pawn",
        position : {
            row : "7",
            column : "8"
        }
    },
]



let eliminatedPieces = []; // we have eliminated pieces here for promotion at later stages of developement

const currPositionOfPieces = JSON.parse(JSON.stringify(positionOfPieces));


function removePiece(position){
    const cell = rows[position.row-1].children[position.column-1];
    cell.removeAttribute("data-coin-name");
    cell.removeAttribute("data-coin-color");
}


// accepts piece data and returns the index of piece in currPosition array
function findIndexOfPiece(piece){
    for( let i=0 ; i<currPositionOfPieces.length; i++){
        if(piece.position.column === currPositionOfPieces[i].position.column && 
            piece.position.row === currPositionOfPieces[i].position.row)
        return i;

    }
    return null
}


function swapPieces(currPiece , clickedCell){
    // find currPiece in currentPositionofPieces 
    // chnage its position object from clickedCellData
    const currentPieceData = getPieceData(currPiece);
    const clickedCellData = getPieceData(clickedCell);

    
    if(clickedCellData.name != null){
        const indexOfClickedPiece = findIndexOfPiece(clickedCellData);
        eliminatedPieces.push(currPositionOfPieces[indexOfClickedPiece]);
        currPositionOfPieces.splice(indexOfClickedPiece,1);
    }
    const indexOfCurrentPiece = findIndexOfPiece(currentPieceData);
    currPositionOfPieces[indexOfCurrentPiece].position.column = clickedCellData.position.column;
    currPositionOfPieces[indexOfCurrentPiece].position.row = clickedCellData.position.row;

    removeAttributes(currPiece);
    removeAttributes(clickedCell);
    
    renderPiece(currPositionOfPieces[indexOfCurrentPiece])
    console.log(currPositionOfPieces)
}

function removeAttributes(cell){
    cell.removeAttribute("data-coin-name");
    cell.removeAttribute("data-coin-color");
}