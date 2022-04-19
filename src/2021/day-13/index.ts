// https://adventofcode.com/2021/day/13
import { TInputs } from "./inputs-format"
const {log} = console


export const part1 = (inputs: TInputs) =>
 {
    const [coords, folds] = inputs

     // get biggests X & Y
     const [bX, bY] = coords.reduce((a, b) => 
     {
         let arr = []
         for(let i of [0, 1])
            arr[i] = (b[i] > a[i]) ? b[i] : a[i]
         return arr
     }, [0,0])
     
    // create matrix
    const matrix = 
        new Array(bY + 1)
        .fill(null)
        .map(()=> new Array(bX + 1).fill('.'))
        
    // mark values on matrix
    for (const coord of coords) {
        const [x, y] = coord
        matrix[y][x] = "#"
    }

    // process fold
    // calc new value "v": 
    // v = f - (x-f)
    log(folds)
    for (const [fAxis, fValue] of folds) 
    {
        if (fAxis === "y") {

            matrix.splice(fValue)
            for (const coord of coords) 
            {
                const [x, y] = coord
                if (y > fValue && matrix?.[fValue - (y - fValue)]?.[x])
                    matrix[fValue - (y - fValue)][x] = "#"
            }
            // fold by removing arrays below Y fValue
        }

        if (fAxis === "x") {

            matrix.map(y => y.splice(fValue))
            for (const coord of coords) 
            {
                const [x, y] = coord
                if (x > fValue && matrix?.[y]?.[fValue - (x - fValue)])
                    matrix[y][fValue - (x - fValue)] = "#"
            }
        }
        
        // break for first part on first fold   
        break
    }
    
    log(matrix)


    const counter = matrix.reduce((a,b) =>
        a + b.reduce((c,d) => d === "#" ? c+1 :c, 0)
    ,0)

    log(counter)
    return counter

 }

export const part2 = (inputs: TInputs) => {

}
