// important variables
let playerTurn = true
let dealerHand = []
let dealerHandSum = 0
let playerHand = []
let playerHandSum = 0
let isGameOver = false

// Card Rendering Divs
const playerDiv = document.querySelector(".player")
const dealerDiv = document.querySelector(".dealer")

playerDiv.style.display = 'none'
dealerDiv.style.display = 'none'

// pulling html elements
const image = document.querySelector("img")
const hit = document.querySelector("#hit")
const stand = document.querySelector("#stand")
const newGame = document.querySelector("#new_game")
const playerScore = document.querySelector("#player_score")
const dealerScore = document.querySelector("#dealer_score")
const announce = document.querySelector(".announce")
const gameboard = document.querySelector(".gameboard")

hit.addEventListener("click", function click() {
    if (isGameOver) {
        return
    }
    hitMe()
})
stand.addEventListener("click", function click() {
    if (isGameOver) {
        return
    }
    playerTurn = false
    dealerPlay()
})
newGame.addEventListener("click", function click() {
    image.remove()
    playerDiv.style.display = 'inline-block'
    dealerDiv.style.display = 'inline-block'
    resetGame()
    createDeck()
    shuffle()
    setup()
})

// creating card deck
const suit = ["hearts", "spades", "clubs", "diamonds"]
const value = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

let cardDeck = new Array(); 

function createDeck() {
    cardDeck = []
    for (let i = 0; i < suit.length; i++) {
        for (let j = 0; j < value.length; j++) {
            const singleCard = {
                value: value[j],
                suit: suit[i],
            }
            cardDeck.push(singleCard)
        }
    }
    return cardDeck;
}


// shuffle cards - Fisher-Yates Shuffle (http://sedition.com/perl/javascript-fy.html)
function shuffle() {
    for (let i = cardDeck.length - 1; i >= 0; i--) { // 52nd Card (51 index)
        let j = Math.floor(Math.random() * i) // Return a random value between 0 and 51
        let tempI = cardDeck[i] // Temp I is the card that is at the 51 index
        let tempJ = cardDeck[j] // Temp J is the card that at the random spot from our second line
        cardDeck[i] = tempJ // Now flip them
        cardDeck[j] = tempI
    }
    return cardDeck
}


function resetGame() {
    announce.innerText = ""
    playerDiv.innerHTML = ""
    dealerDiv.innerHTML = ""
    dealerScore.innerText = ""
    playerHandSum = 0
    dealerHandSum = 0
    playerHand = []
    dealerHand = []
    playerTurn = true
    isGameOver = false
}


// dealing cards
function setup() {
    // Retrieve Cards From Deck
    const playerFirstCard = cardDeck.pop()
    const dealerFirstCard = cardDeck.pop()
    const playerSecondCard = cardDeck.pop()
    const dealerSecondCard = cardDeck.pop()

    // Get Weight of Player's Cards and add to score
    playerHandSum += readValue(playerFirstCard, playerHandSum)
    playerHandSum += readValue(playerSecondCard, playerHandSum)

    // Render Player Cards
    renderCard(playerFirstCard, playerDiv)
    renderCard(playerSecondCard, playerDiv)

    // Add Cards to Player's Hand
    playerHand.push(playerFirstCard)
    playerHand.push(playerSecondCard)

    // Get Weight of Dealer's Cards and add to score
    dealerHandSum += readValue(dealerFirstCard, dealerHandSum)
    dealerHandSum += readValue(dealerSecondCard, dealerHandSum)

    // Render Dealer Cards
    renderCard(dealerFirstCard, dealerDiv)
    renderCard(dealerSecondCard, dealerDiv)

    // Add Cards to Dealer's Hand
    dealerHand.push(dealerFirstCard)
    dealerHand.push(dealerSecondCard)

    playerScore.innerText = `Player: ${playerHandSum}`
}


// rendering cards (https://devdojo.com/devdojo/create-a-deck-of-cards-in-javascript)
function renderCard(card, div) {
    const cardDiv = document.createElement("div")
    cardDiv.className = "card"
    let ascii_char = ""
    if (card.suit == "diamonds") {
        ascii_char = "&diams;"
    } 
    else {
        ascii_char = "&" + card.suit + ";"
    }
    cardDiv.innerHTML = '<span class="number">' + card.value + '</span><span class="suit">' + ascii_char + '</span>'
    div.appendChild(cardDiv)
}


// Giving cards value
function readValue(card, sum) {
    const cardValue = card.value
    let weight = parseInt(cardValue)
    if (cardValue == "J" || cardValue == "Q" || cardValue == "K") {
        weight = 10
    }
    else if (cardValue == "A") {
        if (sum > 10) {
            weight = 1
        }
        else {
            weight = 11
        }
    }
    return weight
}


// Moving to gameplay
// Function for Hit Button
function hitMe() {
    let cardToHitWith = cardDeck.pop()
    if (playerTurn) {
        renderCard(cardToHitWith, playerDiv)
        playerHandSum += readValue(cardToHitWith, playerHandSum)
        playerHand.push(cardToHitWith)
    }
    playerHandSum = confirmBust(playerHand, playerHandSum)
    playerScore.innerText = `Player: ${playerHandSum}`
}


// function to check if bust and determine if Ace is 1 or 11
function confirmBust(hand, sum) {
    if (sum > 21) {
        let tempSum = 0
        for (let i = 0; i < hand.length; i++) {
            let card = hand[i]
            tempSum += readValue(card, sum)
        }
        if (tempSum > 21) {
            if (playerTurn) {
                announce.innerText = "The House wins, you bust"
                isGameOver = true
            }
            else {
                announce.innerText = "You win, Dealer is bust"
                isGameOver = true
            }
            return sum
        }
        else {
            return tempSum
        }
    }
    return sum
}


// after player stands, dealer completes their turn
function dealerPlay() {
     while (dealerHandSum < 18) {
        let dealerCard = cardDeck.pop()
        renderCard(dealerCard, dealerDiv)
        dealerHandSum += readValue(dealerCard, dealerHandSum)
        dealerHand.push(dealerCard)
        dealerHandSum = confirmBust(dealerHand, dealerHandSum)
    }
    pickWinner()
    dealerScore.innerText = `Dealer: ${dealerHandSum}`
}


// win determination
function pickWinner () {
    isGameOver = true
    if (playerHandSum <= 21 && dealerHandSum <= 21) {
        if (playerHandSum > dealerHandSum) {
            announce.innerText = "You Win!"
        }
        else if (playerHandSum < dealerHandSum) {
            announce.innerText = "The House Wins!"
        }
        else {
            announce.innerText = "Draw"
        }
    }
    if (playerHandSum <= 21 && dealerHandSum > 21) {
        announce.innerText = "You win, Dealer is bust"
    }
}