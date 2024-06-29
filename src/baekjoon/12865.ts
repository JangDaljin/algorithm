//이차원 DP
import Readline from "readline";

async function getInputList() {
  const readline = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let lineNumber = 1;
  let maxLine: number = 1;
  const inputList: string[] = [];
  let n = 0;
  let m = 0;
  for await (const line of readline) {
    if (lineNumber === 1) {
      const [_n, _m] = line.split(" ").map(Number);
      n = _n;
      m = _m;
      maxLine = n + 1;
    } else {
      inputList.push(line);
    }

    if (maxLine === lineNumber++ || line === "exit") {
      readline.close();
    }
  }

  return {n, m, inputList};
}

async function getDp(dp: number[][], nextK: number, nextWvi: number) {}

async function main(): Promise<void> {
  const {n, m, inputList} = await getInputList();

  const wvList = inputList
    .map((input) => input.split(" ").map(Number))
    .map(([w, v]) => ({w, v}));
  const dp: number[][] = Array.from({length: m + 1}, () =>
    Array.from({length: n}, () => 0)
  );

  for (let k = 0; k <= m; k++) {
    for (let wvi = 0; wvi < wvList.length; wvi++) {
      let beforeDpValue: number;
      if (k - wvList[wvi].w < 0 || wvi - 1 < 0) {
        beforeDpValue = 0;
      } else {
        beforeDpValue = dp[k - wvList[wvi].w][wvi - 1];
      }

      let beforeValue: number;
      if (wvi - 1 < 0) {
        beforeValue = 0;
      } else {
        beforeValue = dp[k][wvi - 1];
      }

      let currentValue: number;
      if (k >= wvList[wvi].w) {
        currentValue = Math.max(wvList[wvi].v + beforeDpValue, beforeValue);
      } else {
        currentValue = beforeValue;
      }

      dp[k][wvi] = currentValue;
    }
  }

  console.log(dp[m][n - 1]);
}
main();
