class Bishop {
    piece = 'b';
    value = 3;
    color = 'w';

    move(stateIn) {
        const states = [];
        let tempState = JSON.parse(JSON.stringify(stateIn));

        for (let i = 0; i < 64; i++) {
            if (stateIn[i].piece === this) {
                let file = stateIn[i].file;
                let rank = stateIn[i].rank;
                let index = rank * 8 + file;

                // search x & y diagonal possible squares
                if (file < 7 && rank < 7) {
                    file++;
                    rank++;

                    for (let j = file; j < 8 && rank < 8; j++) {
                        index = rank * 8 + j;
                        rank++;

                        if (stateIn[index].piece === '') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                        } else if (stateIn[index].piece.color === 'b') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                            // if capturing, all squares that extend beyond the capture are removed from options
                            break;
                        } else {
                            // cannot move to square occupied by own piece
                            break;
                        }
                    }
                }

                file = stateIn[i].file;
                rank = stateIn[i].rank;

                // search -x & -y diagonal possible squares
                if (file > 0 && rank > 0) {
                    file--;
                    rank--;

                    for (let j = file; j >= 0 && rank >= 0; j--) {
                        let index = rank * 8 + j;
                        rank--;

                        if (stateIn[index].piece === '') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                        } else if (stateIn[index].piece.color === 'b') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                            // if capturing, all squares that extend beyond the capture are removed from options
                            break;
                        } else {
                            // cannot move to square occupied by own piece
                            break;
                        }
                    }
                }

                file = stateIn[i].file;
                rank = stateIn[i].rank;

                // search x & -y diagonal possible squares
                if (file < 7 && rank > 0) {
                    file++;
                    rank--;

                    for (let j = file; j < 8 && rank >= 0; j++) {
                        let index = rank * 8 + j;
                        rank--;

                        if (stateIn[index].piece === '') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                        } else if (stateIn[index].piece.color === 'b') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                            // if capturing, all squares that extend beyond the capture are removed from options
                            break;
                        } else {
                            // cannot move to square occupied by own piece
                            break;
                        }
                    }
                }

                file = stateIn[i].file;
                rank = stateIn[i].rank;

                // search -x & y diagonal possible squares
                if (file > 0 && rank < 7) {
                    file--;
                    rank++;

                    for (let j = rank; j < 8 && file >= 0; j++) {
                        let index = j * 8 + file;
                        file--;

                        if (stateIn[index].piece === '') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                        } else if (stateIn[index].piece.color === 'b') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                            // if capturing, all squares that extend beyond the capture are removed from options
                            break;
                        } else {
                            // cannot move to square occupied by own piece
                            break;
                        }
                    }
                }

            }
        }

        // let count = 0;
        // for (let i = 0; i < states.length; i++) {
        //     for (let j = 0; j < states[i].length; j++) {
        //         if (states[i][j].piece && states[i][j].piece.color === 'w') {
        //             // console.log(states[i][j]);
        //             count++;
        //         }
        //     }
        // }
        // console.log(count);
        return { states, stateIn };
    }
}

class Knight {
    piece = 'n'
    value = 3;
    color = 'w';

    move(stateIn) {
        const states = [];
        let tempState = JSON.parse(JSON.stringify(stateIn));

        for (let i = 0; i < 64; i++) {
            if (stateIn[i].piece === this) {
                let file = stateIn[i].file;
                let rank = stateIn[i].rank;
                let index = rank * 8 + file;

                // govern the 8 possible movements of the knight from the greatest range

                // x - 1, y + 2
                index = (rank + 2) * 8 + file - 1;
                if (rank < 6 && file !== 0 && stateIn[index].piece.color !== 'w') {
                    tempState[index].piece = this; // move option
                    tempState[i].piece = '';
                    states.push(tempState);
                    tempState = JSON.parse(JSON.stringify(stateIn));
                }

                // x + 1, y + 2
                index = (rank + 2) * 8 + file + 1;
                if (rank < 6 && file !== 7 && stateIn[index].piece.color !== 'w') {
                    tempState[index].piece = this; // move option
                    tempState[i].piece = '';
                    states.push(tempState);
                    tempState = JSON.parse(JSON.stringify(stateIn));
                }

                // x - 1, y - 2
                index = (rank - 2) * 8 + file - 1;
                if (rank > 1 && file !== 0 && stateIn[index].piece.color !== 'w') {
                    tempState[index].piece = this; // move option
                    tempState[i].piece = '';
                    states.push(tempState);
                    tempState = JSON.parse(JSON.stringify(stateIn));
                }

                // x + 1, y - 2
                index = (rank - 2) * 8 + file + 1;
                if (rank > 1 && file !== 7 && stateIn[index].piece.color !== 'w') {
                    tempState[index].piece = this; // move option
                    tempState[i].piece = '';
                    states.push(tempState);
                    tempState = JSON.parse(JSON.stringify(stateIn));
                }

                // x + 2, y + 1
                index = (rank + 1) * 8 + file + 2;
                if (rank !== 7 && file < 6 && stateIn[index].piece.color !== 'w') {
                    tempState[index].piece = this; // move option
                    tempState[i].piece = '';
                    states.push(tempState);
                    tempState = JSON.parse(JSON.stringify(stateIn));
                }

                // x + 2, y - 1
                index = (rank - 1) * 8 + file + 2;
                if (rank !== 0 && file < 6 && stateIn[index].piece.color !== 'w') {
                    tempState[index].piece = this; // move option
                    tempState[i].piece = '';
                    states.push(tempState);
                    tempState = JSON.parse(JSON.stringify(stateIn));
                }

                // x - 2, y - 1
                index = (rank - 1) * 8 + file - 2;
                if (rank !== 0 && file > 1 && stateIn[index].piece.color !== 'w') {
                    tempState[index].piece = this; // move option
                    tempState[i].piece = '';
                    states.push(tempState);
                    tempState = JSON.parse(JSON.stringify(stateIn));
                }

                // x - 2, y + 1
                index = (rank + 1) * 8 + file - 2;
                if (rank !== 7 && file > 1 && stateIn[index].piece.color !== 'w') {
                    tempState[index].piece = this; // move option
                    tempState[i].piece = '';
                    states.push(tempState);
                    tempState = JSON.parse(JSON.stringify(stateIn));
                }
            }
        }

        // console.log('white knight ran from WhitePieces.js');
        // log out the possible moves

        // for (let i = 0; i < states.length; i++) {
        //     for (let j = 0; j < states[i].length; j++) {
        //         if (states[i][j].piece && states[i][j].piece.color === 'w') {
        //             console.log(states[i][j]);
        //         }
        //     }
        // }

        return { states, stateIn };
    }
}

class Rook {
    piece = 'r';
    value = 5;
    color = 'w';
    hasMoved = false;

    move(stateIn) {
        const states = [];
        let tempState = JSON.parse(JSON.stringify(stateIn));

        for (let i = 0; i < 64; i++) {

            if (stateIn[i].piece === this) {
                let file = stateIn[i].file;
                let rank = stateIn[i].rank;
                let index = rank * 8 + file;

                // search x possible squares
                if (file < 7) {
                    file++;

                    for (let j = file; j < 8; j++) {
                        index = rank * 8 + j;

                        if (stateIn[index].piece === '') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                        } else if (stateIn[index].piece.color === 'b') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                            // if capturing, all squares that extend beyond the capture are removed from options
                            break;
                        } else {
                            // cannot move to square occupied by own piece
                            break;
                        }
                    }
                }

                file = stateIn[i].file;
                rank = stateIn[i].rank;

                // search -x possible squares
                if (file > 0) {
                    file--;

                    for (let j = file; j >= 0; j--) {
                        index = rank * 8 + j;

                        if (stateIn[index].piece === '') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                        } else if (stateIn[index].piece.color === 'b') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                            // if capturing, all squares that extend beyond the capture are removed from options
                            break;
                        } else {
                            // cannot move to square occupied by own piece
                            break;
                        }
                    }
                }

                file = stateIn[i].file;
                rank = stateIn[i].rank;

                // search y possible squares
                if (rank < 7) {
                    rank++;

                    for (let j = rank; j < 8; j++) {
                        index = j * 8 + file;

                        if (stateIn[index].piece === '') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                        } else if (stateIn[index].piece.color === 'b') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                            // if capturing, all squares that extend beyond the capture are removed from options
                            break;
                        } else {
                            // cannot move to square occupied by own piece
                            break;
                        }
                    }
                }

                file = stateIn[i].file;
                rank = stateIn[i].rank;

                // search -y possible squares
                if (rank > 0) {
                    rank--;

                    for (let j = rank; j >= 0; j--) {
                        index = j * 8 + file;

                        if (stateIn[index].piece === '') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                        } else if (stateIn[index].piece.color === 'b') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                            // if capturing, all squares that extend beyond the capture are removed from options
                            break;
                        } else {
                            // cannot move to square occupied by own piece
                            break;
                        }
                    }
                }

            }
        }

        // for (let i = 0; i < states.length; i++) {
        //     for (let j = 0; j < states[i].length; j++) {
        //         if (states[i][j].piece && states[i][j].piece.color === 'w') {
        //             console.log(states[i][j]);
        //         }
        //     }
        // }

        return { states, stateIn };
    }
}

class Pawn {
    piece = 'p';
    value = 1;
    color = 'w';

    move(stateIn, prevState) {
        const states = [];
        let tempState = JSON.parse(JSON.stringify(stateIn));

        for (let i = 0; i < 64; i++) {

            if (stateIn[i].piece === this) {

                let file = stateIn[i].file;
                let rank = stateIn[i].rank;
                let index = rank * 8 + file;
                let indexB;

                // check for pawn passe option

                if (rank === 4) {
                    // left side capture
                    index = rank * 8 + file - 1;
                    indexB = (rank + 2) * 8 + file - 1;

                    if (file !== 0 && stateIn[index].piece.color === 'b' && stateIn[index].piece.piece === 'p' && prevState[prevState.length - 3][indexB].piece.color === 'b' && prevState[prevState.length - 3][indexB].piece.piece === 'p') {
                        tempState[index].piece = '';
                        rank = stateIn[i].rank;
                        file = stateIn[i].file;
                        rank++;
                        file--;
                        index = rank * 8 + file;
                        tempState[index].piece = this;
                        tempState[i].piece = '';
                        states.push(tempState);
                        tempState = JSON.parse(JSON.stringify(stateIn));
                    }
                    // right side capture
                    index = rank * 8 + file + 1;
                    indexB = (rank + 2) * 8 + file + 1;

                    if (file !== 7 && stateIn[index].piece.color === 'b' && stateIn[index].piece.piece === 'p' && prevState[prevState.length - 3][indexB].piece.color === 'b' && prevState[prevState.length - 3][indexB].piece.piece === 'p') {
                        tempState[index].piece = '';
                        rank = stateIn[i].rank;
                        file = stateIn[i].file;
                        rank++;
                        file++;
                        index = rank * 8 + file;
                        tempState[index].piece = this;
                        tempState[i].piece = '';
                        states.push(tempState);
                        tempState = JSON.parse(JSON.stringify(stateIn));
                    }
                }

                // handle promotion

                if (rank === 6) {

                    // move forward one square for promotion

                    rank++;
                    index = rank * 8 + file;

                    if (stateIn[index].piece === '') {
                        for (let j = 0; j < 4; j++) {
                            switch (j) {
                                case 0: tempState[index].piece = new Queen();
                                    break;
                                case 1: tempState[index].piece = new Rook();
                                    break;
                                case 2: tempState[index].piece = new Bishop();
                                    break;
                                case 3: tempState[index].piece = new Knight();
                                    break;
                                default:
                                    break;
                            }

                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                        }
                    }

                    rank = stateIn[i].rank;
                    file = stateIn[i].file;

                    // capture into promotion (left)

                    rank++;
                    file--;
                    index = rank * 8 + file;

                    if (stateIn[i].file !== 0 && stateIn[index].piece && stateIn[index].piece.color === 'b') {
                        for (let j = 0; j < 4; j++) {
                            switch (j) {
                                case 0: tempState[index].piece = new Queen();
                                    break;
                                case 1: tempState[index].piece = new Rook();
                                    break;
                                case 2: tempState[index].piece = new Bishop();
                                    break;
                                case 3: tempState[index].piece = new Knight();
                                    break;
                                default:
                                    break;
                            }

                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                        }
                    }

                    rank = stateIn[i].rank;
                    file = stateIn[i].file;

                    // capture into promotion (right)

                    rank++;
                    file++;
                    index = rank * 8 + file;

                    if (stateIn[i].file !== 7 && stateIn[index].piece && stateIn[index].piece.color === 'b') {
                        for (let j = 0; j < 4; j++) {
                            switch (j) {
                                case 0: tempState[index].piece = new Queen();
                                    break;
                                case 1: tempState[index].piece = new Rook();
                                    break;
                                case 2: tempState[index].piece = new Bishop();
                                    break;
                                case 3: tempState[index].piece = new Knight();
                                    break;
                                default:
                                    break;
                            }

                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                        }
                    }
                }

                rank = stateIn[i].rank;
                file = stateIn[i].file;

                // add 1 - 2 squares forward if unoccupied and pawn is in initial position and 1 square forward if not

                if (rank === 1) {
                    rank++;

                    for (let j = rank; j < 4; j++) {
                        index = j * 8 + file;

                        if (stateIn[index].piece === '') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                        } else {
                            break;
                        }
                    }
                }

                // add single forward square if empty and not promoting or in initial position

                rank = stateIn[i].rank;
                file = stateIn[i].file;

                if (rank > 1 && rank < 6) {
                    rank++;
                    index = rank * 8 + file;

                    if (stateIn[index].piece === '') {
                        tempState[index].piece = this; // move option
                        tempState[i].piece = '';
                        states.push(tempState);
                        tempState = JSON.parse(JSON.stringify(stateIn));
                    }
                }

                // handle capturing without promotion (left)

                rank = stateIn[i].rank;
                file = stateIn[i].file;
                rank++;
                file--;
                index = rank * 8 + file;

                if (stateIn[i].file !== 0 && stateIn[index].piece && stateIn[index].piece.color === 'b') {
                    tempState[index].piece = this;
                    tempState[i].piece = '';
                    states.push(tempState);
                    tempState = JSON.parse(JSON.stringify(stateIn));
                }

                // handle capturing without promotion (right)

                rank = stateIn[i].rank;
                file = stateIn[i].file;
                rank++;
                file++;
                index = rank * 8 + file;

                if (stateIn[i].file !== 7 && stateIn[index].piece && stateIn[index].piece.color === 'b') {
                    tempState[index].piece = this;
                    tempState[i].piece = '';
                    states.push(tempState);
                    tempState = JSON.parse(JSON.stringify(stateIn));
                }
            }
        }

        // log out the possible moves

        // for (let i = 0; i < states.length; i++) {
        //     for (let j = 0; j < states[i].length; j++) {
        //         if (states[i][j].piece && states[i][j].piece.color === 'w') {
        //             console.log(states[i][j]);
        //         }
        //     }
        // }

        return { states, stateIn };
    }
}

class Queen {
    piece = 'q';
    value = 9;
    color = 'w';

    move(stateIn) {
        const states = [];
        let tempState = JSON.parse(JSON.stringify(stateIn));

        for (let i = 0; i < 64; i++) {

            if (stateIn[i].piece === this) {
                let file = stateIn[i].file;
                let rank = stateIn[i].rank;

                // search x possible squares
                if (file < 7) {
                    file++;

                    for (let j = file; j < 8; j++) {
                        let index = rank * 8 + j;

                        if (stateIn[index].piece === '') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                        } else if (stateIn[index].piece.color === 'b') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                            // if capturing, all squares that extend beyond the capture are removed from options
                            break;
                        } else {
                            // cannot move to square occupied by own piece
                            break;
                        }
                    }
                }

                file = stateIn[i].file;
                rank = stateIn[i].rank;

                // search -x possible squares
                if (file > 0) {
                    file--;

                    for (let j = file; j >= 0; j--) {
                        let index = rank * 8 + j;

                        if (stateIn[index].piece === '') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                        } else if (stateIn[index].piece.color === 'b') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                            // if capturing, all squares that extend beyond the capture are removed from options
                            break;
                        } else {
                            // cannot move to square occupied by own piece
                            break;
                        }
                    }
                }

                file = stateIn[i].file;
                rank = stateIn[i].rank;

                // search y possible squares
                if (rank < 7) {
                    rank++;

                    for (let j = rank; j < 8; j++) {
                        let index = j * 8 + file;

                        if (stateIn[index].piece === '') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                        } else if (stateIn[index].piece.color === 'b') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                            // if capturing, all squares that extend beyond the capture are removed from options
                            break;
                        } else {
                            // cannot move to square occupied by own piece
                            break;
                        }
                    }
                }

                file = stateIn[i].file;
                rank = stateIn[i].rank;

                // search -y possible squares
                if (rank > 0) {
                    rank--;

                    for (let j = rank; j >= 0; j--) {
                        let index = j * 8 + file;

                        if (stateIn[index].piece === '') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                        } else if (stateIn[index].piece.color === 'b') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                            // if capturing, all squares that extend beyond the capture are removed from options
                            break;
                        } else {
                            // cannot move to square occupied by own piece
                            break;
                        }
                    }
                }

                file = stateIn[i].file;
                rank = stateIn[i].rank;

                // search x & y diagonal possible squares
                if (file < 7 && rank < 7) {
                    file++;
                    rank++;

                    for (let j = file; j < 8 && rank < 8; j++) {
                        let index = rank * 8 + j;
                        rank++;

                        if (stateIn[index].piece === '') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                        } else if (stateIn[index].piece.color === 'b') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                            // if capturing, all squares that extend beyond the capture are removed from options
                            break;
                        } else {
                            // cannot move to square occupied by own piece
                            break;
                        }
                    }
                }

                file = stateIn[i].file;
                rank = stateIn[i].rank;

                // search -x & -y diagonal possible squares
                if (file > 0 && rank > 0) {
                    file--;
                    rank--;

                    for (let j = file; j >= 0 && rank >= 0; j--) {
                        let index = rank * 8 + j;
                        rank--;

                        if (stateIn[index].piece === '') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                        } else if (stateIn[index].piece.color === 'b') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                            // if capturing, all squares that extend beyond the capture are removed from options
                            break;
                        } else {
                            // cannot move to square occupied by own piece
                            break;
                        }
                    }
                }

                file = stateIn[i].file;
                rank = stateIn[i].rank;

                // search x & -y diagonal possible squares
                if (file < 7 && rank > 0) {
                    file++;
                    rank--;

                    for (let j = file; j < 8 && rank >= 0; j++) {
                        let index = rank * 8 + j;
                        rank--;

                        if (stateIn[index].piece === '') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                        } else if (stateIn[index].piece.color === 'b') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                            // if capturing, all squares that extend beyond the capture are removed from options
                            break;
                        } else {
                            // cannot move to square occupied by own piece
                            break;
                        }
                    }
                }

                file = stateIn[i].file;
                rank = stateIn[i].rank;

                // search -x & y diagonal possible squares
                if (file > 0 && rank < 7) {
                    file--;
                    rank++;

                    for (let j = rank; j < 8 && file >= 0; j++) {
                        let index = j * 8 + file;
                        file--;

                        if (stateIn[index].piece === '') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                        } else if (stateIn[index].piece.color === 'b') {
                            tempState[index].piece = this; // move option
                            tempState[i].piece = '';
                            states.push(tempState);
                            tempState = JSON.parse(JSON.stringify(stateIn));
                            // if capturing, all squares that extend beyond the capture are removed from options
                            break;
                        } else {
                            // cannot move to square occupied by own piece
                            break;
                        }
                    }
                }
            }
        }

        // for (let i = 0; i < states.length; i++) {
        //     for (let j = 0; j < states[i].length; j++) {
        //         if (states[i][j].piece && states[i][j].piece.piece === 'q') {
        //             console.log(states[i][j]);
        //         }
        //     }
        // }
        // console.log(states);
        return { states, stateIn };
    }
}

class King {
    piece = 'k';
    value = 1000;
    color = 'w';
    hasMoved = false;
    calledFromSelf = true;

    move(stateIn) {
        const states = [];
        let tempState = JSON.parse(JSON.stringify(stateIn));
        let check = false;
        let crossCheckRight = false;
        let crossCheckLeft = false;

        // ensure king is in original position, at least one rook is in original position, and at least one side has an open path

        if (!this.hasMoved && this.calledFromSelf && (stateIn[0].piece.piece === 'r' || stateIn[7].piece.piece) && ((stateIn[1].piece === '' && stateIn[2].piece === '' && stateIn[3].piece === '') || (stateIn[5].piece === '' && stateIn[6].piece === '')) && (!stateIn[0].piece.hasMoved || !stateIn[7].piece.hasMoved)) {

            // iterate through enemy pieces to see if any are attacking the white king or the castle path

            const enemyState = [];
            const tempArr = [];

            for (let i = 0; i < 64; i++) {
                if (stateIn[i].piece && stateIn[i].piece.color === 'b') {
                    stateIn[i].piece.calledFromSelf = false;
                    tempArr.push(stateIn[i].piece.move(stateIn));
                    stateIn[i].piece.calledFromSelf = true;
                }
            }

            for (let i = 0; i < tempArr.length; i++) {
                for (let j = 0; j < tempArr[i].states.length; j++) {
                    enemyState.push(tempArr[i].states[j]);
                }
            }

            for (let i = 0; i < enemyState.length; i++) {
                if (enemyState[i][4].piece.color === 'b') {
                    console.log('white king is in check');
                    check = true;
                }

                if (enemyState[i][5].piece.color === 'b' || enemyState[i][6].piece.color === 'b' || (stateIn[12].piece.piece === 'p' && stateIn[12].piece.color === 'b') || (stateIn[14].piece.piece === 'p' && stateIn[14].piece.color === 'b') || (stateIn[15].piece.piece === 'p' && stateIn[15].piece.color === 'b')) {
                    console.log('cannot castle across check right side');
                    crossCheckRight = true;
                }

                if (enemyState[i][3].piece.color === 'b' || enemyState[i][2].piece.color === 'b' || (stateIn[9].piece.piece === 'p' && stateIn[9].piece.color === 'b') || (stateIn[10].piece.piece === 'p' && stateIn[10].piece.color === 'b') || (stateIn[12].piece.piece === 'p' && stateIn[12].piece.color === 'b')) {
                    console.log('cannot castle across check left side');
                    crossCheckLeft = true;
                }
            }

            if (!check) {

                // left side castle

                if (!crossCheckLeft && stateIn[0].piece.piece === 'r' && !stateIn[0].piece.hasMoved && stateIn[1].piece === '' && stateIn[2].piece === '' && stateIn[3].piece === '') {
                    tempState[3].piece = stateIn[0].piece;
                    tempState[0].piece = '';
                    tempState[2].piece = stateIn[4].piece;
                    tempState[4].piece = '';
                    states.push(tempState);
                    tempState = JSON.parse(JSON.stringify(stateIn));
                }

                // right side castle

                if (!crossCheckRight && stateIn[7].piece.piece === 'r' && !stateIn[7].piece.hasMoved && stateIn[6].piece === '' && stateIn[5].piece === '') {
                    tempState[5].piece = stateIn[7].piece;
                    tempState[7].piece = '';
                    tempState[6].piece = stateIn[4].piece;
                    tempState[4].piece = '';
                    states.push(tempState);
                    tempState = JSON.parse(JSON.stringify(stateIn));
                }
            }
        }

        // begin standard move analysis

        for (let i = 0; i < 64; i++) {



            if (stateIn[i].piece === this) {
                let file = stateIn[i].file;
                let rank = stateIn[i].rank;

                // check for ability to castle




                // search x possible squares
                if (file < 7) {
                    file++;

                    let index = rank * 8 + file;

                    if (stateIn[index].piece === '') {
                        tempState[index].piece = this; // move option
                        tempState[i].piece = '';
                        states.push(tempState);
                        tempState = JSON.parse(JSON.stringify(stateIn));
                    } else if (stateIn[index].piece.color === 'b') {
                        tempState[index].piece = this; // move option
                        tempState[i].piece = '';
                        states.push(tempState);
                        tempState = JSON.parse(JSON.stringify(stateIn));
                        // if capturing, all squares that extend beyond the capture are removed from options
                    } else {
                        // cannot move to square occupied by own piece
                    }
                }

                file = stateIn[i].file;
                rank = stateIn[i].rank;

                // search -x possible squares
                if (file > 0) {
                    file--;

                    let index = rank * 8 + file;

                    if (stateIn[index].piece === '') {
                        tempState[index].piece = this; // move option
                        tempState[i].piece = '';
                        states.push(tempState);
                        tempState = JSON.parse(JSON.stringify(stateIn));
                    } else if (stateIn[index].piece.color === 'b') {
                        tempState[index].piece = this; // move option
                        tempState[i].piece = '';
                        states.push(tempState);
                        tempState = JSON.parse(JSON.stringify(stateIn));
                        // if capturing, all squares that extend beyond the capture are removed from options
                    } else {
                        // cannot move to square occupied by own piece
                    }
                }

                file = stateIn[i].file;
                rank = stateIn[i].rank;

                // search y possible squares
                if (rank < 7) {
                    rank++;

                    let index = rank * 8 + file;

                    if (stateIn[index].piece === '') {
                        tempState[index].piece = this; // move option
                        tempState[i].piece = '';
                        states.push(tempState);
                        tempState = JSON.parse(JSON.stringify(stateIn));
                    } else if (stateIn[index].piece.color === 'b') {
                        tempState[index].piece = this; // move option
                        tempState[i].piece = '';
                        states.push(tempState);
                        tempState = JSON.parse(JSON.stringify(stateIn));
                        // if capturing, all squares that extend beyond the capture are removed from options
                    } else {
                        // cannot move to square occupied by own piece
                    }
                }

                file = stateIn[i].file;
                rank = stateIn[i].rank;

                // search -y possible squares
                if (rank > 0) {
                    rank--;

                    let index = rank * 8 + file;

                    if (stateIn[index].piece === '') {
                        tempState[index].piece = this; // move option
                        tempState[i].piece = '';
                        states.push(tempState);
                        tempState = JSON.parse(JSON.stringify(stateIn));
                    } else if (stateIn[index].piece.color === 'b') {
                        tempState[index].piece = this; // move option
                        tempState[i].piece = '';
                        states.push(tempState);
                        tempState = JSON.parse(JSON.stringify(stateIn));
                        // if capturing, all squares that extend beyond the capture are removed from options
                    } else {
                        // cannot move to square occupied by own piece
                    }
                }

                file = stateIn[i].file;
                rank = stateIn[i].rank;

                // search x & y diagonal possible squares
                if (file < 7 && rank < 7) {
                    file++;
                    rank++;

                    let index = rank * 8 + file;
                    rank++;

                    if (stateIn[index].piece === '') {
                        tempState[index].piece = this; // move option
                        tempState[i].piece = '';
                        states.push(tempState);
                        tempState = JSON.parse(JSON.stringify(stateIn));
                    } else if (stateIn[index].piece.color === 'b') {
                        tempState[index].piece = this; // move option
                        tempState[i].piece = '';
                        states.push(tempState);
                        tempState = JSON.parse(JSON.stringify(stateIn));
                        // if capturing, all squares that extend beyond the capture are removed from options
                    } else {
                        // cannot move to square occupied by own piece
                    }
                }

                file = stateIn[i].file;
                rank = stateIn[i].rank;

                // search -x & -y diagonal possible squares
                if (file > 0 && rank > 0) {
                    file--;
                    rank--;

                    let index = rank * 8 + file;
                    rank--;

                    if (stateIn[index].piece === '') {
                        tempState[index].piece = this; // move option
                        tempState[i].piece = '';
                        states.push(tempState);
                        tempState = JSON.parse(JSON.stringify(stateIn));
                    } else if (stateIn[index].piece.color === 'b') {
                        tempState[index].piece = this; // move option
                        tempState[i].piece = '';
                        states.push(tempState);
                        tempState = JSON.parse(JSON.stringify(stateIn));
                        // if capturing, all squares that extend beyond the capture are removed from options
                    } else {
                        // cannot move to square occupied by own piece
                    }
                }

                file = stateIn[i].file;
                rank = stateIn[i].rank;

                // search x & -y diagonal possible squares
                if (file < 7 && rank > 0) {
                    file++;
                    rank--;

                    let index = rank * 8 + file;
                    rank--;

                    if (stateIn[index].piece === '') {
                        tempState[index].piece = this; // move option
                        tempState[i].piece = '';
                        states.push(tempState);
                        tempState = JSON.parse(JSON.stringify(stateIn));
                    } else if (stateIn[index].piece.color === 'b') {
                        tempState[index].piece = this; // move option
                        tempState[i].piece = '';
                        states.push(tempState);
                        tempState = JSON.parse(JSON.stringify(stateIn));
                        // if capturing, all squares that extend beyond the capture are removed from options
                    } else {
                        // cannot move to square occupied by own piece
                    }
                }

                file = stateIn[i].file;
                rank = stateIn[i].rank;

                // search -x & y diagonal possible squares
                if (file > 0 && rank < 7) {
                    file--;
                    rank++;

                    let index = rank * 8 + file;
                    file--;

                    if (stateIn[index].piece === '') {
                        tempState[index].piece = this; // move option
                        tempState[i].piece = '';
                        states.push(tempState);
                        tempState = JSON.parse(JSON.stringify(stateIn));
                    } else if (stateIn[index].piece.color === 'b') {
                        tempState[index].piece = this; // move option
                        tempState[i].piece = '';
                        states.push(tempState);
                        tempState = JSON.parse(JSON.stringify(stateIn));
                        // if capturing, all squares that extend beyond the capture are removed from options
                    } else {
                        // cannot move to square occupied by own piece
                    }
                }
            }
        }

        // nested loop for logging specific piece changes

        // for (let i = 0; i < states.length; i++) {
        //     for (let j = 0; j < states[i].length; j++) {
        //         if (states[i][j].piece && (states[i][j].piece.piece === 'k' || states[i][j].piece.piece === 'r')) {
        //             console.log(states[i][j]);
        //         }
        //     }
        // }

        return { states, stateIn };
    }
}

module.exports = {
    Pawn,
    Knight,
    Bishop,
    Rook,
    Queen,
    King
};