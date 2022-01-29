// https://adventofcode.com/2021/day/6
import formatInputs from "./formatInputs"

export const part1 = (inputs: number[], days = 80) => {
  
  const ipt = [...inputs]

  for (let d = 0; d < days; d++) 
  {

        for(let i in ipt)
        {
            if ( ipt[i] === 0 )
            {
                ipt[i] = 6;
                ipt.push(8);
            }
            else 
            {
                ipt[i] -= 1;
            }

        }
        
  }
    return ipt


}
