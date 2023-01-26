let gameFlag = true
let blueChips = 10
let redChips = 10
let blueRolled = []
let redRolled = []
let blueScore = 0
let redScore = 0
let rollCount = 0
const dice1 = document.querySelector('.dice-1')
const dice2 = document.querySelector('.dice-2')
const dice3 = document.querySelector('.dice-3')
const toRoll = document.querySelector('.roll')
const blueChipCount = document.querySelector('.chip-count-1')
const redChipCount = document.querySelector('.chip-count-2')
const rollTurn = document.querySelector('#color-roll')
const description = document.querySelector('.description')
const winner = document.querySelector('.winner')

const drawMessage = () => {
    description.innerHTML = `Player blue rolled ${blueRolled[0]},${blueRolled[1]},${blueRolled[2]} scoring ${blueScore} points. Player red rolled ${redRolled[0]},${redRolled[1]},${redRolled[2]} scoring ${redScore} points. This round is a draw!`
}

const checkWin = (b,r) => {
    if (b <= 0) {
        blueWins()
    } else if (r <= 0) {
        redWins()
    }
}



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
    blueScore = 0
    redScore = 0
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
    
    // Deal with special combinations

    // If someone rolls Zanzibar
    if ((blueScore === 69) && (redScore != blueScore)) {
        description.innerHTML = `Player blue rolled Zanzibar! Player blue wins this round and player red gains 4 chips.`
        blueChips -= 4
        redChips += 4
        checkWin(blueChips,redChips)
        blueChipCount.innerHTML = blueChips
        redChipCount.innerHTML = redChips
        return
    } else if ((redScore === 69) && (blueScore != redScore)) {
        description.innerHTML = `Player red rolled Zanzibar! Player red wins this round and player blue gains 4 chips.`
        redChips -= 4
        blueChips += 4
        checkWin(blueChips,redChips)
        blueChipCount.innerHTML = blueChips
        redChipCount.innerHTML = redChips
        return
    } else if ((redScore === 69) && (redScore === blueScore)) {
        description.innerHTML = `Both players rolled zanzibar, what are the odds!?!? This round is a draw!`
        return
    }

    // If someone rolls 3 of a kind
    if ((blue[0] === blue[1]) && (blue[1] === blue[2])) {
        if ((red[0] === red[1]) && (red[1] === red[2])) {
            if (red[0] > blue[0]) {
                description.innerHTML = `Both players rolled a three of a kind! Player blues three of a kind is of higher rank though. Player blue wins this round and player red gains 3 chips.`
                blueChips -= 3
                redChips += 3
                checkWin(blueChips,redChips)
                blueChipCount.innerHTML = blueChips
                redChipCount.innerHTML = redChips
                return
            } else if (red[0] < blue[0]) {
                description.innerHTML = `Both players rolled a three of a kind! Player reds three of a kind is of higher rank though. Player red wins this round and player blue gains 3 chips.`
                redChips -= 3
                blueChips += 3
                checkWin(blueChips,redChips)
                blueChipCount.innerHTML = blueChips
                redChipCount.innerHTML = redChips
                return
            } else if (red[0] === blue[0]) {
                description.innerHTML = `Both players rolled the exact same three of a kind! Wow, what are the odds?! This round is a draw!`
                return
            }
        } else {
            description.innerHTML = `Player blue rolled ${blue[0]},${blue[1]},${blue[2]}! A three of a kind! Player blue wins this round and player red gains 3 chips.`
            blueChips -= 3
            redChips += 3
            checkWin(blueChips,redChips)
            blueChipCount.innerHTML = blueChips
            redChipCount.innerHTML = redChips
            return
        }  
    
    } else if ((red[0] === red[1]) && (red[1] === red[2])) {
            description.innerHTML = `Player red rolled ${red[0]},${red[1]},${red[2]}! A three of a kind! Player red wins this round and player blue gains 3 chips.`
            redChips -= 3
            blueChips += 3
            checkWin(blueChips,redChips)
            blueChipCount.innerHTML = blueChips
            redChipCount.innerHTML = redChips
            return
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
        description.innerHTML = `Player blue rolled ${blueRolled[0]},${blueRolled[1]},${blueRolled[2]} scoring ${blueScore} points. Player red rolled ${redRolled[0]},${redRolled[1]},${redRolled[2]} scoring ${redScore} points. Player red wins this round and player blue gains a chip!`
        redChips -= 1
        blueChips += 1
        checkWin(blueChips,redChips)
        blueChipCount.innerHTML = blueChips
        redChipCount.innerHTML = redChips
    } else if (blueScore > redScore) {
        description.innerHTML = `Player blue rolled ${blueRolled[0]},${blueRolled[1]},${blueRolled[2]} scoring ${blueScore} points. Player red rolled ${redRolled[0]},${redRolled[1]},${redRolled[2]} scoring ${redScore} points. Player blue wins this round and player red gains a chip!`
        blueChips -= 1
        redChips += 1
        checkWin(blueChips,redChips)
        blueChipCount.innerHTML = blueChips
        redChipCount.innerHTML = redChips
    } else if (blueScore === redScore) {
        drawMessage()
        return
    }
}


const redWins = () => {
    winner.innerHTML = `Player red wins!`
    redChips = 0
    blueChips = 20
    gameFlag = false
    
}

const blueWins = () => {
    winner.innerHTML = `Player blue wins!`
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
