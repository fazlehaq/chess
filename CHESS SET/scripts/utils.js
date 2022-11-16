
const board = document.querySelector('.board');
const rows = document.querySelectorAll('.row');

function getPiece(row,column){
    return rows[row-1].children[column-1];
}

function isCellEmpty(cell){
    // return !cell.hasAttribute("data-coin-name");
    return !(cell.hasAttribute("data-coin-name"));
}

function getPieceData(piece){
    return {
        color : piece.dataset.coinColor,
        name : piece.dataset.coinName,
        position :{
            row : piece.parentElement.getAttribute("data-row"),
            column : piece.getAttribute("data-column")
        }
    }
}

function renderPiece(piece){
    const position = piece.position
    const currPiece = getPiece(position.row,position.column)
    currPiece.setAttribute("data-coin-name",piece.name)
    currPiece.setAttribute("data-coin-color",piece.color)
}

function getOpponentColor(color){
    if(color === "white") return "black";
    return "white";
}


export {board , rows , getPiece , isCellEmpty, getPieceData , renderPiece,getOpponentColor};
