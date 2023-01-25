let blueChips = 20
let redChips = 20
let playerTurn = 'Blue'
let blueRolled = []
let redRolled = []
const dice1 = document.querySelector('.dice-1')
const dice2 = document.querySelector('.dice-2')
const dice3 = document.querySelector('.dice-3')
const toRoll = document.querySelector('.roll')
let rollCount = 0

const roll = () => {
    rollCount++
    if (rollCount % 2 === 1) {
        diceRoll1 = Math.floor((Math.random() * 6)+1)
        diceRoll2 = Math.floor((Math.random() * 6)+1)
        diceRoll3 = Math.floor((Math.random() * 6)+1)
        blueRolled = [diceRoll1, diceRoll2, diceRoll3]
        blueRolled.sort((a,b)=>a-b)
        dice1.innerHTML = blueRolled[0]
        dice2.innerHTML = blueRolled[1]
        dice3.innerHTML = blueRolled[2]
    } else {
        diceRoll1 = Math.floor((Math.random() * 6)+1)
        diceRoll2 = Math.floor((Math.random() * 6)+1)
        diceRoll3 = Math.floor((Math.random() * 6)+1)
        redRolled = [diceRoll1, diceRoll2, diceRoll3]
        redRolled.sort((a,b)=>a-b)
        dice1.innerHTML = redRolled[0]
        dice2.innerHTML = redRolled[1]
        dice3.innerHTML = redRolled[2]
        console.log(blueRolled)
        console.log(redRolled)
    }
}




toRoll.addEventListener('click', () => {
    roll()
})
