// https://adventofcode.com/2021/day/14

import { TInputs } from "./inputs-format"
const {log} = console


export const part1 = ([template, pairIntersections]: TInputs) =>
 {
    //log(template, pairIntersections)
    let tmpls: string = template
    
    let step = 1
    while(step < 11)
    {
        const tmpl = tmpls
        const tmplArr = tmpl.split("");

        for(let i = 0; i < tmpl.length - 1; i++)
        {    
            const currTemplatePair = tmpl.slice(i , 2+i);
        
            // parse pair instructions array 
            for(let pairInter of pairIntersections)
            {
                // if pair instructionnion = 
                if (pairInter[0] === currTemplatePair)
                {   
                    let prev = ""
                    for (let p = 0; p < tmplArr.length; p++)
                    {
                        if (
                            pairInter[0][0] === prev[0] && 
                            pairInter[0][1] === tmplArr[p][0]
                        ){
                            // insert             
                            tmplArr[i] = tmplArr[i][0] + pairInter[1]
                            //push insert in debut array
                            tmpls = tmplArr.join('')
                        }
                        
                        prev = tmplArr[p]
                    }
                }
            }
        }

        
        // log("step", step)
        // log("tmpls", tmpls)
        log(`tmpls last ${step}`, tmpls)
    
        step++
    }

    //log('tmpls-----',tmpls)

    const letterCounters = tmpls.split("").reduce((a, b) => ({
        ...a,
        [b]: a[b] ? a[b]+1 : 1
    }), {})

    //log('letterCounters',letterCounters)
    
    const sortableCounters = Object.entries(letterCounters)
    .sort(([,a]:[string, number], [,b]:[string, number])=> a - b)

    //log('sortableCounters',sortableCounters)

    const biggest = sortableCounters[sortableCounters.length - 1][1] as number;
    const smallest = sortableCounters[0][1] as number;
    return  biggest - smallest

 }

export const part2 = (inputs) => {

}
 