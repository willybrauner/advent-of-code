// https://adventofcode.com/2021/day/15

import { TInputs } from "./inputs-format"
const {log} = console

export const part1 = (inputs:TInputs) =>
 {

    let risk = inputs[0][0]

    /**
     * Prepare graph for dijkstras Algorithm
     * ex: 
     * 1163751742
     * 1381373672
     * 
     const graph = [
        {1: { next: 1, down: 1 }}, -> x 0, y 0 
        {1: { next: 6, down: 3 }}, -> x 1, y 0 
     ]
     */
     const graph = []

    const move = (pY = 0,pX = 0) =>  
    {
        for (let y = pY; y < inputs.length; y+=1) 
        {
            for (let x = pX; x < inputs[y].length; x+=1) 
            {
    
                const curr = inputs?.[y]?.[x],
                      up   = inputs?.[y-1]?.[x],
                      down = inputs?.[y+1]?.[x],
                      prev = inputs?.[y]?.[x-1],
                      next = inputs?.[y]?.[x+1]
                
                graph.push({
                    [curr]: { next, down }
                })                    
                
            }

        }
    }

    move()

    log('graph',graph, graph.length)
    log('risk',risk)
 }

export const part2 = (inputs) => {

}
