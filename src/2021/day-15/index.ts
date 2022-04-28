// https://adventofcode.com/2021/day/15

import { TInputs } from "./inputs-format"
const {log} = console

export const part1 = (inputs:TInputs) =>
 {

    let risk = inputs[0][0]

    const move = (pY = 0,pX = 0) =>  
    {
        for (let y = pY; y < inputs.length; y+=1) {
            for (let x = pX; x < inputs[y].length; x+=1) {
                const dirs = {
                    // up: [y-1,x],
                    // prev: [y,x-1],
                    next: [y,x+1],
                    down: [y+1,x],
                }
                const dirsArr: [string, number[]][] = Object.entries(dirs)

                const getValue = ([y,x]:number[]) => inputs?.[y]?.[x]
                
                const selected = dirsArr.reduce((a,b) => 
                     getValue(a[1]) < getValue(b[1]) ? a : b
                , dirsArr[0]);

                const [dir, [sY, sX]] = selected
                // log("--selected",selected, getValue([sY, sX]))
                                
                if (inputs?.[sY]?.[sX]) 
                    risk += inputs[sY][sX]
                
                if (!inputs?.[y+1]?.[x] && !inputs?.[y]?.[x+1]){
                    log('No down & no right, stop here')
                    break
                }
                
                return move(sY, sX)
                
            }
        
        }
    }
    move()

    log('risk',risk)
 }

export const part2 = (inputs) => {

}
