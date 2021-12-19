const fs = require("fs")

export const fileInputs = fs
  .readFileSync("inputs.txt", "utf8")
  .split(/\n/)
  .filter((v) => v)
  .map((x) => parseInt(x))

export const resolvePartOne = (inputs: number[]): number => {
  let count: number = 0
  inputs.forEach((el: number, i: number): void => {
    if (i !== 0) {
      count += inputs[i] - inputs[i - 1] > 0 ? 1 : 0
    }
  })
  return count
}

export const resolvePartTwo = (inputs: number[]): number => {
  let count: number = 0
  inputs.forEach((el: number, i: number): void => {
    if (i >= 3) {
      count += inputs[i] - inputs[i - 3] > 0 ? 1 : 0
    }
  })
  return count
}
