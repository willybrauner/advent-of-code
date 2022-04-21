// https://adventofcode.com/2021/day/14

import { TInputs } from "./inputs-format"
const {log} = console


export const part1 = ([template, pairIntersections]: TInputs) =>
 {
    //log(template, pairIntersections)
    const tmpls: string[] = [template]
    
    let step = 0
    while(step < 4)
    {
        const tmpl = tmpls[tmpls.length - 1]
        const tmplArr = tmpl.split("");
        log("------------- tmpl",tmpl)
        
        for(let i = 0; i < tmpl.length - 1; i++)
        {
            
            const currTemplatePair = tmpl.slice(i , 2+i);
            log("currTemplatePair",currTemplatePair)
            
            // parse pair instructions array 
            for(let pairInter of pairIntersections)
            {
                // if pair instructionnion = 
                if (pairInter[0] === currTemplatePair)
                {   
       
                    log("startingTemplate", tmplArr)

                    let prev = ""
                    for (let p = 0; p < tmplArr.length; p++)
                    {
                        //const realPrev = prev.split("")[prev.split("").length - 1]

                        if (
                            pairInter[0][0] === prev[0] && 
                            pairInter[0][1] === tmplArr[p][0]
                            )
                        {
        
                            // insert             
                            log("pairInter[1]",pairInter[1])           
                            tmplArr[i] = tmplArr[i][0] + pairInter[1]
                            log('startingTemplate --',tmplArr)
                            
                            //push insert in debut array
                            tmpls.push(tmplArr.join(''))

                        }
                        
                        prev = tmplArr[p]
                    }
                }
            }
        }

        
        log("step", step)
        log("tmpls", tmpls)
        log("tmpls last", tmpls[tmpls.length - 1])
        // NCNBCHB
        step++
    }


    

 }

export const part2 = (inputs) => {

}
 