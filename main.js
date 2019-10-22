const boardSize = 10
const currentPlayer = document.querySelector("#currentPlayer")
const totalMoves = document.querySelector("#countMoves")
const gameBoard = document.querySelector(".boardframe")
const p1symbol = "😼"
const p2symbol = "👻"
let numberMoves = 0

//skapa bräde med ID och lyssnare för varje knapp
for(let x=0; x<boardSize; x++){
    let newRow = document.createElement('div')
    newRow.classList.add('row')
    gameBoard.appendChild(newRow)
    for(let y=0; y<boardSize; y++){
        const newBtn = document.createElement("button")
        newBtn.id =`${x},${y}`
        newBtn.classList.add('button')
        newBtn.addEventListener('click', btnClick)
        newRow.appendChild(newBtn)
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
            numberMoves += 1
            totalMoves.textContent = `${numberMoves} moves in total`
        }
        else{
            currentBtn.textContent = p2symbol
            currentPlayer.classList.replace("player2", "player1")
            currentPlayer.textContent = "It's your turn, player 😼"
            numberMoves += 1
            totalMoves.textContent = `${numberMoves} moves in total`
        }
        checkWin(currentBtn)
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
        alert("You won!")
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
