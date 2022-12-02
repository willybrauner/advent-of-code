// https://adventofcode.com/2021/day/14

import { TInputs } from "./inputs-format"
const {log} = console

/**
 * Part 1
 */
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
                            break
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
    
    const sortable = Object.entries(letterCounters)
    .sort(([,a]:[string, number], [,b]:[string, number])=> a - b)

    return  (
        (sortable[sortable.length - 1][1] as number) 
        - 
        (sortable[0][1] as number)
    )

 }


 
 /**
  *  Part 2
  *  Should work for part 1 too.
  */
 export const part2 = ([template, pairIntersections]: TInputs) => 
 {

    let pairs = new Map();
    for (let i = 0; i < template.length - 1; i++) 
    {
        const a = template[i];
        const b = template[i + 1];
        const pair = a + b;
        pairs.set(pair, (pairs.get(pair) || 0) + 1);
    }

    let step = 0
    while(step < 40)
    {
        // create new pairs map on each
        let newPairs = new Map();

        for (let [pair, count] of pairs) {
            const [l1, l2] = pair
            const [,insert] = pairIntersections.find(e => e[0] === pair)
            if (insert) {
                const a = l1 + insert;
                const b = insert + l2;
                newPairs.set(a, count + (newPairs.get(a) || 0));
                newPairs.set(b, count + (newPairs.get(b) || 0));
            } 
        }
        pairs = newPairs;
        step++
    }

    // Calc totals
    // ex: { N: 4, C: 4, B: 4, H: 2 }
    const totals = {}; 
    for (let [pair, count] of pairs) {
        const [a, b] = pair
        if (!totals[a]) totals[a] = 0;
        if (!totals[b]) totals[b] = 0;
        totals[a] += count;
        totals[b] += count;
    }

    totals[template[0]]++;
    totals[template[template.length - 1]]++;
    // log("totals", totals)

    const sortable = Object.entries(totals)
    // devide each values par 2
    .map(([name, count]) => [name, (count as number) / 2])
    .sort(([,a]:[string, number], [,b]:[string, number])=> a - b)
    
    //log('sortable',sortable)

    return  (
        (sortable[sortable.length - 1][1] as number) 
        - 
        (sortable[0][1] as number)
    )
    
}
 