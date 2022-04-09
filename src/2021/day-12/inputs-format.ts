const fs = require("fs")
const path = require("path")

export default (filename: string = "inputs.txt") =>
  fs.readFileSync(path.resolve(__dirname, filename), "utf8")
    .split("\n")
    .map(e => e.split('-'))