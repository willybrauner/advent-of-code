// https://adventofcode.com/2021/day/9

export const part1 = (inputs) =>
 {
    const lowerPoints = [];

    for (let i = 0; i < inputs.length; i++) 
    {
        for (let p = 0; p < inputs[i].length; p++) 
        {       
            const point = inputs[i][p]
            const adj = {
                prev: inputs[i][p - 1],
                next: inputs[i][p + 1],
                up: inputs[i-1]?.[p],
                down: inputs[i+1]?.[p],
            }

            /*
            Print current points as:

                        2
                      4 5 1     
                        7

            console.log(`
                ${" "} ${adj.up ?? ""}
                ${adj.prev ?? ""} ${point} ${adj.next ?? ""}
                ${" "} ${adj.down ?? ""}
            `)
            */

            if (Object.values(adj).filter(e => e !== undefined).map(a => point < a).every(e => e)) 
            {
                lowerPoints.push(point)
            }
        }   
    }
    return lowerPoints.reduce((prev, curr) => prev + (curr+ 1), 0)
 }


export const part2 = (inputs) => 
{
    const bassins = [];

    for (let i = 0; i < inputs.length; i++) 
    {
        for (let p = 0; p < inputs[i].length; p++) 
        {   
            const point = inputs[i][p]
            const adj = {
                prev: inputs[i][p - 1],
                next: inputs[i][p + 1],
                up: inputs[i-1]?.[p],
                down: inputs[i+1]?.[p],
            }

            if (
                Object.values(adj)
                .filter(e => e !== undefined)
                .map(a => point < a)
                .every(e => e)) 
            {
                // start at 1 because current point add 1 to the bassin size
                let basinSize = 1                

                const search = (currPoint:number, pI:number, pP:number):void => 
                {
                    const npt = inputs?.[pI]?.[pP];
                    if (
                        npt !== undefined && 
                        npt > currPoint &&
                        npt < 9
                        ){
                         // exclude this current npt
                         inputs[pI][pP] = 9;
                         basinSize++;
                        
                         // execute search() recursively
                         search(npt, pI, pP-1) 
                         search(npt, pI, pP+1) 
                         search(npt, pI-1, pP) 
                         search(npt, pI+1, pP) 
                    }
                }

                // start seach around
                search(point, i, p-1)
                search(point, i, p+1)
                search(point, i-1, p)
                search(point, i+1, p)

                bassins.push(basinSize)

            }
        }   
    }

    return bassins.sort((a, b) => a - b).slice(-3).reduce((a, b)=> a*b,1)
}
