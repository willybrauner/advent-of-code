// https://adventofcode.com/2021/day/14

import { TInputs } from "./inputs-format"
const {log} = console

const STEPS = 1

export const part1 = ([template, pairIntersections]: TInputs) =>
 {
    let tmpls: string = template
    
    let step = 0
    while(step < STEPS)
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
                            break
                        }
                        
                        prev = tmplArr[p]
                    }
                }
            }
        }

        step++
    }

    log('tp', tmpls)
    const letterCounters = tmpls.split("").reduce((a, b) => ({
        ...a,
        [b]: a[b] ? a[b]+1 : 1
    }), {})
    
    const sortableCounters = Object.entries(letterCounters)
    .sort(([,a]:[string, number], [,b]:[string, number])=> a - b)

    log('sortableCounters' ,sortableCounters)

    return  (
        (sortableCounters[sortableCounters.length - 1][1] as number) 
        - 
        (sortableCounters[0][1] as number)
    )

 }


 
 export const part2 = ([template, pairIntersections]: TInputs) => 
 {
    log('------------------------------------------------------- PART 2')

    const letters = template.split("").reduce((a, b) => ({ ...a, [b]: a[b] ? a[b]+1 : 1 }), {})
    
    const pairs = {}
    for(let i = 0; i < template.length - 1; i++) 
        pairs?.[template.slice(i , 2+i)] 
            ? pairs[template.slice(i , 2+i)]++ 
            : pairs[template.slice(i , 2+i)] = 1

    let step = 0
    while(step < STEPS)
    {
        //log("pairs", pairs) // { NN: 1, NC: 1, CB: 1 }
        for (let tPair of Object.keys(pairs)) {
            for (let [[l1, l2], insert] of pairIntersections) {
                if (tPair === l1+l2) {
                    pairs[l1+insert] ? pairs[l1+insert]++ : pairs[l1+insert] = 1
                    pairs[insert+l2] ? pairs[insert+l2]++ : pairs[insert+l2] = 1        
                }        
            }
        }

        step++
    }

    log("pairs", pairs) 

    for (let tPair of Object.keys(pairs)) {
        for (let [[l1, l2], insert] of pairIntersections) {
            if (tPair === l1+l2) {
                 letters[insert] ? letters[insert] += pairs[tPair] : letters[insert] = 1
            }
        }
    }

    const sortableCounters = Object.entries(letters)
    .sort(([,a]:[string, number], [,b]:[string, number])=> a - b)

    log('sortableCounters',sortableCounters)

    return  (
        (sortableCounters[sortableCounters.length - 1][1] as number) 
        - 
        (sortableCounters[0][1] as number)
    )
    
}
 