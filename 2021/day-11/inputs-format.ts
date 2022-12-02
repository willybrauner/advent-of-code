const fs = require("fs")
const path = require("path")

export default (filename: string = "inputs.txt") =>
  fs.readFileSync(path.resolve(__dirname, filename), "utf8")
    .split("\n")
    .filter(e => e)
    .map(el => el.split("").map(el => parseInt(el))
  ) as number[][]
