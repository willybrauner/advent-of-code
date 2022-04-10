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
      at this point, paths, looks like:
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

    return paths.filter(el => el[el.length - 1] === "end").length;

}





export const part2 = (inputs:[string, string][]) =>
 {
    // arr of path arrays 
    let paths = []

    // create path function called recursively
    const createPath = (curr:string[], npts = inputs) :void =>
    {
        const last = curr[curr.length - 1];
        
        if(last === "end") return

        const els = npts.filter(arr => arr.includes(last))

        const vals = []
        for (let i = 0; i<els.length; i+=1) {
            const val = els[i].find((e) => (e !== last) && e !== "start")
            vals.push(val)
        }

        for(let val of vals) {

            if (!val) continue;


            // This is the part-2 difference, 
            // we want to accept to move to small cave twice, only once.
            // The counters allow us to know how many time we move to small caves 
            // in this curr path
            const counters = curr.reduce((a,b) => 
            {
                return (isLowerCase(b) && b !== "start")
                 ? {
                    ...a,
                    [b]: a?.[b] != null ? a[b]+1 : 1
                }
                : a;
            }, {})

            if (

                // like in first part
                !(curr.includes(val) && isLowerCase(val)) 
                || 
                // the new part-2 check
                !Object.values(counters).some(e => e === 2)
            )
            {   
                const n = [...curr, val];
                paths.push(n)
                createPath(n)
            }
        } 
    }

    // start path creation with start as first value
    createPath(["start"])    

    return paths.filter(el => el[el.length - 1] === "end").length;

}
