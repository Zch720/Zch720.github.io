function puzzleGen() {
	var x1, y1, x2, y2;
	for(var i = 0, j; i < puzzleHeight * puzzleWidth * 2; i++) {
		x1 = random(0, puzzleHeight - 1), y1 = random(0, puzzleWidth - 1);
		x2 = random(0, puzzleHeight - 1), y2 = random(0, puzzleWidth - 1);
		while(x1 == puzzleHeight - 1 && y1 == puzzleWidth - 1) {
			x1 = random(0, puzzleHeight - 1);
			y1 = random(0, puzzleWidth - 1);
		}
		while((x2 == puzzleHeight - 1 && y2 == puzzleWidth - 1) || (x2 == x1 && y2 == y1)) {
			x2 = random(0, puzzleHeight - 1);
			y2 = random(0, puzzleWidth - 1);
		}
		j = puzzle[x1][y1], puzzle[x1][y1] = puzzle[x2][y2], puzzle[x2][y2] = j;
	}
}

function check() {
	var res = true;
	for(var i = 0; i < puzzleHeight && res; i++) {
		for(var j = 0; j < puzzleWidth && res; j++) {
			if(i == puzzleHeight - 1 && j == puzzleWidth - 1) break;
			if(puzzle[i][j].num != i * puzzleHeight + j + 1) res = false;
		}
	}
	return res;
}

