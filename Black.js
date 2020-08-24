const BlackPieces = require('./BlackPieces');

class Black {
    pieces = [];
    castleRightsLeft = true;
    castleRightsRight = true;

    constructor() {

        this.pieces.push(new BlackPieces.King);
        this.pieces.push(new BlackPieces.Rook);
        this.pieces.push(new BlackPieces.Rook);
        this.pieces.push(new BlackPieces.Pawn);
        this.pieces.push(new BlackPieces.Pawn);

        // for (let i = 48; i < 64; i++) {
        //     if (i < 56) {
        //         this.pieces.push(new BlackPieces.Pawn(6, i % 8));
        //     } else {
        //         switch (i) {
        //             case 56:
        //                 this.pieces.push(new BlackPieces.Rook(7, i % 8));
        //                 break;
        //             case 57:
        //                 this.pieces.push(new BlackPieces.Knight(7, i % 8));
        //                 break;
        //             case 58:
        //                 this.pieces.push(new BlackPieces.Bishop(7, i % 8));
        //                 break;
        //             case 59:
        //                 this.pieces.push(new BlackPieces.Queen(7, i % 8));
        //                 break;
        //             case 60:
        //                 this.pieces.push(new BlackPieces.King(7, i % 8));
        //                 break;
        //             case 61:
        //                 this.pieces.push(new BlackPieces.Bishop(7, i % 8));
        //                 break;
        //             case 62:
        //                 this.pieces.push(new BlackPieces.Knight(7, i % 8));
        //                 break;
        //             case 63:
        //                 this.pieces.push(new BlackPieces.Rook(7, i % 8));
        //                 break;
        //             default:
        //                 break;
        //         }
        //     }
        // }
    }
}

module.exports = Black;