// creating card deck
const suit = ["hearts", "spades", "clubs", "diamonds"]
const value = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

let cardDeck = new Array(); 

function createDeck() {
    for (let i = 0; i < suit.length; i++) {
        for (let j = 0; j < value.length; j++) {
            const singleCard = {
                Value: value[j],
                Suit: suit[i],
            }
            cardDeck.push(singleCard)
        }
    }
    return cardDeck;
}

createDeck()
