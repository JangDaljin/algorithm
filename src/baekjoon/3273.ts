import {readFileSync} from "fs";
import {join} from "path";

function getInput() {
  const input = readFileSync(
    process.platform === "linux" ? "/dev/stdin" : join(__dirname, "3273")
  )
    .toString("utf-8")
    .split("\n");

  let _n: number;
  let _an: number[];
  let _x: number;
  for (let i = 0; ; i++) {
    if (i === 0) {
      _n = Number(input[i]);
    } else if (i === 1) {
      _an = input[i].split(" ").map(Number);
    } else {
      _x = Number(input[i]);
      if (i === 2) {
        break;
      }
    }
  }

  return {n: _n!, an: _an!, x: _x!};
}

function main() {
  const {n, an, x} = getInput();

  const arr = Array.from({length: 100001}, () => false);
  an.forEach((v) => (arr[v] = true));

  let cnt = 0;
  for (let i = 0; i < an.length; i++) {
    if (arr[x - an[i]] && x - an[i] !== an[i]) {
      //   console.log(an[i]);
      cnt++;
    }
  }
  console.log(cnt / 2);
}
main();
