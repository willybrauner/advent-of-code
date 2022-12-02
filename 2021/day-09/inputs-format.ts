const fs = require("fs")
const path = require("path")

/**
 * [
 *    [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
 *    [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
 *    ...
 * ]
 */
export type TInputs = number[][]
export default (filename: string = "inputs.txt") =>
  fs.readFileSync(path.resolve(__dirname, filename), "utf8")
  .split("\n")
  .map(e => e.split('')
  .map(e=> parseInt(e))) as TInputs