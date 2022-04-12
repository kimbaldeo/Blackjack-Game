// important variables
let playerTurn = true
let dealerHand = []
let dealerHandSum = 0
let playerHand = []
let playerHandSum = 0

// Card Rendering Divs
const playerDiv = document.querySelector(".player")
const dealerDiv = document.querySelector(".dealer")

// pulling html elements
const hit = document.querySelector("#hit")
const stand = document.querySelector("#stand")
const newGame = document.querySelector("#new_game")
let playerScore = document.querySelector("#player_score")
let dealerScore = document.querySelector("#dealer_score")
let announce = document.querySelector(".announce")

hit.addEventListener("click", function click() {
    hitMe()
})
stand.addEventListener("click", function click() {
    playerTurn = false
    dealerPlay()
})
newGame.addEventListener("click", function click() {
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
}

// dealing cards
function setup() {
    // Retrieve Cards From Deck
    const playerFirstCard = cardDeck.pop()
    const dealerFirstCard = cardDeck.pop()
    const playerSecondCard = cardDeck.pop()
    const dealerSecondCard = cardDeck.pop()

    // Get Weight of Player's Cards and add to score
    playerHandSum += readValue(playerFirstCard)
    playerHandSum += readValue(playerSecondCard)

    // Render Player Cards
    renderCard(playerFirstCard, playerDiv)
    renderCard(playerSecondCard, playerDiv)

    // Add Cards to Player's Hand
    playerHand.push(playerFirstCard)
    playerHand.push(playerSecondCard)

    // Get Weight of Dealer's Cards and add to score
    dealerHandSum += readValue(dealerFirstCard)
    dealerHandSum += readValue(dealerSecondCard)

    // Render Dealer Cards
    renderCard(dealerFirstCard, dealerDiv)
    renderCard(dealerSecondCard, dealerDiv)

    // Add Cards to Dealer's Hand
    dealerHand.push(dealerFirstCard)
    dealerHand.push(dealerSecondCard)

    playerScore.innerText = playerHandSum

    console.log(playerHand)
    console.log(dealerHand)
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
function readValue(card) {
    const cardValue = card.value
    let weight = parseInt(cardValue)
    if (cardValue == "J" || cardValue == "Q" || cardValue == "K") {
        weight = 10
    }
    else if (cardValue == "A") {
        weight = 11
    }
    // else if (cardValue == "A") {
    //     weight = 1
    // }
    return weight
}


// Moving to gameplay
// Function for Hit Button
function hitMe() {
    let cardToHitWith = cardDeck.pop()
    if (playerHandSum < 21) {
        if (playerTurn) {
            renderCard(cardToHitWith, playerDiv)
            playerHandSum += readValue(cardToHitWith)
            playerHand.push(cardToHitWith)
            playerScore.innerText = playerHandSum
        }
    }
    checkBust()
}


function checkBust() {
    if (playerTurn) {
        if (playerHandSum > 21) {
            announce.innerText = "The House wins, you bust"
        }
    }
}

// after player stands, dealer completes their turn
function dealerPlay() {
    dealerScore.innerText = dealerHandSum
     while (dealerHandSum < 18) {
        let dealerCard = cardDeck.pop()
        renderCard(dealerCard, dealerDiv)
        dealerHandSum += readValue(dealerCard)
        dealerHand.push(dealerCard)
    }
    pickWinner()
    dealerScore.innerText = dealerHandSum
}


// win determination
function pickWinner () {
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