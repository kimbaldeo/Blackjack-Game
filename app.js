// important variables
let playerTurn = true
let dealerHand = []
let dealerHandSum = 0
let playerHand = []
let playerHandSum = 0


// buttons
let hit = document.querySelector("#hit")
let stand = document.querySelector("#stand")
let newGame = document.querySelector("#new_game")

hit.addEventListener("click", function click() {
    hitMe()
})
stand.addEventListener("click", function click() {
    let playerTurn = false
    dealerPlay()

})
newGame.addEventListener("click", function click() {
    playerTurn = true
    shuffle()
    dealCards()
})


// creating card deck
const suit = ["hearts", "spades", "clubs", "diamonds"]
const value = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

let cardDeck = new Array(); 

function createDeck() {
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

createDeck()


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


// dealing cards
function dealCards() {
    let firstCard = cardDeck.pop()
    renderCard(firstCard)
    playerHand.push(firstCard)
    playerHand.push(cardDeck.pop())
    dealerHand.push(cardDeck.pop())
    playerHand.push(cardDeck.pop())
    dealerHand.push(cardDeck.pop())
}


// rendering cards (https://devdojo.com/devdojo/create-a-deck-of-cards-in-javascript)
function renderCard(card) {
    for(let i=0; i < cardDeck.length; i++) {
      div = document.createElement('div');
      div.className = 'card';
      let ascii_char
      if(cardDeck[i].suit == "diamonds") {
        ascii_char = "&diams;";
      } 
      else {
        ascii_char = "&" + cardDeck[i].suit + ";";
      }
  
      div.innerHTML = '<span class="number">' + cardDeck[i].value + '</span><span class="suit">' + ascii_char + '</span>';
      document.body.appendChild(div);
    }
}


// Moving to gameplay
// Function for Hit Button
function hitMe() {
    if (playerTurn == true) {
        let card = cardDeck.pop()
        renderCard()
        playerHandSum += readValue(card)
        checkBust()
        playerHand.push(card)
    }
    // if (playerTurn == false) {
    //     let card = cardDeck.pop()
    //     dealerHandSum += readValue(card)
    //     checkBust()
    //     dealerHand.push(card)
    // }
}

function checkBust() {
    if (playerTurn == true) {
        if (playerHandSum > 21) {
            console.log("The House Wins")
        }
    }
    if (playerTurn == false) {
        if (dealerHandSum > 21) {
            console.log("")
        }
    }
}

// Giving cards value
function readValue(card) {
    const cardValue = card.value
    let weight = parseInt(value)
    if (cardValue == "J" || cardValue == "Q" || cardValue == "K") {
        weight = 10
    }
    else if (cardValue == "A") {
        weight = 11
    }
    else if (cardValue == "A") {
        weight = 1
    }
    return weight
}

// after player stands, dealer completes their turn
function dealerPlay() {
        while (dealerHandSum < 17) {
            let card = cardDeck.pop()
            renderCard()
            dealerHandSum += readValue(card)
            checkBust()
            dealerHand.push(cardDeck.pop())
        }
        pickWinner()
}

// win determination
function pickWinner () {
    if (playerHandSum <= 21 && dealerHandSum <= 21) {
        if (playerHandSum > dealerHandSum) {
            console.log("You Win!")
        }
        else if (playerHandSum < dealerHandSum) {
            console.log("The House Wins!")
        }
        else {
            console.log("Draw")
        }
    }
}