const fs = require("fs")
const path = require("path")

export type TTemplate = string
export type TPair = [string, string]
export type TInputs = [TTemplate, TPair]

export default (filename: string = "inputs.txt"): TInputs =>
  fs.readFileSync(path.resolve(__dirname, filename), "utf8")
  .split("\n").filter(e => e)
  .reduce((a, b, i) =>  
  {
    const arr = a;
    if (i === 0) 
      arr[0] = b
    else 
      arr[1].push(b.split(' -> '))
    return arr
  }
  ,["", []])