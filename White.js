const WhitePieces = require('./WhitePieces');

class White {
    pieces = [];

    constructor() {

        this.pieces.push(new WhitePieces.King());
        this.pieces.push(new WhitePieces.Rook());
        this.pieces.push(new WhitePieces.Rook());
        this.pieces.push(new WhitePieces.Pawn());
        this.pieces.push(new WhitePieces.Pawn());

        // for (let i = 0; i < 16; i++) {
        //     if (i >= 8) {
        //         this.pieces.push(new WhitePieces.Pawn(1, i - 8));
        //     } else {
        //         switch (i) {
        //             case 0:
        //                 this.pieces.push(new WhitePieces.Rook(0, i));
        //                 break;
        //             case 1:
        //                 this.pieces.push(new WhitePieces.Knight(0, i));
        //                 break;
        //             case 2:
        //                 this.pieces.push(new WhitePieces.Bishop(0, i));
        //                 break;
        //             case 3:
        //                 this.pieces.push(new WhitePieces.Queen(0, i));
        //                 break;
        //             case 4:
        //                 this.pieces.push(new WhitePieces.King(0, i));
        //                 break;
        //             case 5:
        //                 this.pieces.push(new WhitePieces.Bishop(0, i));
        //                 break;
        //             case 6:
        //                 this.pieces.push(new WhitePieces.Knight(0, i));
        //                 break;
        //             case 7:
        //                 this.pieces.push(new WhitePieces.Rook(0, i));
        //                 break;
        //             default:
        //                 break;
        //         }
        //     }
        // }
    }
}

module.exports = White;