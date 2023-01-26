let gameFlag = true
let blueChips = 10
let redChips = 10
let playerTurn = 'Blue'
let blueRolled = []
let redRolled = []
const dice1 = document.querySelector('.dice-1')
const dice2 = document.querySelector('.dice-2')
const dice3 = document.querySelector('.dice-3')
const toRoll = document.querySelector('.roll')
const blueChipCount = document.querySelector('.chip-count-1')
const redChipCount = document.querySelector('.chip-count-2')
const rollTurn = document.querySelector('#color-roll')
let rollCount = 0

const roll = () => {
    if (gameFlag) {
        rollCount++
        if (rollCount % 2 === 1) {
            rollTurn.innerHTML = 'Reds'
            diceRoll1 = Math.floor((Math.random() * 6)+1)
            diceRoll2 = Math.floor((Math.random() * 6)+1)
            diceRoll3 = Math.floor((Math.random() * 6)+1)
            blueRolled = [diceRoll1, diceRoll2, diceRoll3]
            blueRolled.sort((a,b)=>a-b)
            dice1.innerHTML = parseInt(blueRolled[0])
            dice2.innerHTML = parseInt(blueRolled[1])
            dice3.innerHTML = parseInt(blueRolled[2])
        } else {
            rollTurn.innerHTML = 'Blues'
            diceRoll1 = Math.floor((Math.random() * 6)+1)
            diceRoll2 = Math.floor((Math.random() * 6)+1)
            diceRoll3 = Math.floor((Math.random() * 6)+1)
            redRolled = [diceRoll1, diceRoll2, diceRoll3]
            redRolled.sort((a,b)=>a-b)
            dice1.innerHTML = parseInt(redRolled[0])
            dice2.innerHTML = parseInt(redRolled[1])
            dice3.innerHTML = parseInt(redRolled[2])
            checkScore(blueRolled, redRolled)
        }
    } else {
        return
    }
}

const checkScore = (blue, red) => {
    
    let blueScore = 0
    let redScore = 0
    // Calculate score for blue
    blue.forEach(num => {
        if (num === 1) {
            blueScore += 100
        } else if (num === 6) {
            blueScore += 60
        } else {
            blueScore += num
        }
    })
    // Calculate score for red
    red.forEach(num => {
        if (num === 1) {
            redScore += 100
        } else if (num === 6) {
            redScore += 60
        } else {
            redScore += num
        }
    })
    console.log(blue)
    console.log(red)
    console.log(blueScore)
    console.log(redScore)



    // Deal with special combinations

    // If someone has Zanzibar
    if ((blue === [4,5,6]) && (red != blue)) {
        blueChips -= 4
        redChips += 4
        blueChipCount.innerHTML = blueChips
        redChipCount.innerHTML = redChips
        return
    } else if ((red === [4,5,6]) && (blue != red)) {
        redChips -= 4
        blueChips += 4
        blueChipCount.innerHTML = blueChips
        redChipCount.innerHTML = redChips
        return
    } else if ((red === [4,5,6]) && (red === blue)) {
        //draw, deal with later
    }

    // If someone has 3 of a kind
    if (((blue[0] === blue[1]) && (blue[1] === blue[2])) && ((red[0] === red[1]) && (red[1] != red[2]))) {
        blueChips -= 3
        redChips += 3
        blueChipCount.innerHTML = blueChips
        redChipCount.innerHTML = redChips
        return
    } else if (((red[0] === red[1]) && (red[1] === red[2])) && ((blue[0] === blue[1]) && (blue[1] != red[2]))) {
        redChips -= 3
        blueChips += 3
        blueChipCount.innerHTML = blueChips
        redChipCount.innerHTML = redChips
        return
    } else if (((red[0] === red[1]) && (red[1] === red[2])) && ((blue[0] === blue[1]) && (blue[1] === red[2]))) {
        if (red[0] < blue[0]) {
            redChips -= 3
            blueChips += 3
            blueChipCount.innerHTML = blueChips
            redChipCount.innerHTML = redChips
            return
        } else if (red[0] > blue[0]) {
            blueChips -= 3
            redChips += 3
            blueChipCount.innerHTML = blueChips
            redChipCount.innerHTML = redChips
            return
        } else {
            //draw, deal with later
        }
    }

    // If 1,2,3 is rolled
    if ((blue === [1,2,3]) && (red != blue)) {
        blueChips -= 2
        redChips += 2
        blueChipCount.innerHTML = blueChips
        redChipCount.innerHTML = redChips
        return
    } else if ((red === [1,2,3]) && (blue != red)) {
        redChips -= 2
        blueChips -= 2
        blueChipCount.innerHTML = blueChips
        redChipCount.innerHTML = redChips
        return
    } else if ((red === [1,2,3]) && (blue === [1,2,3])) {
        //draw, deal with later
    }

    // If no special combination rolled 
    if (redScore > blueScore) {
        redChips -= 1
        blueChips += 1
        if (redChips <= 0) {
            redChipCount.innerHTML = 0
            redWins()
        
        } else if (blueChips <= 0) {
            blueChipCount.innerHTML = 0
            blueWins()
        }
        blueChipCount.innerHTML = blueChips
        redChipCount.innerHTML = redChips
    } else if (blueScore > redScore) {
        blueChips -= 1
        redChips += 1
        if (redChips <= 0) {
            redChipCount.innerHTML = 0
            redWins()
        } else if (blueChips <= 0) {
            blueChipCount.innerHTML = 0
            blueWins()
        }
        blueChipCount.innerHTML = blueChips
        redChipCount.innerHTML = redChips
    } else if (blueScore === redScore) {
        //draw, deal with later
    }
    console.log(blueChips)
    console.log(redChips)

}

const redWins = () => {
    // print red wins and if like to restart
    redChips = 0
    blueChips = 20
    gameFlag = false
    
}

const blueWins = () => {
    // print blue wins and like to restart
    blueChips = 0
    redChips = 20
    gameFlag = false
    
}

const restartGame = () => {
    blueChips = 10
    redChips = 10 
    rollCount = 0
    dice1.innerHTML = '?'
    dice2.innerHTML = '?'
    dice3.innerHTML = '?'
    blueChipCount.innerHTML = 10
    redChipCount.innerHTML = 10
    gameFlag = true
}




toRoll.addEventListener('click', () => {
    roll()
})

document.querySelector('.restart-game').addEventListener('click', restartGame)
