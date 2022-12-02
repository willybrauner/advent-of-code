// https://adventofcode.com

export const part1 = (inputs: number[][]) =>
  inputs
    .reduce((a, b) => [...a, b.reduce((a, b) => a + b)], [])
    .sort((a, b) => b - a)[0]

export const part2 = (inputs: number[][]) =>
  inputs
    .reduce((a, b) => [...a, b.reduce((a, b) => a + b)], [])
    .sort((a, b) => b - a)
    .filter((e, i) => i < 3)
    .reduce((a, b) => a + b)
