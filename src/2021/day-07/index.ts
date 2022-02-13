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