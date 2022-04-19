const fs = require("fs")
const path = require("path")

//export default
export default (filename: string = "inputs.txt") =>
  fs.readFileSync(path.resolve(__dirname, filename), "utf8")
  .split('\n')
  .filter(el => el !== "")
    .reduce((a ,b) => {
      if (b.startsWith('fold')) 
      {
        const s = b.split(" ")
        const last = s[s.length - 1]
        const coor = last.split("=")
        a[1].push(coor.map(e => parseInt(e) ? parseInt(e) : e))
      }
      else 
      {
        a[0].push(b.split(",").map(e => parseInt(e)))
      }
      
      return a
    },[[], []])