// https://adventofcode.com/2021/day/6

export const part1 = (inputs: number[], days = 80): number[] => 
{
  
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


export const part2 = (inputs: number[], days = 256): number[] => 
{
    const ipt = [...inputs]
    const groups :number[] = new Array(9).fill(0)
    
    ipt.forEach((e) => groups[e] += 1);
    console.log("groups", groups)


    // TODO
  for (let d = 0; d < days; d++) 
  {

    
  }
  
  return ipt

}