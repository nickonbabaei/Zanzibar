let blueChips = 20
let redChips = 20
let playerTurn = 'Blue'
const blueRoll = []
const redRoll = []
const dice1 = document.querySelector('.dice-1')
const dice2 = document.querySelector('.dice-2')
const dice3 = document.querySelector('.dice-3')
const toRoll = document.querySelector('.roll')

const roll = () => {
    dice1.innerHTML = Math.floor((Math.random() * 6)+1)
    dice2.innerHTML = Math.floor((Math.random() * 6)+1)
    dice3.innerHTML = Math.floor((Math.random() * 6)+1)
    
}
 



toRoll.addEventListener('click', () => {
    roll()
})
