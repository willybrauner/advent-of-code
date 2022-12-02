// https://adventofcode.com/2021/day/6

export const part1 = (inputs: number[], days = 80): number => 
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
  return ipt.length
}


export const part2 = (inputs: number[], days = 256): number => 
{
    const ipt = [...inputs]
    const groups :number[] = new Array(9).fill(0)
        
    ipt.forEach((e) => groups[e] += 1);

    for (let d = 0; d < days; d++) 
    {
        const newFish = groups.shift();
        groups[6] += newFish
        groups.push(newFish)
    }
  
    return groups.reduce((a, b) => a + b, 0)

}