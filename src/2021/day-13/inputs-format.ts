const fs = require("fs")
const path = require("path")

//export default
export default (filename: string = "inputs.txt") =>
  fs.readFileSync(path.resolve(__dirname, filename), "utf8")
  .split('\n')
  .filter(el => el !== "")
    .reduce((a ,b) => {
      if (b.startsWith('fold')) {
        
        // TODO formater 
        // [ 'fold along y=7', 'fold along x=5' ]
        // en [{y:7}, {x,5}]
        a[1].push(b)
      }
      else {
        a[0].push(b.split(",").map(e => parseInt(e)))
      }
      
      return a
    },[[], []])