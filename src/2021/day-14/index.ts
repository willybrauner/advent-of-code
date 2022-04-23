// https://adventofcode.com/2021/day/14

import { TInputs } from "./inputs-format"
const {log} = console


export const part1 = ([template, pairIntersections]: TInputs) =>
 {
    let tmpls: string = template
    
    let step = 0
    while(step < 10)
    {
        const tmpl = tmpls
        const tmplArr = tmpl.split("");

        for(let i = 0; i < tmpl.length - 1; i++)
        {    
            const currTemplatePair = tmpl.slice(i , 2+i);
            for(let pairInter of pairIntersections)
            {
                if (pairInter[0] === currTemplatePair)
                {   
                    let prev = ""
                    for (let p = 0; p < tmplArr.length; p++)
                    {
                        if (
                            pairInter[0][0] === prev[0] && 
                            pairInter[0][1] === tmplArr[p][0]
                        ){
                            tmplArr[i] = tmplArr[i][0] + pairInter[1]
                            tmpls = tmplArr.join('')
                        }
                        
                        prev = tmplArr[p]
                    }
                }
            }
        }

        step++
    }

    const letterCounters = tmpls.split("").reduce((a, b) => ({
        ...a,
        [b]: a[b] ? a[b]+1 : 1
    }), {})
    
    const sortableCounters = Object.entries(letterCounters)
    .sort(([,a]:[string, number], [,b]:[string, number])=> a - b)

    return  (
        (sortableCounters[sortableCounters.length - 1][1] as number) 
        - 
        (sortableCounters[0][1] as number)
    )

 }

export const part2 = (inputs) => {

}
 