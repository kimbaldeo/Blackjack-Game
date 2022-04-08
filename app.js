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


    // function readValues() {
//     for (let l = 0; l < cardDeck.length; l++) {
//         let weight = 10
//         if (cardDeck.value == "J" || cardDeck.value == "Q" || cardDeck.value == "K") {
//             weight = 10
//         }
//         else if (cardDeck.value == "A") {
//             weight = 11
//         }
//         else {
//             // weight = get boolean value of numbers
//         }
//     }
// }