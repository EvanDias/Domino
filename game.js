// =============== Class Piece =============== //
class Piece {
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }
}

// =============== Initialize pieces =============== //
function initialize_deck() {
    var sum, count = 0, i, j = 0;
    var all_pieces = new Array(28);

    for (i = 0; i <= 6; i++) {
        for (j = i; j <= 6; j++) {
            var p = new Piece(i, j);
            all_pieces[count] = p;
            count++;
        }
    }
    return all_pieces;
}

// =============== Show 2D Tiles =============== //
function Game_2D(left, right) {
    var value = document.getElementById("board").value;
    var conta = 127025 + left * 7 + right; // +50 -> 90º
    document.getElementById("board").innerHTML += "&#" + conta + " ";
}

// ========================= Shuffle deck ========================= //
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleDeck(all_pieces) {
    var currentIndex = all_pieces.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {

        // Pick a remaining tile
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = all_pieces[currentIndex];
        all_pieces[currentIndex] = all_pieces[randomIndex];
        all_pieces[randomIndex] = temporaryValue;
    }
    return all_pieces;
}

// ========================= Decide who is the First to play ========================= //
function first_to_Play(deck) {
    var sum, max_1 = -1, max_2 = -1, index1 = -1, index2 = -1;

    // Player 1
    for (i = 0; i < 7; i++) {
        sum = deck[i].left + deck[i].right;
        if (sum > max_1) {
            max_1 = sum;
            index1 = i;
        }
    }

    // Player 2
    for (i = 7; i < 14; i++) {
        sum = deck[i].left + deck[i].right;
        if (sum > max_2) {
            max_2 = sum;
            index2 = i;
        }
    }

    var array = new Array(2);
    /* Choose who has the biggest tile
      Pos [0] -> Index of the tile
      Pos [1] -> Player
    */
    if (max_1 > max_2) {
        array[0] = index1;
        array[1] = 1;
        return array;
    } else {
        array[0] = index2;
        array[1] = 2;
        return array;
    }
}

// ======================= Print hand Player ======================= //
function print_hand(hand) {
    for (var i = 0; i < hand.length; i++) {
        //var value = document.getElementById("top").value;
        var left = hand[i].left, right = hand[i].right;
        var conta = 50 + 127025 + left * 7 + right; // +50 -> 90º
        document.getElementById("top").innerHTML += "&#" + conta + " ";
    }
}

function print_hand2(hand) {
    for (i = 0; i < hand.length; i++) {
        var left = hand[i].left, right = hand[i].right;
        var conta = 50 + 127025 + left * 7 + right; // +50 -> 90º
        document.getElementById("down").innerHTML += "&#" + conta + " ";
    }
}

function boas() {
    document.getElementById("board").innerHTML = "Boas";
}


// ========================= Start the Game ========================= //
function StartGame(all_pieces) {
    // Shuffle initial deck
    var all_tiles = new Array(28);
    all_tiles = shuffleDeck(all_pieces);

    // Decide who is the first   -> aux[0] = index of tile // aux[1] = player with the biggest tile
    var aux = new Array(2);
    aux = first_to_Play(all_pieces);

    var flag = 0, biggestTile = aux[0], firstPlayer = aux[1];

    // Initial tile in board
    var middle_tile = new Piece(all_tiles[biggestTile].left, all_tiles[biggestTile].right);

    // First Play and remove the biggest tile from the player hand
    if (firstPlayer === 1) { // If is the player 1 with the biggest Tile
        Game_2D(all_tiles[biggestTile].left, all_tiles[biggestTile].right);
        all_tiles.splice(biggestTile, 1);
    } else {
        Game_2D(all_tiles[biggestTile].left, all_tiles[biggestTile].right);
        all_tiles.splice(biggestTile, 1);
    }


    // Players Deck's
    var hand_1 = [];
    var hand_2 = [];
    var index1, index2;

    // conditions to know who have 7 and 6 tiles in the hand
    if (firstPlayer === 1) index1 = 6; else index1 = 7;
    if (firstPlayer === 2) index2 = 6; else index2 = 7;

    // Initialize players Deck
    // Player 1 Hand
    for (i = 0; i < index1; i++) {
        hand_1[i] = all_tiles[i];
        console.log(hand_1[i]);
    }
    console.log("-------------");
    // Player 2 Hand
    for (i = 0; i < index2; i++) {
        hand_2[i] = all_tiles[i];
        console.log(hand_2[i]);
    }

    // TESTES TESTES TESTEES TESTETE
    console.log(hand_1);
    console.log(hand_2);


    print_hand(hand_1);
    print_hand2(hand_2);

    var tile = document.createElement("span");
    tile.innerHTML = "&#127044";
    tile.addEventListener('click', boas);
    document.getElementById("board").appendChild(tile);



    //var tile2 = document.createElement("span");
    //tile2.innerHTML = "&#127034";
    //document.getElementById("board").appendChild(tile2);

    var left = middle_tile.left, right = middle_tile.right;
    while ((all_tiles.length === 0) || (hand_1.length === 0 || (hand_2.length === 0))) {

        if (firstPlayer === 1) {

            for (i = 0; i < hand_1.length; i++) {
                if (hand_1[i].left === left || hand_1[i].right === right) {
                    Game_2D(hand_1[i].left, hand_1[i].right);
                    break;
                }
            }

        }


        if (firstPlayer === 2) {


        }


    }


}

StartGame(initialize_deck());






