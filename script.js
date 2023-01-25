let blueChips = 20
let redChips = 20
let playerTurn = 'Blue'
let rolled = []
const dice1 = document.querySelector('.dice-1')
const dice2 = document.querySelector('.dice-2')
const dice3 = document.querySelector('.dice-3')
const toRoll = document.querySelector('.roll')

const roll = () => {
    
    diceRoll1 = Math.floor((Math.random() * 6)+1)
    diceRoll2 = Math.floor((Math.random() * 6)+1)
    diceRoll3 = Math.floor((Math.random() * 6)+1)
    rolled = [diceRoll1, diceRoll2, diceRoll3]
    rolled.sort((a,b)=>a-b)
    dice1.innerHTML = rolled[0]
    dice2.innerHTML = rolled[1]
    dice3.innerHTML = rolled[2]
}
 



toRoll.addEventListener('click', () => {
    roll()
})
