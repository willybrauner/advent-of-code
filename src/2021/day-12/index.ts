// https://adventofcode.com/2021/day/12

const {log} = console
const isLowerCase = (input:string) :boolean => input === String(input).toLowerCase()
  
export const part1 = (inputs:[string, string][]) =>
 {
    // arr of path arrays 
    let paths = []

    // create path function called recursively
    const createPath = (curr:string[], npts = inputs) :void =>
    {
        const last = curr[curr.length - 1];
        
        if(last === "end") return
    
        const els = npts.filter(arr => arr.includes(last))

        const vals =[]
        for (let i = 0; i<els.length; i+=1) {
            const val = els[i].find((e) => (e !== last) && e !== "start")
            vals.push(val)
        }

        for(let val of vals) {
            if (!val || (curr.includes(val) && isLowerCase(val))) continue
            const n = [...curr, val];
            paths.push(n)

            // restart with new param ex: ['start', 'b', 'A']
            // used as starting path
            createPath(n)
        } 
    }

    // start path creation with start as first value
    createPath(["start"])

    /**
     * log(paths)
      at this point, paths, looks likes:
     [
      [ 'start', 'A' ],
      [ 'start', 'A', 'c' ],
      [ 'start', 'A', 'c', 'A' ],
      [ 'start', 'A', 'c', 'A', 'b' ],
      [ 'start', 'A', 'c', 'A', 'b', 'A' ],
      [ 'start', 'A', 'c', 'A', 'b', 'A', 'end' ],
      [ 'start', 'A', 'c', 'A', 'b', 'd' ],
      ...
    ]
    
    We need to only keep completed paths witch included "start" and "end"
    */
    
    const filterPaths = paths.filter(el => el[el.length - 1] === "end")    
    return filterPaths.length;

}







export const part2 = (inputs) => {

}
