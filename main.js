const boardSize = prompt('Choose size of the board with a number between 10 and 40:')
const currentPlayer = document.querySelector("#currentPlayer")
const totalMoves = document.querySelector("#countMoves")
const gameBoard = document.querySelector(".boardframe")
const parentBoard = document.querySelector("#parentboard")
const p1symbol = "😼"
const p2symbol = "👻"
let numberMoves = 0
const boardArray = [[]]



//skapa bräde med ID och lyssnare för varje knapp
for(let x=0; x<boardSize; x++){
    const newRow = document.createElement("div")
    newRow.classList.add("row")
    gameBoard.appendChild(newRow)
    boardArray[x] = newRow
    for(let y=0; y<boardSize; y++){
        const newBtn = document.createElement("button")
        newBtn.dataset.row = x
        newBtn.dataset.col = y
        newBtn.classList.add("button")
        newBtn.addEventListener("click", btnClick)
        newRow.appendChild(newBtn)
        boardArray[x][y] = newBtn
    } 
}
//lyssna efter klick och rita ut drag
function btnClick(event) {
    let currentBtn = event.currentTarget
    if(currentBtn.classList.contains("clicked")){
        alert("Oops, this one is already clicked!")
    }
    else{
        currentBtn.classList.add("clicked")
        if (currentPlayer.classList.contains("player1")){
            currentBtn.textContent = p1symbol
            currentPlayer.classList.replace("player1", "player2")
            currentPlayer.textContent = "It's your turn, player 👻"
            numberMoves++
            totalMoves.textContent = `${numberMoves} moves in total`
            if(checkWin(currentBtn)){
                announceWinner(p1symbol)
            }
        }
        else{
            currentBtn.textContent = p2symbol
            currentPlayer.classList.replace("player2", "player1")
            currentPlayer.textContent = "It's your turn, player 😼"
            numberMoves++
            totalMoves.textContent = `${numberMoves} moves in total`
            if(checkWin(currentBtn)){
                announceWinner(p2symbol)
            }
        }
    }
}

//kontrollera för vinst
function checkWin(clickedBtn){
    const clickedRow = clickedBtn.dataset.row
    const clickedCol = clickedBtn.dataset.col
    const clickedSymb = clickedBtn.textContent

   if(horizontalWin(clickedRow, clickedCol, clickedSymb)===true ||
   verticalWin(clickedRow, clickedCol, clickedSymb)===true ||
   topdownWin(clickedRow, clickedCol, clickedSymb)===true ||
   bottomupWin(clickedRow, clickedCol, clickedSymb)===true){
        return true
    }   
    else{
        return false 
        }
}

function horizontalWin(row, col, symb){
    let counter = 0
    let x = parseInt(row)
    let y = parseInt(col)
        
    for(let i=-4; i<5; i++){
        if(y+i>=0 && y+i<boardSize){
            const checkBtn = boardArray[x][y+i]
            if(checkBtn.textContent === symb){
                counter++
                if(counter===5){
                    return true
                } 
            }                
            else{
                counter=0
            }
        }                   
    }            
}

function verticalWin(row, col, symb){
    let counter = 0
    let x = parseInt(row)
    let y = parseInt(col)
        
    for(let i=-4; i<5; i++){
        if(x+i>=0 && x+i<boardSize){
            const checkBtn = boardArray[x+i][y]
            if(checkBtn.textContent === symb){
                counter++
                if(counter===5){
                    return true
                } 
            }                
            else{
                counter=0
            }
        }                   
    }            
}

function topdownWin(row, col, symb){
    let counter = 0
    let x = parseInt(row)
    let y = parseInt(col)
        
    for(let i=-4; i<5; i++){
        if((x+i>=0 && x+i<boardSize) && (y+i>=0 && y+i<boardSize)){
            const checkBtn = boardArray[x+i][y+i]
            if(checkBtn.textContent === symb){
                counter++
                if(counter===5){
                    return true
                } 
            }                
            else{
                counter=0
            }
        }                    
    }            
}

function bottomupWin(row, col, symb){
    let counter = 0
    let x = parseInt(row)
    let y = parseInt(col)
        
    for(let i=-4; i<5; i++){ 
        if((x-i>=0 && x-i<boardSize) && (y+i>=0 && y+i<boardSize)){
            const checkBtn = boardArray[x-i][y+i]
            if(checkBtn.textContent === symb){
                counter++
                if(counter===5){
                    return true
                } 
            }                
            else{
                counter=0
            }
        }                   
    }            
}

function announceWinner(player){
    const winMsg = document.createElement("p")
    winMsg.classList.add('winnerMsg')
    winMsg.textContent = `Congratulations, player ${player}!
    Refresh page for a new game.`
    parentBoard.appendChild(winMsg)
    gameBoard.classList.add("noshow")
}
