/**
 * 2024 - Day
 * https://adventofcode.com/2024/day/
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = string[][]
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .map((line) => line.split(''))

const part1 = (input: Input) => {
  const match = (arr: string[]) => arr.filter(Boolean).join('XMAS')


  const coords = [-3, -2, -1, 0, 1, 2, 3].map((_, i) => [
    [0 + i, 0 + i],
    [0 + i, 1 + i],
    [1 + i, 0 + i],
    [1 + i, 1, + i],
    [1 + i, -1 + i],
    [-1 + i, 0 + i],
    [-1 + i, -1 + i],
    [-1 + i, 1 + i],
  ])

  log(coords)

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const char = input[y][x]
      // log(char)
    }
  }
  return input
}

part1(useInput('input.test'))

const part2 = (input: Input) => {
  return input
}
part2(useInput('input.test'))
