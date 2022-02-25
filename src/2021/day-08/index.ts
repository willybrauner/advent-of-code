// https://adventofcode.com/2021/day/8

import {TInputs} from "./formatInputs"


export const part1 = (inputs: TInputs) =>
inputs
    .map(el => el.filter((el, i) =>  i === 1)).flat().flat()
    .reduce((acc, curr) => 
    {
        const l = curr.length
        return (l === 2 || l === 4 || l === 3 || l === 7)
            ? acc + 1
            : acc
    }, 0)

export const part2 = (inputs) =>
{
   
}