//최소 스패닝 트리

/*
3 3
1 2 1
2 3 2
1 3 3
*/

import Readline from "readline";

async function getInputList() {
  const readline = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const inputList: string[] = [];
  for await (const line of readline) {
    inputList.push(line);
  }

  readline.close();
  return inputList;
}

async function main() {
  const inputList = await getInputList();
  const [firstLine, ...edges] = inputList;
  const [n, m] = firstLine.split(" ").map(Number);

  const edgeList: {node: number; cost: number}[][] = [];
  for (let i = 0; i < n; i++) {
    edgeList.push([]);
  }
  edges.forEach((line) => {
    const [v1, v2, c] = line.split(" ").map(Number);
    edgeList[v1 - 1].push({node: v2 - 1, cost: c});
    edgeList[v2 - 1].push({node: v1 - 1, cost: c});
  });

  const visitedList: boolean[] = Array.from({length: n}, () => false);
  visitedList[0] = true;

  const queue: {node: number; cost: number}[] = [];
  edgeList[0].forEach((edge) => {
    queue.push(edge);
  });

  let cost = 0;
  for (;;) {
    queue.sort((a, b) => a.cost - b.cost);

    const edge = queue.shift();
    if (!edge) {
      break;
    }

    if (visitedList[edge.node]) {
      continue;
    }

    visitedList[edge.node] = true;
    cost += edge.cost;

    edgeList[edge.node].forEach((e) => {
      if (!visitedList[e.node]) {
        queue.push(e);
      }
    });
  }

  console.log(cost);
}
main();
