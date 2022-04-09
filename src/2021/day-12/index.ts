// https://adventofcode.com/2021/day/12
const {log} = console

export const part1 = (inputs:[string, string][]) =>
 {

    /**
     * filter all pair who contains "start" | "end" | not start & not end
     * [
     *   // "starts" array
     *   [ 
     *      [ 'start', 'A' ], 
     *      [ 'start', 'b' ] 
     *   ],
     *   // "middles" array
     *   [ 
     *      [ 'A', 'b' ], 
     *      [ 'A', 'c' ], 
     *      [ 'b', 'd' ] 
     *   ],
     *   // "ends" array
     *   [ 
     *      [ 'A', 'end' ], 
     *      [ 'b', 'end' ] 
     *   ]
     * ]
     */
    const formatted = inputs.reduce((a, b:[string, string]) => 
    {
        if (b.includes('start'))    a[0] = [...(a?.[0] || []), b]
        else if (b.includes('end')) a[2] = [...(a?.[2] || []), b]
        else                        a[1] = [...(a?.[1] || []), b]
        return a
    }
    , [])

    const [starts, middles, ends] = formatted;
    

    // create paths
    // move on each segments 
    const path = []
    for(let start of starts)
    {
        for (let middle of middles)
        {
            for (let end of ends)
            {
                
            }
        }
    }

 }

export const part2 = (inputs) => {

}
