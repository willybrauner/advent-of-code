// https://adventofcode.com/2021/day/5

/**
 * convert input lines
 * 528,327 -> 651,450
 *
 * to
 *
 * [
 *  { x: 528, y: 327 },
 *  { x: 651, y: 450 }
 * ]
 */

const fs = require("fs")
const path = require("path")

export type TVent = { x: number; y: number }
export type TLine = [TVent, TVent]

export default (filename: string = "inputs-example.txt"): TLine[] => {
  const inputs = fs
    .readFileSync(path.resolve(__dirname, filename), "utf8")
    .split("\n")
    .map((el) =>
      el
        .split(" -> ")
        //   .map(el => el.split(',').map(el => parseInt(el)))
        .map((el) => ({
          x: parseInt(el.split(",")[0]),
          y: parseInt(el.split(",")[1]),
        }))
    )

  // console.log("inputs", inputs)
  return inputs
}
