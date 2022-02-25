const fs = require("fs")
const path = require("path")


/*

[
  [
    ["edbfga", "begcd", "cbg",  ...],
    [ ... ],  
  ]
]

*/

export type TInputs = number[][][]

export default (filename: string = "inputs.txt"):TInputs =>
  fs.readFileSync(path.resolve(__dirname, filename), "utf8")
  .split("\n")
  .map(el  => 
    el.split("|")
    .map(el => el.split(" ")
      .filter(el => el !== "")
    )
  )
