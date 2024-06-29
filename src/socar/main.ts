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

async function main() {}
main();

[].findLastIndex;
