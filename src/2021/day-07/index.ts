// https://adventofcode.com/2021/day/7


export const part1 = (inputs: number[]) =>
{
    // calc mediane
    const sorted = inputs.sort((a, b) => a - b)
    const half = Math.floor(sorted.length / 2)
    const mediane =
        sorted.length % 2 === 0
        ? (sorted[half - 1] + sorted[half]) / 2
        : sorted[half]

    // final, calc fuel value
    let fuel = 0;
    for (let input of inputs) {
        fuel += Math.abs(mediane - input)
    }
    return fuel

}

export const part2 = (inputs: number[]):number =>
{
    /**

    ex: if the mediane is "1"

          1 *      fuel 0
    4 * * * *      fuel 1 + 2 + 3
      3 * * *      fuel 1 + 2
      3 * * *      fuel 1 + 2
  5 * * * * *      fuel 1 + 2 + 3 + 4
        2 * *      fuel 1 + 2
            0      fuel 1

     */

     const getFuel = (position: number, npts = inputs):number =>
     {
         // final, calc fuel value
         let fuel = 0;
         for (let input of npts)
         {
            let newInput = 0;
            let count = 0;
            for ( let i = Math.abs(position - input); i >= 0; i-- )
            {
                newInput += count++
            }
            fuel += newInput
        }
        return fuel
    }

    // calc mediane as starting point
    const sorted = [...inputs].sort((a, b) => a - b)
    const half = Math.floor(sorted.length / 2)
    const mediane =
        sorted.length % 2 === 0
        ? (sorted[half - 1] + sorted[half]) / 2
        : sorted[half]


    // check if fuel value decrease on previous or next value from the mediane
    const currPosFuel = getFuel(mediane)
    const nextPosFuel = getFuel(mediane + 1)
    const prevPosFuel = getFuel(mediane - 1)

    if (nextPosFuel < prevPosFuel)
    {
        let curr = currPosFuel;
        let m = mediane+1;
        while ( getFuel(m) < curr )
        {
            curr = getFuel(m)
            m++
        }
        return curr
    }
    else
    {
        let curr = currPosFuel;
        let m = mediane-1;
        while ( getFuel(m) < curr )
        {
            curr = getFuel(m)
            m--
        }
        return curr
    }

}
