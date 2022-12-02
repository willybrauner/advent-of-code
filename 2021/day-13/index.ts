// https://adventofcode.com/2021/day/13
import { TInputs } from "./inputs-format"
const {log} = console


// create matrix for each parts
const createMatrix = (coords) => 
{
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

    return matrix
}

export const part1 = (inputs: TInputs) =>
 {
    const [coords, folds] = inputs
    const matrix = createMatrix(coords)

    // get first coords
    const [fAxis, fValue] = folds[0]

    if (fAxis === "y") {
        // fold by removing arrays below Y fValue
        matrix.splice(fValue)

        for (const coord of coords) 
        {
            const [x, y] = coord
            if (y > fValue && matrix?.[fValue - (y - fValue)]?.[x])
                matrix[fValue - (y - fValue)][x] = "#"
        }
    }

    if (fAxis === "x") {
        // fold by removing arrays after X fValue
        matrix.map(y => y.splice(fValue))

        for (const coord of coords) 
        {
            const [x, y] = coord
            if (x > fValue && matrix?.[y]?.[fValue - (x - fValue)])
                matrix[y][fValue - (x - fValue)] = "#"
        }
    }

    return matrix.reduce((a,b) =>
        a + b.reduce((c,d) => d === "#" ? c+1 :c, 0)
    ,0)

 }


export const part2 = (inputs: TInputs) => {

    const [coords, folds] = inputs
    const matrix = createMatrix(coords)
    let newCoords = coords

    for (const [fAxis, fValue] of folds) 
    {
        if (fAxis === "y") 
        {
            for (const coord of newCoords) 
            {
                const [x, y] = coord
                if (matrix?.[fValue - (y - fValue)]?.[x])
                    matrix[fValue - (y - fValue)][x] = "#"
            }
            
            // fold on X axis
            matrix.splice(fValue)

        }

        if (fAxis === "x") 
        {
            for (const coord of newCoords) 
            {
                const [x, y] = coord
                if (matrix?.[y]?.[fValue - (x - fValue)])
                    matrix[y][fValue - (x - fValue)] = "#"
            }

            // fold on Y axis
            matrix.map(y => y.splice(fValue))
        }

        // calc new coords after fold
        newCoords = []
        for(let y = 0; y < matrix.length; y++)
            for(let x = 0; x < matrix[y].length; x++)
                if (matrix[y][x] === "#") newCoords.push([x, y])

    }


}
