import {readFileSync} from "fs";
import {join} from "path";

function getInput() {
  const input = readFileSync(
    process.platform === "linux" ? "/dev/stdin" : join(__dirname, "15565")
  )
    .toString("utf-8")
    .split("\n");

  let m: number = 0;
  let arr: number[] = [];
  for (let i = 0; ; i++) {
    if (i === 0) {
      const [_n, _m] = input[i].split(" ").map(Number);
      m = _m;
    } else if (i === 1) {
      input[i]
        .split(" ")
        .map(Number)
        .forEach((v) => arr.push(v));
    } else {
      break;
    }
  }

  return {m, arr};
}

function main(): void {
  const {m, arr} = getInput();

  let iList: number[] = [];
  let min = 1000001;
  let si = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 1) {
      iList.push(i);

      if (iList.length >= m) {
        min = Math.min(min, iList[iList.length - 1] - iList[si++] + 1);
      }
    }
  }
  if (min === 1000001) {
    console.log(-1);
  } else {
    console.log(min);
  }
}
main();
