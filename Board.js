const Square = require('./Square');
const WhitePieces = require('./WhitePieces');
const BlackPieces = require('./BlackPieces');
const data = require('./data.json');
const fs = require('fs');

class Board {
    board = [];
    moveIndex = [];
    turn = 'w';
    humanWhite = true;

    constructor() {
        let file = 0;
        let rank = 0;
        let color;
        let int = 1;

        for (let i = 0; i < 64; i++) {
            if (file >= 8) {
                rank++;
                file = 0;
                int = !int;
            }
            if (int) {
                color = 'b';
                int = 0;
            } else {
                color = 'w';
                int = 1;
            }
            this.board.push(new Square(color, rank, file, 0));
            file++;
        }
    }

    updateScore() {
        for (let i = 0; i < 64; i++) {
            if (this.board[i].piece) {
                this.score += this.board[i].piece.value;
            }
        }
    }

    mountPieces(white, black) {

        this.board[4].piece = white.pieces[0];
        this.board[0].piece = white.pieces[1];
        this.board[7].piece = white.pieces[2];
        this.board[8].piece = white.pieces[3];
        this.board[15].piece = white.pieces[4];

        this.board[60].piece = black.pieces[0];
        this.board[56].piece = black.pieces[1];
        this.board[63].piece = black.pieces[2];
        this.board[48].piece = black.pieces[3];
        this.board[55].piece = black.pieces[4];

        // for (let i = 0; i < 64; i++) {

        //     if (i < 16) {
        //         this.board[i].piece = white.pieces[i];
        //     }

        //     if (i > 47) {
        //         this.board[i].piece = black.pieces[i - 48];
        //     }
        // }
    }

    changeSides() {

        this.humanWhite = !this.humanWhite;

    }

    moveWhite(crntState = this.board, prevState = this.moveIndex) {

        const state = [];

        for (let i = 0; i < 64; i++) {
            if (this.board[i].piece && this.board[i].piece.color === 'w') {
                state.push(this.board[i].piece.move(crntState, prevState));
            }
        }

        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state[i].states.length; j++) {
                for (let k = 0; k < 64; k++) {
                    if (state[i].states[j][k].piece.piece === this.board[k].piece.piece && state[i].states[j][k].piece.color === this.board[k].piece.color) {
                        state[i].states[j][k].piece = this.board[k].piece;
                    }
                }
            }
        }

        console.log('length of state in moveWhite', state.length);
        // console.log(state[0].states);
        // console.log(state);
        return state;
    }

    moveBlack(crntState = this.board, prevState = this.moveIndex) {

        const state = [];

        for (let i = 0; i < 64; i++) {
            if (this.board[i].piece && this.board[i].piece.color === 'b') {
                state.push(this.board[i].piece.move(crntState, prevState));
            }
        }
        // fs.writeFileSync('data.json', JSON.stringify(state));
        // console.log(state[0].states[0][8].piece.move(this.board, []));

        // readd 'move' method back to board object that was lost in the tranfer

        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state[i].states.length; j++) {
                for (let k = 0; k < 64; k++) {
                    if (state[i].states[j][k].piece.piece === this.board[k].piece.piece && state[i].states[j][k].piece.color === this.board[k].piece.color) {
                        state[i].states[j][k].piece = this.board[k].piece;
                    }
                }
            }
        }

        // console.log(state[0].states[0][8].piece.move(state[0].states[0], state[0].states[0].stateIn));
        // temp move for testing

        console.log('length from state in moveBlack', state.length);

        // console.log(state);
        return state;
    }

    validateMove(move) {

        if (this.turn === 'w') {
            const tempArr = this.moveWhite();
            const moveOptsWt = [];

            // filter out nested objects into a pure array of boards(array[64])
            for (let i = 0; i < tempArr.length; i++) {
                for (let j = 0; j < tempArr[i].states.length; j++) {
                    moveOptsWt.push(tempArr[i].states[j]);
                }
            }

            this.turn = 'b';

            // make sure king isn't currently in check

            // check for king movement and ensure king isn't moving into check
            if (this.board[move.prevIndex].piece.piece === 'k') {
                // call moveBlack() on position after the move
                const tempState = JSON.parse(JSON.stringify(this.board));
                tempState[move.index].piece = tempState[move.prevIndex].piece;
                tempState[move.prevIndex].piece = '';
                const bkCounterMoves = this.moveBlack(tempState);
                console.log(bkCounterMoves);

            }

            for (let i = 0; i < moveOptsWt.length; i++) {
                let index = this.board[move.index].rank * 8 + this.board[move.index].file;
                let prevIndex = this.board[move.prevIndex].rank * 8 + this.board[move.prevIndex].file;

                if (move.piece.piece === moveOptsWt[i][move.index].piece.piece && index === move.index && prevIndex === move.prevIndex) {
                    if (this.board[index].piece.piece !== this.board[prevIndex].piece.piece) {

                        switch (moveOptsWt[i][index].piece.piece) {
                            case 'q':
                                this.board[index].piece = new WhitePieces.Queen();
                                break;
                            case 'r':
                                this.board[index].piece = new WhitePieces.Rook();
                                break;
                            case 'b':
                                this.board[index].piece = new WhitePieces.Bishop();
                                break;
                            case 'n':
                                this.board[index].piece = new WhitePieces.Knight();
                                break;
                            default:
                                break;
                        }
                    }

                    this.board[move.index].piece = this.board[move.prevIndex].piece;

                    if (this.board[move.index].piece.hasMoved !== undefined) {
                        this.board[move.index].piece.hasMoved = true;
                    }

                    this.board[move.prevIndex].piece = '';
                    this.moveIndex.push(moveOptsWt[i]);

                    // add special cases for castling

                    if (moveOptsWt[i][move.index].piece.piece === 'k' && move.prevIndex === 4) {
                        // right side castle
                        if (move.index === 6) {
                            this.board[5].piece = this.board[7].piece;
                            this.board[7].piece = '';
                        }
                        // left side castle
                        if (move.index === 2) {
                            this.board[3].piece = this.board[0].piece;
                            this.board[0].piece = '';
                        }
                    }

                    return true;
                }
            }
            return false;
        } else {
            const tempArr = this.moveBlack();
            const moveOptsBk = [];

            // filter out nested objects into a pure array of boards(array[64])
            for (let i = 0; i < tempArr.length; i++) {
                for (let j = 0; j < tempArr[i].states.length; j++) {
                    moveOptsBk.push(tempArr[i].states[j]);
                }
            }

            this.turn = 'w';

            for (let i = 0; i < moveOptsBk.length; i++) {
                let index = this.board[move.index].rank * 8 + this.board[move.index].file;
                let prevIndex = this.board[move.prevIndex].rank * 8 + this.board[move.prevIndex].file;

                if (move.piece.piece === moveOptsBk[i][move.index].piece.piece && index === move.index && prevIndex === move.prevIndex) {
                    if (this.board[index].piece.piece !== this.board[prevIndex].piece.piece) {

                        switch (moveOptsBk[i][index].piece.piece) {
                            case 'q':
                                this.board[index].piece = new WhitePieces.Queen();
                                break;
                            case 'r':
                                this.board[index].piece = new WhitePieces.Rook();
                                break;
                            case 'b':
                                this.board[index].piece = new WhitePieces.Bishop();
                                break;
                            case 'n':
                                this.board[index].piece = new WhitePieces.Knight();
                                break;
                            default:
                                break;
                        }
                    }

                    this.board[move.index].piece = this.board[move.prevIndex].piece;

                    if (this.board[move.index].piece.hasMoved !== undefined) {
                        this.board[move.index].piece.hasMoved = true;
                    }

                    this.board[move.prevIndex].piece = '';
                    this.moveIndex.push(moveOptsBk[i]);
                    console.log(this.board[index].piece);

                    // add special cases for castling

                    if (moveOptsBk[i][move.index].piece.piece === 'k' && move.prevIndex === 60) {
                        // right side castle
                        if (move.index === 62) {
                            this.board[61].piece = this.board[63].piece;
                            this.board[63].piece = '';
                        }
                        // left side castle
                        if (move.index === 58) {
                            this.board[59].piece = this.board[56].piece;
                            this.board[56].piece = '';
                        }
                    }

                    return true;
                }
            }
            return false;
        }
    }

    minimax(legalMoves, player) {

        const moves = [];

        if (depth > 5) {
            return this.score;
        }

        for (let i = 0; i < legalMoves.length; i++) {
            const move = {};
            let score = 0;
            // make the move at the available location
            move.index = legalMoves[i];
            for (let j = 0; j < 64; j++) {
                if (legalMoves[i][j].piece) {
                    this.score += legalMoves[i][j].piece.value;
                }
            }
            // assign a numerical value to the move based on current state
            if (player === 'b') {
                const result = minimax(legalMoves, 'w');
                move.score = result.score;
            } else {
                const result = minimax(legalMoves, 'b');
                move.score = result.score;
            }

            legalMoves[i] = move.index;

            moves.push(move);
        }

        let bestMove;

        if (player === 'w') {

            let bestScore = -10000;

            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {

            let bestScore = 10000;

            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

        this.depth++;

        return moves[bestMove];

    }

    evaluateMove() {

    }
}

module.exports = Board;


