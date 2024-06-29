// BFS
import Readline from "readline";

async function getInputList() {
  const readline = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let lineNumber = 1;
  let maxLine: number = 1;
  const input: string[] = [];
  let n = 0;
  let m = 0;
  for await (const line of readline) {
    if (lineNumber === 1) {
      const [_m, _n] = line.split(" ").map(Number);
      n = _n;
      m = _m;
      maxLine = m + 1;
    } else {
      input.push(line);
    }

    if (maxLine === lineNumber++ || line === "exit") {
      readline.close();
    }
  }

  return {n, m, input};
}

function move(
  board: string[][],
  d: {x: number; y: number},
  cur: {x: number; y: number}
) {
  for (let nx = d.x, ny = d.y, cnt = 0; ; nx += d.x, ny += d.y, cnt += 1) {
    const nextField = board[cur.y + ny][cur.x + nx];
    if (nextField === "#") {
      return {
        x: cur.x + nx - d.x,
        y: cur.y + ny - d.y,
        cnt,
      };
    } else if (nextField === "O") {
      return {
        x: cur.x + nx,
        y: cur.y + ny,
        cnt,
      };
    }
  }
}

async function main(): Promise<void> {
  const {n, m, input} = await getInputList();

  const board: string[][] = [];
  const visited: {
    bPos: {x: number; y: number};
    rPos: {x: number; y: number};
  }[] = [];
  let rPos: {x: number; y: number} = {x: 0, y: 0};
  let bPos: {x: number; y: number} = {x: 0, y: 0};
  for (let y = 0; y < m; y++) {
    board.push([]);
    for (let x = 0; x < n; x++) {
      board[y][x] = input[y][x];
      if (board[y][x] === "R") {
        rPos = {x, y};
      } else if (board[y][x] === "B") {
        bPos = {x, y};
      }
    }
  }

  const dList = [
    {x: 1, y: 0},
    {x: 0, y: -1},
    {x: -1, y: 0},
    {x: 0, y: 1},
  ];

  const queue: {
    bPos: {x: number; y: number};
    rPos: {x: number; y: number};
    cnt: number;
  }[] = [{bPos, rPos, cnt: 0}];

  let result = -1;
  for (;;) {
    const cur = queue.shift();
    if (!cur) {
      break;
    }

    visited.push({
      rPos: cur.rPos,
      bPos: cur.bPos,
    });

    if (cur.cnt > 10) {
      continue;
    }

    if (board[cur.bPos.y][cur.bPos.x] === "O") {
      continue;
    }

    if (board[cur.rPos.y][cur.rPos.x] === "O") {
      if (result === -1 || result > cur.cnt) {
        result = cur.cnt;
      }
    }

    for (const d of dList) {
      const nbPos = move(board, d, cur.bPos);
      const nrPos = move(board, d, cur.rPos);

      if (
        visited.find(
          (v) =>
            v.rPos.x === nrPos.x &&
            v.rPos.y === nrPos.y &&
            v.bPos.x === nbPos.x &&
            v.bPos.y === nbPos.y
        )
      ) {
        continue;
      }

      if (
        board[nbPos.y][nbPos.x] !== "O" &&
        board[nbPos.y][nbPos.x] !== "O" &&
        nbPos.x === nrPos.x &&
        nbPos.y === nrPos.y
      ) {
        if (nbPos.cnt > nrPos.cnt) {
          nbPos.x -= d.x;
          nbPos.y -= d.y;
        } else {
          nrPos.x -= d.x;
          nrPos.y -= d.y;
        }
      }

      if (
        nbPos.x !== cur.bPos.x ||
        nbPos.y !== cur.bPos.y ||
        nrPos.x !== cur.rPos.x ||
        nrPos.y !== cur.rPos.y
      ) {
        queue.push({
          bPos: nbPos,
          rPos: nrPos,
          cnt: cur.cnt + 1,
        });
      }
    }
  }

  console.log(result);
}
main();
