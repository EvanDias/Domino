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

// ========================= Decide who is the First ========================= //
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

var currentPlayer = -1;
var deck_empty = 0;

// ======================= Print hand Player ======================= //
function print_hand1(left, right) {
    var conta = 50 + 127025 + left * 7 + right; // +50 -> 90º
    var tile = document.createElement("span");
    var idd = "" + left + "" + right + "";
    tile.className = "piece";
    tile.setAttribute('id', idd); // id to tile
    tile.innerHTML += "&#" + conta + " ";
    var down = document.getElementById("down").appendChild(tile);

    down.addEventListener('click', function () {


        if (currentPlayer === 2) {
            alert("It's not your turn");
        } else {
            var str = this.id; // get the id from the clicked tile

            // Convert the string ID of the 2D tile to int
            var integer1 = parseInt(str.charAt(0), 10);
            var integer2 = parseInt(str.charAt(1), 10);
            var human_flag = human_play(integer1, integer2);

            if (hand_1.length === 0) {
                alert("You win");
                // botao recomeçar etc...
                return;
            }
        }

        if (human_flag == 0 || human_flag == -2) currentPlayer = 2;

        // Time to computer play
        if (currentPlayer === 2) {
            var flag1, size = hand_2.length, i = 0;
            for (i = 0; i < hand_2.length; i++) {
                flag1 = computer_play(hand_2[i].left, hand_2[i].right);

                // -----------------------------
                if (hand_2.length === 0) {
                    alert("Computer win");
                    // botao recomeçar etc...
                    return;
                }
                // -----------------------------
                if (flag1 === 1) {
                    currentPlayer = 1;
                    break;
                } else {
                    if (i === (hand_2.length - 1)) {
                        if (all_tiles.length === 0) deck_empty = 1;
                        if (deck_empty === 0) take_tile_top(); else {
                            alert("Deck iss empty");
                            currentPlayer = 1;
                            return;
                        }
                        i = hand_2.length - 2;
                        size += 1;
                    }
                }
            }
        }

    });

}


function print_hand2(left, right) {
    var conta = 50 + 127025 + left * 7 + right; // +50 -> 90º
    var tile = document.createElement("span");
    tile.innerHTML += "&#" + conta + " ";
    //var conta = "127074";
    document.getElementById("top").appendChild(tile);
}

// ======================= Print tiles in board ======================= //

function print_left(hand, left, right, x) {
    var newItem = document.createElement("span");
    var conta = 127025 + left * 7 + right;
    newItem.innerHTML = "&#" + conta + " ";
    var list = document.getElementById("board");
    list.insertBefore(newItem, list.childNodes[0]);

    var p = new Piece(left, right);
    board.unshift(p);

    if (currentPlayer === 1)
        if (x === 1) remove_tile_down(left, right); else remove_tile_down(right, left);
    if (currentPlayer === 2)
        if (x === 1) remove_tile_top(left, right); else remove_tile_top(right, left);
}

function print_right(hand, left, right, x) {
    var tile = document.createElement("span");
    var conta = 127025 + left * 7 + right;
    tile.innerHTML += "&#" + conta + " ";
    document.getElementById("board").appendChild(tile);

    var p = new Piece(left, right);
    board.push(p);
    if (currentPlayer === 1)
        if (x === 1) remove_tile_down(left, right); else remove_tile_down(right, left);
    if (currentPlayer === 2)
        if (x === 1) remove_tile_top(left, right); else remove_tile_top(right, left);

}


// ========================= Remove tile from hand ========================= //
function remove_tile_top(left, right) {
    for (i = 0; i < hand_2.length; i++) {
        if ((hand_2[i].left === left) && (hand_2[i].right === right)) {
            var child = document.getElementById("top");
            child.removeChild(child.childNodes[i]);
            hand_2.splice(i, 1);
            break;
        }
    }
}

function remove_tile_down(left, right) {
    for (i = 0; i < hand_1.length; i++) {
        if (hand_1[i].left === left && hand_1[i].right === right) {
            var child = document.getElementById("down");
            child.removeChild(child.childNodes[i + 1]);
            hand_1.splice(i, 1);
            break;
        }
    }
}

// ========================= Verify ========================= //
var aux = [];
var aux2 = [];

function verify_left(boardd, left, right) {
    aux[0] = 0;
    aux[1] = 0;
    var left_board = boardd[0].left;
    if (left_board === right) aux[0] = 1;
    if (left_board === left) aux[1] = 2;
    return aux;
}

function verify_right(boardd, left, right) {
    aux2[0] = 0;
    aux2[1] = 0;
    var right_board = boardd[boardd.length - 1].right;
    if (right_board === left) aux2[0] = 1;
    if (right_board === right) aux2[1] = 2;
    return aux2;
}


// ========================= Start the Game ========================= //
var board = [];
var hand_1 = [];
var hand_2 = [];
var all_tiles = new Array(28);

function StartGame(all_pieces) {
    // Shuffle initial deck
    all_tiles = shuffleDeck(all_pieces);

    // Decide who is the first   -> aux[0] = index of tile // aux[1] = player with the biggest tile
    var aux = new Array(2);
    aux = first_to_Play(all_pieces);

    var flag = 0, biggestTile = aux[0], firstPlayer = aux[1];

    // Initial tile in board
    var middle_tile = new Piece(all_tiles[biggestTile].left, all_tiles[biggestTile].right);

    var trash = [];
    // First Play and remove the biggest tile from the player hand
    if (firstPlayer === 1) { // If is the player 1 with the biggest Tile
        print_right(trash, all_tiles[biggestTile].left, all_tiles[biggestTile].right);
        all_tiles.splice(biggestTile, 1);
    } else {
        print_right(trash, all_tiles[biggestTile].left, all_tiles[biggestTile].right);
        all_tiles.splice(biggestTile, 1);
    }

    // conditions to know who have 7 and 6 tiles in the hand
    var index1, index2;
    if (firstPlayer === 1) index1 = 6; else index1 = 7;
    if (firstPlayer === 2) index2 = 6; else index2 = 7;

    // Initialize players Deck
    // Player 1 Hand
    for (i = 0; i < index1; i++) {
        hand_1[i] = all_tiles[i];
        print_hand1(all_tiles[i].left, all_tiles[i].right);
        all_tiles.splice(i, 1);
    }

    // Player 2 Hand
    for (i = 0; i < index2; i++) {
        hand_2[i] = all_tiles[i];
        print_hand2(hand_2[i].left, hand_2[i].right);
        all_tiles.splice(i, 1);
    }


    if (firstPlayer === 1) {
        currentPlayer = 2; // computer
    } else {
        currentPlayer = 1; // human
    }


    var left = middle_tile.left, right = middle_tile.right;
    if (currentPlayer === 2) {
        var flag1, size = hand_2.length, i = 0;
        for (i = 0; i < hand_2.length; i++) {
            flag1 = computer_play(hand_2[i].left, hand_2[i].right);
            if (flag1 === 1) {
                currentPlayer = 1;
                break;
            } else {
                if (i === (hand_2.length - 1)) {
                    if (all_tiles.length === 0) deck_empty = 1;
                    if (deck_empty === 0) take_tile_top(); else {
                        alert("Deck iss empty");
                        currentPlayer = 1;
                    }
                    i = hand_2.length - 2;
                    size += 1;
                }
            }
        }
    }
}

// ================================================== //
function computer_play(integer1, integer2) {
    var computer_flag = 0;
    verify_left(board, integer1, integer2);
    verify_right(board, integer1, integer2);
    var flag1 = 0, flag2 = 0;

    // play for both sides
    if ((aux[0] === 1 || aux[1] === 2) && (aux2[0] === 1 || aux2[1] === 2)) {
        console.log("left and right")
        var random = Math.floor(Math.random() * 2) + 1;

        if (random === 1) {
            if (integer1 === integer2) { //left == right
                if (aux2[0] === 1) print_right(hand_2, integer1, integer2, 1);
            } else { // left != right
                if (aux2[0] === 1) print_right(hand_2, integer1, integer2, 1);
                if (aux2[1] === 2) print_right(hand_2, integer2, integer1, 2);
            }
        }

        if (random === 2) {
            if (integer1 === integer2) { //left == right
                if (aux2[0] === 1) print_left(hand_2, integer1, integer2, 1);
            } else { // left != right
                if (aux[0] === 1) print_left(hand_2, integer1, integer2, 1);
                if (aux[1] === 2) print_left(hand_2, integer2, integer1, 2);
            }
        }
        computer_flag = 1;
        flag1 = 1;
    }

    // just play right
    if ((aux2[0] === 1 || aux2[1] === 2) && (flag1 === 0)) {
        console.log("right");
        if (integer1 === integer2) { //left == right
            print_right(hand_2, integer1, integer2, 1);
        } else { // left != right
            if (aux2[0] === 1) print_right(hand_2, integer1, integer2, 1);
            if (aux2[1] === 2) print_right(hand_2, integer2, integer1, 2);
        }
        computer_flag = 1;
        flag2 = 1;
    }

    // just play left
    if ((aux[0] === 1 || aux[1] === 2) && (flag2 === 0) && (flag1 === 0)) {
        console.log("left");
        if (integer1 === integer2) { //left == right
            print_left(hand_1, integer1, integer2, 1);
        } else { // left != right
            if (aux[0] === 1) print_left(hand_1, integer1, integer2, 1);
            if (aux[1] === 2) print_left(hand_1, integer2, integer1, 2);
        }
        computer_flag = 1;
    }
    return computer_flag;
}


function human_play(integer1, integer2) {
    verify_left(board, integer1, integer2);
    verify_right(board, integer1, integer2);
    var flag1 = 0, flag2 = 0, flag3 = 0, human_flag = 0;

    // play for both sides
    if ((aux[0] === 1 || aux[1] === 2) && (aux2[0] === 1 || aux2[1] === 2)) {
        var random = Math.floor(Math.random() * 2) + 1;

        if (random === 1) {
            if (integer1 === integer2) { //left == right
                if (aux2[0] === 1) print_right(hand_1, integer1, integer2, 1);
            } else { // left != right
                if (aux2[0] === 1) print_right(hand_1, integer1, integer2, 1);
                if (aux2[1] === 2) print_right(hand_1, integer2, integer1, 2);
            }
        }

        if (random === 2) {
            if (integer1 === integer2) { //left == right
                if (aux2[0] === 1) print_left(hand_1, integer1, integer2, 1);
            } else { // left != right
                if (aux[0] === 1) print_left(hand_1, integer1, integer2, 1);
                if (aux[1] === 2) print_left(hand_1, integer2, integer1, 2);
            }
        }
        flag1 = 1;
        return human_flag;
    }

    // just play right
    if ((aux2[0] === 1 || aux2[1] === 2) && (flag1 === 0)) {
        if (integer1 === integer2) { //left == right
            print_right(hand_1, integer1, integer2, 1);
        } else { // left != right
            if (aux2[0] === 1) print_right(hand_1, integer1, integer2, 1);
            if (aux2[1] === 2) print_right(hand_1, integer2, integer1, 2);
        }
        flag2 = 1;
        return human_flag;
    }

    // just play left
    if ((aux[0] === 1 || aux[1] === 2) && (flag2 === 0) && (flag1 === 0)) {
        if (integer1 === integer2) { //left == right
            print_left(hand_1, integer1, integer2, 1);
        } else { // left != right
            if (aux[0] === 1) print_left(hand_1, integer1, integer2, 1);
            if (aux[1] === 2) print_left(hand_1, integer2, integer1, 2);
        }
        flag3 = 1;
        return human_flag;
    }


    // ------------
    if ((flag1 === 0) && (flag2 === 0) && (flag3 === 0) && (deck_empty === 0)) {
        if (all_tiles.length === 0) deck_empty = 1;
        if (deck_empty === 0) take_tile_down(); else {
            alert("Deck is empty");
            currentPlayer = 2;
        }
        currentPlayer = 1;
        return -1;
    }


}


function take_tile_down() {
    var flag = 0;

    for (i = 0; i < hand_1.length; i++) {
        verify_left(board, hand_1[i].left, hand_1[i].right);
        verify_right(board, hand_1[i].left, hand_1[i].right);

        if ((aux[0] === 0) && (aux[1] === 0) && (aux2[0] === 0) && (aux2[1] === 0)) {
            continue;
        } else {
            flag = 1;
            break;
        }
    }

    if (flag === 0) {
        var left = all_tiles[0].left, right = all_tiles[0].right;
        hand_1.push(all_tiles[0]);
        print_hand1(left, right);
        all_tiles.splice(0, 1);
    } else {
        alert("Podes jogar");
    }
}

function take_tile_top() {
    hand_2.push(all_tiles[0]);
    print_hand2(all_tiles[0].left, all_tiles[0].right);
    all_tiles.splice(0, 1);
    currentPlayer = 2;
}


StartGame(initialize_deck());




