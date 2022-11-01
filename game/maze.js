class Stack {
	constructor() {
		this.stack = []
	}
	push(val) {
		this.stack.push(val);
	}
	pop() {
		return this.stack.pop();
	}
	empty() {
		return this.stack.length == 0;
	}
	size() {
		return this.stack.length;
	}
}

//disjoint set
function find_p(child) {
	if(p[child] == child) return child;
	return p[child] = find_p(p[child]);
}

//maze
function mazeInit() {
	for(var i = 0, c = 1; i < mazeHeight * 2 + 1; i++) {
		for(var j = 0; j < mazeWidth * 2 + 1; j++) {
			if(i % 2 && j % 2) maze[i][j] = p[c] = c++;
			else maze[i][j] = 0;
		}
	}
}

function mazeGen() {
	mazeInit();
	var t = 0, c = mazeHeight * mazeWidth - 1, mod;
	while(t != c) {
		mod = rand() % 2;
		if(mod) {
			x = (rand() % mazeHeight) * 2 + 1;
			y = (rand() % (mazeWidth - 1) + 1) * 2;
			if(find_p(maze[x][y - 1]) != find_p(maze[x][y + 1])) {
				maze[x][y] = 1;
				p[p[maze[x][y - 1]]] = p[maze[x][y + 1]];
				t++;
			}
		} else {
			x = (rand() % (mazeHeight - 1) + 1) * 2;
			y = (rand() % mazeWidth) * 2 + 1;
			if(find_p(maze[x - 1][y]) != find_p(maze[x + 1][y])) {
				maze[x][y] = 1;
				p[p[maze[x - 1][y]]] = p[maze[x + 1][y]];
				t++;
			}
		}
	}
	findAns();
}

function findAns() {
	var stack = new Stack();
	var pos;
	var xp = [-1, 1, 0, 0], yp = [0, 0, -1, 1];
	stack.push({x: 1, y: 1});

	for(var i = 0; i < mazeHeight * 2 + 1; i++) {
		for(var j = 0; j < mazeWidth * 2 + 1; j++)
			if(maze[i][j]) maze[i][j] = -1;
	}
	maze[1][1] = 1;

	while(!stack.empty()) {
		pos = stack.pop();
		var index = maze[pos.x][pos.y];

		for(var i = 0; i < 4; i++) {
			if(maze[pos.x + xp[i]][pos.y + yp[i]] && maze[pos.x + xp[i]][pos.y + yp[i]] != index - 1) {
				maze[pos.x + xp[i]][pos.y + yp[i]] = index + 1;
				stack.push({x: pos.x + xp[i], y: pos.y + yp[i]});
			}
		}
	}

	pos = {x: mazeHeight * 2 - 1, y: mazeWidth * 2 - 1};
	while(pos.x != 1 || pos.y != 1) {
		var index = maze[pos.x][pos.y];
		maze[pos.x][pos.y] = -1;
		for(var i = 0; i < 4; i++) {
			if(maze[pos.x + xp[i]][pos.y + yp[i]] == index - 1) {
				pos = {x: pos.x + xp[i], y: pos.y + yp[i]};
				break;
			}
		}
	}
	maze[1][1] = -1;

	ansDraw();
}

function mazeDraw() {
	mazeContext.clearRect(0, 0, width, height);
	mazeContext.beginPath();
	for(var i = 0; i < mazeHeight * 2 + 1; i++) {
		if(i % 2) {
			for(var j = 0; j < mazeWidth * 2 + 1; j += 2) {
				if(maze[i][j]) continue;
				x = beginX + j / 2 * size;
				y = beginY + (i - 1) / 2 * size;
				mazeContext.moveTo(x, y);
				mazeContext.lineTo(x, y + size);
			}
		} else {
			for(var j = 1; j < mazeWidth * 2 + 1; j+= 2) {
				if(maze[i][j]) continue;
				x = beginX + (j - 1) / 2 * size;
				y = beginY + i / 2 * size;
				mazeContext.moveTo(x, y);
				mazeContext.lineTo(x + size, y);
			}
		}
		mazeContext.lineWidth = 1;
		mazeContext.stroke();
	}
	mazeContext.fillStyle = 'rgb(0, 255, 0)';
	mazeContext.fillRect(beginX + 1, beginY + 1, size - 2, size - 2);
	mazeContext.fillStyle = 'rgb(255, 0, 0)';
	mazeContext.fillRect(beginX + (mazeWidth - 1) * size + 1, beginY + (mazeHeight - 1) * size + 1, size - 2, size - 2);
}

function ansDraw() {
	ansContext.clearRect(0, 0, width, height);
	ansContext.beginPath();
	ansContext.fillStyle = '#f75c3f';
	for(var i = 0; i < mazeHeight; i++) {
		for(var j = 0; j < mazeWidth; j++) {
			if(maze[i * 2 + 1][j * 2 + 1] == -1) {
				ansContext.fillRect(beginX + j * size, beginY + i * size, size, size);
			}
		}
	}
}
