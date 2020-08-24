let board_global;
let crntBoardState = [];
let newBoardState = [];
let white = true;
let dragged;
let pieceHTML;
let prevSquare;
let score;
let turn = 'w';
const move = {
    piece: '',
    index: 0,
    prevIndex: 0
};

$(document).ready(() => {

    $('#side').click(() => {
        $.post('/api/sidechg');
        if (white) {
            $('#side').text('Play as White');
            $('#board').css('transform', 'rotate(180deg)');
            $('.piece').css('transform', `rotate(180deg)`);
        } else {
            $('#side').text('Play as Black');
            $('#board').css('transform', 'rotate(0deg)');
            $('.piece').css('transform', `rotate(0deg)`);
        }

        white = !white;
    });

    $('.select').click(e => {
        const id = e.currentTarget.id;
        console.log(id);
        switch (id) {
            case 'wq':
                move.piece.piece = 'q';
                console.log('wq case ran');
                break;
            case 'wr':
                move.piece.piece = 'r';
                break;
            case 'wb':
                move.piece.piece = 'b';
                break;
            case 'wn':
                move.piece.piece = 'n';
                break;
            case 'bq':
                move.piece.piece = 'q';
                break;
            case 'br':
                move.piece.piece = 'r';
                break;
            case 'bb':
                move.piece.piece = 'b';
                break;
            case 'bn':
                move.piece.piece = 'n';
                break;
            default:
                break;
        }

        sendMove();
        $('.menu').css('display', 'none');
    });

    $.get('/api', data => {
        board_global = data;
        crntBoardState = JSON.parse(JSON.stringify(data.board));
        newBoardState = JSON.parse(JSON.stringify(data.board));
        score = data.score;
        buildBoard(data.board);
    });
});

function allowDrop(e) {

    if (white && dragged === 'w') {
        e.preventDefault();
    }

    if (!white & dragged === 'b') {
        e.preventDefault();
    }
}

function drag(e) {
    prevSquare = $(e.currentTarget).parent()[0];
    dragged = $(e.currentTarget).attr('data-piece').search(/[A-Z]/g) ? 'b' : 'w';
    pieceHTML = $(e.currentTarget)[0];

    if (white && dragged === 'w') {
        e.dataTransfer.setData("text", e.target.id);
    }

    if (!white && dragged === 'b') {
        e.dataTransfer.setData("text", e.target.id);
    }
}

function drop(e) {
    // piece and pieceColor represent the color of the piece occupying the destination square
    const piece = $(e.currentTarget).children()[0];
    let pieceColor;
    let prevIndex;

    if (piece !== undefined) {
        pieceColor = $(piece).attr('data-piece').search(/[A-Z]/g) ? 'b' : 'w';
    }

    if (turn === 'w' && white && dragged === 'w' && pieceColor !== 'w') {
        e.preventDefault();
        const data = e.dataTransfer.getData("text");
        e.target.appendChild(document.getElementById(data));

        if (pieceColor === 'b') {
            $(e.currentTarget).empty();
            $(e.currentTarget).append(pieceHTML);
        }
        const index = parseInt($(e.currentTarget).attr('data-index'));
        prevIndex = parseInt($(prevSquare).attr('data-index'));
        newBoardState[index].piece = JSON.parse(JSON.stringify(crntBoardState[prevIndex].piece));
        newBoardState[prevIndex].piece = "";
        move.index = index;
        move.piece = newBoardState[index].piece;
        move.prevIndex = prevIndex;

        if (move.piece.piece === 'p' && move.index > 55) {
            $('#choose-piece-wt').css('display', 'flex');
        } else {
            sendMove();
        }
    }

    if (turn === 'b' && !white && dragged === 'b' && pieceColor !== 'b') {
        e.preventDefault();
        const data = e.dataTransfer.getData("text");
        e.target.appendChild(document.getElementById(data));

        if (pieceColor === 'w') {
            $(e.currentTarget).empty();
            $(e.currentTarget).append(pieceHTML);
        }
        const index = parseInt($(e.currentTarget).attr('data-index'));
        prevIndex = parseInt($(prevSquare).attr('data-index'));
        newBoardState[index].piece = JSON.parse(JSON.stringify(crntBoardState[prevIndex].piece));
        newBoardState[prevIndex].piece = "";
        move.index = index;
        move.piece = newBoardState[index].piece;
        move.prevIndex = prevIndex;

        if (move.piece.piece === 'p' && move.index < 8) {
            $('#choose-piece-bk').css('display', 'flex');
        } else {
            sendMove();
        }
    }

    // sendMove() sends the move to the server for validation *************************************
}

function sendMove() {

    $.ajax({
        url: '/api/move',
        type: 'POST',
        data: JSON.stringify(move),
        contentType: 'application/json; charset=utf8',
        dataType: 'json',
        success: data => {
            if (data !== 400) {
                crntBoardState = data;
            } else {
                // take back move if it fails validation
                if (turn === 'b') {
                    turn = 'w';
                } else {
                    turn = 'b';
                }

                console.log('invalid move');
            }
            $('#board').empty();
            buildBoard(crntBoardState);

            if (turn === 'b') {
                turn = 'w';
            } else {
                turn = 'b';
            }

        }
    });
}

function buildBoard(board) {
    let file = 0;
    let rank = 0;
    let color;
    let image = '';
    let piece = '';

    $('#score').text(score);

    $('#board').append(`<tr data-rank=${rank}></tr>`);

    for (let i = 0; i < 64; i++) {
        if (i !== 0 && i % 8 === 0) {
            // console.log(rank);
            file = 0;
            rank++;
            $('#board').prepend(`<tr data-rank=${rank}></tr>`);

        }

        if (board[i].color === 'b') {
            color = '#779556';
        } else {
            color = '#ebecd0';
        }

        if (board[i].piece) {
            if (board[i].piece.color === 'w') {
                switch (board[i].piece.piece) {
                    case 'p':
                        image = `<img id=${i} src="white_pawn.png" class="piece" data-piece="P" draggable="true" ondragstart="drag(event)" />`;
                        break;
                    case 'n':
                        image = `<img id=${i} src="white_knight.png" class="piece" data-piece="N" draggable="true" ondragstart="drag(event)" />`;
                        break;
                    case 'b':
                        image = `<img id=${i} src="white_bishop.png" class="piece" data-piece="B" draggable="true" ondragstart="drag(event)" />`;
                        break;
                    case 'r':
                        image = `<img id=${i} src="white_rook.png" class="piece" data-piece="R" draggable="true" ondragstart="drag(event)" />`;
                        break;
                    case 'k':
                        image = `<img id=${i} src="white_king.png" class="piece" data-piece="K" draggable="true" ondragstart="drag(event)" />`;
                        break;
                    case 'q':
                        image = `<img id=${i} src="white_queen.png" class="piece" data-piece="Q" draggable="true" ondragstart="drag(event)" />`;
                        break;
                    default:
                        break;
                }
            } else {
                switch (board[i].piece.piece) {
                    case 'p':
                        image = `<img id=${i} src="black_pawn.png" class="piece" data-piece="p" draggable="true" ondragstart="drag(event)" />`;
                        break;
                    case 'n':
                        image = `<img id=${i} src="black_knight.png" class="piece" data-piece="n" draggable="true" ondragstart="drag(event)" />`;
                        break;
                    case 'b':
                        image = `<img id=${i} src="black_bishop.png" class="piece" data-piece="b" draggable="true" ondragstart="drag(event)" />`;
                        break;
                    case 'r':
                        image = `<img id=${i} src="black_rook.png" class="piece" data-piece="r" draggable="true" ondragstart="drag(event)" />`;
                        break;
                    case 'k':
                        image = `<img id=${i} src="black_king.png" class="piece" data-piece="k" draggable="true" ondragstart="drag(event)" />`;
                        break;
                    case 'q':
                        image = `<img id=${i} src="black_queen.png" class="piece" data-piece="q" draggable="true" ondragstart="drag(event)" />`;
                        break;
                    default:
                        break;
                }
            }
        } else {
            image = '';
            piece = '';
        }

        $(`tr[data-rank=${rank}]`).append(`<td id="td-${i}"" data-index="${i}" data-rank="${rank}" data-file="${file}" style="background-color:${color}" ondrop="drop(event)" ondragover="allowDrop(event)">${image}</td>`);
        file++;
    }

    if (!white) {
        $('.piece').css('transform', `rotate(180deg)`);
    }
}

