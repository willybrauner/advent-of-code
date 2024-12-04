/**
 * 2024 - Day 4
 * https://adventofcode.com/2024/day/4
 */
import fs from 'fs'
import path, { resolve } from 'path'
const { log, clear } = console
clear()

type Input = string[][]
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .map((line) => line.split(''))

const part1 = (input: Input) => {
  // prettier-ignore
  const dirs = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 0], [0, 1],
    [1, -1], [1, 0] , [1, 1],
  ]
  const coords = (y: number, x: number): number[][][] =>
    dirs.map(([dy, dx]) =>
      new Array(4).fill(null).map((_, i) => [y + i * dy, x + i * dx]),
    )

  let count = 0
  for (let y = 0; y < input.length; y++)
    for (let x = 0; x < input[y].length; x++)
      for (let dir of coords(y, x)) {
        const letters = []
        for (let [cy, cx] of dir) letters.push(input?.[cy]?.[cx] || '')
        if (letters.join('') == 'XMAS') count++
      }

  return count
}

log(part1(useInput('input')))

const part2 = (input: Input) => {
  return input
}
part2(useInput('input.test'))
