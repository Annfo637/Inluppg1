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
    console.log(clickedBtn)
    const clickedRow = clickedBtn.dataset.row
    const clickedCol = clickedBtn.dataset.col
    const clickedSymb = clickedBtn.textContent
    console.log(clickedRow, clickedCol, clickedSymb)

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
    let r = parseInt(row)
    let c = parseInt(col)
        
    for(let i=-4; i<5; i++){
        const checkBtn = boardArray[r][c+i]
        console.log(checkBtn)
          
        if(typeof(checkBtn) !== 'undefined'){
            if(checkBtn.textContent === symb){
                counter++
                console.log(counter)
                if(counter===5){
                    return true
                } 
            }                
            else{
                counter=0
                console.log(counter)
            }
        }                   
    }            
}

function verticalWin(row, col, symb){
    let counter = 0
    let r = parseInt(row)
    let c = parseInt(col)
        
    for(let i=-4; i<5; i++){
        console.log('loop', i)
        const checkBtn = boardArray[r+i][c]
        console.log(checkBtn)
          
        if(typeof(checkBtn) !== 'undefined'){
            if(checkBtn.textContent === symb){
                counter++
                console.log(counter)
                if(counter===5){
                    return true
                } 
            }                
            else{
                counter=0
                console.log(counter)
            }
        }                   
    }            
}

function topdownWin(row, col, symb){
    let counter = 0
    let r = parseInt(row)
    let c = parseInt(col)
        
    for(let i=-4; i<5; i++){
        const checkBtn = boardArray[r+i][c+i]
         console.log(checkBtn)
          
        if(typeof(checkBtn) !== 'undefined'){
            if(checkBtn.textContent === symb){
                counter++
                console.log(counter)
                if(counter===5){
                    return true
                } 
            }                
            else{
                counter=0
                console.log(counter)
            }
        }                    
    }            
}

function bottomupWin(row, col, symb){
    let counter = 0
    let r = parseInt(row)
    let c = parseInt(col)
        
    for(let i=-4; i<5; i++){
        const checkBtn = boardArray[r-i][c+i]
         console.log(checkBtn)
          
        if(typeof(checkBtn) !== 'undefined'){
            if(checkBtn.textContent === symb){
                counter++
                console.log(counter)
                if(counter===5){
                    return true
                } 
            }                
            else{
                counter=0
                console.log(counter)
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
