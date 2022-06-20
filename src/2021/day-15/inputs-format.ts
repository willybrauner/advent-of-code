const fs = require("fs")
const path = require("path")

export type TInputs = (number)[][]

export default (filename: string = "inputs.txt"):TInputs =>
  fs.readFileSync(path.resolve(__dirname, filename), "utf8")
  .split(`\n`).map(e => e.split('').map(e => parseInt(e)))