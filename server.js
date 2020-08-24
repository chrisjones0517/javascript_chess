const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const Board = require('./Board');
const White = require('./White');
const Black = require('./Black');
const board = new Board();
const white = new White();
const black = new Black();
board.mountPieces(white, black);
// board.moveWhite();
// board.moveBlack();
// board.validateMove('');

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/api', (req, res) => {
    res.json(board);
});

app.post('/api/move', (req, res) => {

    // console.log(req.body);
    // console.log(board.board);


    console.log('server received move');

    // board.moveIndex.push(req.body);

    const validate = board.validateMove(req.body);


    // console.log(rand);
    // console.log(move);
    // console.log(move[rand]);

    // fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(board.moveIndex));

    // check for legality of move and return 200 if move is legal and 400 if not
    // send entire board object with each transaction (why not?)
    if (validate) {
        // call computer player move and send the result

        res.json(board.board);
    } else {
        res.json(400);
    }

});

app.post('/api/sidechg', (req, res) => {
    board.changeSides();
});

const PORT = 3000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));

/*
************************* items to address *********************
            finish individual piece legal move calculation
            move validation
            turn control logic
            remove duplicate positions
            mini-max w/alpha-beta pruning
            logic to add points for rooks placed on open files
            "" fiachettoed bishops
            "" doubled pawns
            "" center squares in the early-mid game
            "" bishops over knights in open position end games
*/
