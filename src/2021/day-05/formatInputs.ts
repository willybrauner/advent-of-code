import { TLine } from "."

const fs = require("fs")
const path = require("path")

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

export default (filename: string = "inputs.txt"): TLine[] =>
  fs
    .readFileSync(path.resolve(__dirname, filename), "utf8")
    .split("\n")
    .map((el) =>
      el.split(" -> ").map((el) => ({
        x: parseInt(el.split(",")[0]),
        y: parseInt(el.split(",")[1]),
      }))
    )
