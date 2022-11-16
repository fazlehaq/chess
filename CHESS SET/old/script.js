const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const rows = document.querySelectorAll('.row');
const playersChanceElement = document.querySelector('.players-chance');

let eliminatedPeices = [];
let currCoin = null; // becoz we couldnot send currCoin via function becoz we aer using it in evenelistners

const player1 = "white";
const player2 = "black";

// let checkedKing = "";


// setting up boards 
rows.forEach(row=>{
    const rowNo = parseInt(row.getAttribute('data-row'));
    if(rowNo%2==0){
        colorTheRow(rowNo-1,"light")
    }
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

board.classList.add(player1)
playersChanceElement.innerText=`${player1}'s chance`
// board is setup 

cells.forEach(cell=>{
    cell.addEventListener('click',function(e){
        if(!cell.hasAttribute("data-coin-color"))
        return;
        if(cell.classList.contains("highlight"))
        return;
        if(cell.getAttribute("data-coin-color") !== getCurrPlayer()) return;
        clearPreviousHighlights();
        fun1(cell);

        if(cell.getAttribute("data-coin") == "king") removePossibleChecks(cell);
        highlightMoves(cell);
        
        addEventListenerToMoves(cell);
    })
})


function swapPlayer(){
    console.log("swap playr");
    board.classList.toggle(player1);
    board.classList.toggle(player2);
    playersChanceElement.innerText=`${getCurrPlayer()}'s chance`;
}

function getCurrPlayer(){
    if(board.classList.contains("white")) return "white";
    return "black";
}

function getCellData(cell){
    const row = cell.parentElement.getAttribute("data-row");
    const col = cell.getAttribute("data-col");
    const coinName =  cell.getAttribute("data-coin");
    const coinColor = cell.getAttribute("data-coin-color");
    return {
        "row"  : row-1,
        "col"  : col-1,
        "name" : coinName,
        "color": coinColor
    };

}


function fun1(cell){
    const peiceName = getCellData(cell).name;
    switch(peiceName){
       case "rook" : rook.moves(cell);
       break;
       case "knight" : knight.moves(cell);
       break;
       case "bishop" : bishop.moves(cell);
       break;
       case "king" : king.moves(cell);
       break;
       case "queen" : queen.moves(cell);
       break;
       case "pawn" : pawn.moves(cell);
       break;
       default : break;      
    }
    return;
}

//moves object
let moves = [];
let kingMoves = [];
let pawnMoves = [];//only simple forward moves not killing
let pawnKillMoves = [];

// objects
const rook = {}
const knight = {}
const bishop = {}
const king = {}
const queen = {}
const pawn = {}


// functions of moves of peices

//rook
rook.moves = function(piece){
    const cellData = getCellData(piece)
    // horizontal   
    for(let i=cellData.row-1;i>=0;i--){
        const cell = rows[i].children[cellData.col];
        if(cell.hasAttribute("data-coin-color")){
            if(cell.getAttribute("data-coin-color") == cellData.color){
                break;
            }
            moves.push(cell);
            break;
        }
        moves.push(cell);   
    }
    

    for(let i=cellData.row+1;i<8;i++){
        const cell = rows[i].children[cellData.col];
        if(cell.hasAttribute("data-coin-color")){
            if(cell.getAttribute("data-coin-color") == cellData.color){
                break;
            }
            moves.push(cell);
            break;
        }
        moves.push(cell);

    }
    
    //vertical
    const currRow = rows[cellData.row];
    for(let i= cellData.col+1;i<8;i++){
        const cell = currRow.children[i];
        if(cell.hasAttribute("data-coin-color")){
            if(cell.getAttribute("data-coin-color") == cellData.color){
                break;
            }
            moves.push(cell);
            break;
        }
        moves.push(cell)
    }
    

    for(let i=cellData.col-1;i>=0;i--){
        const cell = currRow.children[i];
        if(cell.hasAttribute("data-coin-color")){
            if(cell.getAttribute("data-coin-color") == cellData.color){
                break;
            }
            moves.push(cell);
            break;
        }
        moves.push(cell)
    }
    
}
//knight 
knight.moves = function(piece){
    const cellData = getCellData(piece);
    const col = cellData.col;
    const row = cellData.row;
    if(row-1>=0 ){
        if(col-2>=0){
            if(rows[row-1].children[col-2].getAttribute("data-coin-color") !== cellData.color)
            moves.push(rows[row-1].children[col-2]); 
        }
        
        if(col+2<8) {
            if(rows[row-1].children[col+2].getAttribute("data-coin-color") !== cellData.color)
            moves.push(rows[row-1].children[col+2]);
        }
    }
    if(row+1<8){
        if(col-2>=0) {
            if(rows[row+1].children[col-2].getAttribute("data-coin-color") !== cellData.color)
            moves.push(rows[row+1].children[col-2])
        }
        if(col+2<8) {
            if(rows[row+1].children[col+2].getAttribute("data-coin-color") !== cellData.color)
            moves.push(rows[row+1].children[col+2])
        }
    }
    if(row-2>=0){
        if(col-1>=0){
            if(rows[row-2].children[col-1].getAttribute("data-coin-color") !== cellData.color)
            moves.push(rows[row-2].children[col-1]);
        } 
        if(col+1<8) {
            if(rows[row-2].children[col+1].getAttribute("data-coin-color") !== cellData.color)
            moves.push(rows[row-2].children[col+1]);    
        }
    }
    if(row+2<8){
        if(col-1>=0){
            if(rows[row+2].children[col-1].getAttribute("data-coin-color") !== cellData.color)
            moves.push(rows[row+2].children[col-1]);
        } 
        if(col+1<8) {
            if(rows[row+2].children[col+1].getAttribute("data-coin-color") !== cellData.color)
            moves.push(rows[row+2].children[col+1]);
        }
    }

    // moves.push(move)
    // move=[]
}
//bishop
bishop.moves = function(piece){
    const cellData = getCellData(piece)
    
    //right diagonal
    const row = cellData.row;
    const col = cellData.col;
    let i=col+1;
    let j=row-1;
    let cell =null;
    while(i<8 && j>=0){
        cell = rows[j].children[i];
        if(isCellValid(cell)){
            moves.push(cell);
        }
        else{
            break;
        }
        j--;
        i++;
    }

    i=col+1;
    j=row+1;

    while(j<8 && i<8){
        cell= rows[j].children[i];
        if(isCellValid(cell)){
            moves.push(cell);
        }
        else{
            break;
        }
        j++;
        i++;
    }


    i=col-1;
    j=row-1;
    while(i>=0 && j>=0){
        cell = rows[j].children[i];
        if(isCellValid(cell)){
            moves.push(cell);
        }
        else{
            break;
        }
        j--;
        i--;
    }


    i=col-1;
    j=row+1;
    while(i>=0  && j<8){
        cell = rows[j].children[i];
        if(isCellValid(cell)){
            moves.push(cell);
        }
        else{
            break;
        }
        j++;
        i--;
    }


    function isCellValid(cell){
        if(cell.hasAttribute("data-coin-color")){
            if(cell.getAttribute("data-coin-color") !==cellData.color)
            moves.push(cell);

            return false;
        }
        return true;
    }
    
}
//queen
queen.moves = function(piece){
    // const cellData = getCellData(piece);
    rook.moves(piece);
    bishop.moves(piece);
}


pawn.moves = function(piece){
    const cellData = getCellData(piece);
    const col = cellData.col;
    const row = cellData.row;
    console.log(cellData.row+" "+cellData.col)
    if(cellData.color === "black"){
        if(isCellValid(rows[row+1].children[col]))
        pawnMoves.push(rows[row+1].children[col])
        //first move
        if(row == 1){
            if(isCellValid(rows[3].children[col]) && isCellValid(rows[2].children[col]))
            pawnMoves.push(rows[3].children[col])
        }

        if(col+1 < 8){
            if(isKillValid(rows[row+1].children[col+1])){
                moves.push(rows[row+1].children[col+1])
            }
        }
        if(col-1>=0){
            if(isKillValid(rows[row+1].children[col-1])){
                moves.push(rows[row+1].children[col-1])
            }
        }
    }

    if(cellData.color === "white"){
        if(isCellValid(rows[row-1].children[col]))
        pawnMoves.push(rows[row-1].children[col])
        //first step
        if(row == 6){
            if(isCellValid(rows[4].children[col]) && isCellValid(rows[5].children[col]))
            pawnMoves.push(rows[4].children[col])
        }

        if(col+1 < 8){
            if(isKillValid(rows[row-1].children[col+1])){
                moves.push(rows[row-1].children[col+1])
            }
        }

        if(col-1>=0){
            if(isKillValid(rows[row-1].children[col-1])){
                moves.push(rows[row-1].children[col-1])
            }
        }
    }

    function isCellValid(cell){
        if(cell.hasAttribute("data-coin-color")) return false;
        return true;
    }

    function isKillValid(cell){
        return cell.getAttribute("data-coin-color") === (getOpponentColor(cellData.color));
    }
}

function getOpponentColor(color){
    if(color === "white") return "black";
    return "white"
}

function highlightMoves(piece){
    const pieceName = piece.getAttribute("data-coin")
    if(pieceName === "king"){
        kingMoves.forEach(cell=>{
            cell.classList.add("highlight")
        })
    }

    else if(pieceName === "pawn"){
        moves.forEach(cell=>{
            cell.classList.add("highlight");
        })
        pawnMoves.forEach(cell=>{
            cell.classList.add("highlight");
        })
    }

    else{
        moves.forEach(cell=>{
             cell.classList.add("highlight");
        })
    }

}

function addEventListenerToMoves(cell){
    currCoin = cell
    const highlightCells =document.querySelectorAll('.highlight');
    highlightCells.forEach(highlightCell=>{
        highlightCell.addEventListener('click',swapCoins);
    });
}

function swapCoins(){
    // code for killing an opponent
    if(this.hasAttribute("data-coin")){
        eliminatedPeices.push({"color":getCellData(this).color,"name":getCellData(this).name})
    }
    // later
    const cellData = getCellData(currCoin);
    // if(cellData.name === "king") 
    // window.alert("gameOver")
    this.setAttribute("data-coin",cellData.name);
    this.setAttribute("data-coin-color",cellData.color);
    currCoin.removeAttribute("data-coin")
    currCoin.removeAttribute("data-coin-color")
    //now clearning evt listners of moves and trucnating moves array
    swapPlayer()
    clearPreviousHighlights()
}

function clearPreviousHighlights(){
    const highlightCells = document.querySelectorAll('.highlight');
    highlightCells.forEach(highlightCell=>{
        highlightCell.removeEventListener('click',swapCoins);
    })

    if(currCoin == undefined) return ;

        kingMoves.forEach(cell=>{
            cell.classList.remove("highlight");
        })
        kingMoves = [];

        pawnMoves.forEach(cell=>{
            cell.classList.remove("highlight");
        })
        pawnMoves = [];

        moves.forEach(cell=>{
            cell.classList.remove("highlight");
        })
        moves = [];
}

king.moves = function(piece){
    const cellData = getCellData(piece)
    const row = cellData.row; 
    const col = cellData.col;
    let i,j=null;let count=0;

    //first row
    i=row-1;
    j=col-1;
    while(count<3){
        if(!validRowCol(i,j)) {
            j++;
            count++;
            continue;
        }
        // if(!validRowCol(i,j)) continue;
        if(isCellValid(rows[i].children[j])){
            kingMoves.push(rows[i].children[j]);
        }
        j++;
        count++;
    }


    count=0;
    i++;
    j=col-1;
    while(count<3 ){
        if(!validRowCol(i,j)) {
            j++;
            count++;
            continue;
        }        
        if(isCellValid(rows[i].children[j])){
            kingMoves.push(rows[i].children[j]);
        }
        j++;
        count++;
    }
    

    count=0;
    i++;
    j=col-1;
    while(count<3 ){
        if(!validRowCol(i,j)) {
            j++;
            count++;
            continue;
        }
        if(isCellValid(rows[i].children[j])){
            kingMoves.push(rows[i].children[j]);
        }
        j++;
        count++;
    }



    function isCellValid(cell){
        if(cell.getAttribute("data-coin-color") == cellData.color)
        return false;
        return true;
    }

    function validRowCol(row,col){
        return (row<8 && row>=0 && col>=0 && col<8)
    }

}


function removePossibleChecks(piece){
    // let tempKingMoves = kingMoves.slice()
    // kingMoves = [];
    // const pieceColor = piece.getAttribute('data-coin-color')
    // const opponentColor = getOpponentColor(pieceColor);

    // // pawn threats
    // findPawnThreats(piece,opponentColor); 

    // // other threats
    // findAllThreats(piece,opponentColor); // direct  threats are resolved but not compund ones i.e mate

    // // console.log(moves)
    // kingMoves = tempKingMoves.filter(val=> {
    //     return !(moves.includes(val))
    // })

}


// pawns killing is different than others
function findPawnThreats(piece,opponentColor){
    let query = `[data-coin="pawn"][data-coin-color="${opponentColor}"]`;
    const opponentPawns = document.querySelectorAll(query);
    let cell1 ,cell2 = null;

    opponentPawns.forEach(pawn=>{
        const cellData = getCellData(pawn);
        if(opponentColor === "white"){
            if(validRowCol(cellData.row-1,cellData.col-1))
            cell1 = rows[cellData.row-1].children[cellData.col-1];
            if(validRowCol(cellData.row-1,cellData.col+1))
            cell2 = rows[cellData.row-1].children[cellData.col+1];
        }
        else{
            if(validRowCol(cellData.row+1,cellData.col-1))
            cell1 = rows[cellData.row+1].children[cellData.col-1];
            if(validRowCol(cellData.row+1,cellData.col+1))
            cell2 = rows[cellData.row+1].children[cellData.col+1];
        }

        if( isCellEmpty(cell1) )
        moves.push(cell1);

        if( isCellEmpty(cell2) )
        moves.push(cell2);

        cell1=cell2=null;
    })

    moves = new Set(moves);
    moves = Array.from(moves);

    // console.log(moves)



    function validRowCol(row,col){
        return (row<8 && row>=0 && col>=0 && col<8)
    }

    function isCellEmpty(cell){
        if (cell == null) return false;
        // return true if no coin has occupied cell        
        return !cell.hasAttribute(['data-coin'])
    }
}

function findAllThreats(piece,opponentColor){
    let query = `[data-coin-color="${opponentColor}"]`;
    const opponentPieces = document.querySelectorAll(query);
    opponentPieces.forEach(piece => {
        fun1(piece);
    })
    moves = new Set(moves);
    moves = Array.from(moves);
}
