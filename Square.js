class Square {
    color;
    rank;
    file;
    piece = '';

    constructor(color, rank, file) {
        this.color = color;
        this.rank = rank;
        this.file = file;
    }
}

module.exports = Square;