/**
 * 2025 - Day 4
 * https://adventofcode.com/2025/day/4
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
    .map((e) => e.split(''))

const getNeighbors = (input: Input, y: number, x: number) => {
  return [
    input[y - 1]?.[x],
    input[y - 1]?.[x + 1],
    input[y]?.[x + 1],
    input[y + 1]?.[x + 1],
    input[y + 1]?.[x],
    input[y + 1]?.[x - 1],
    input[y]?.[x - 1],
    input[y - 1]?.[x - 1],
  ].filter(Boolean)
}

const part1 = (input: Input) => {
  let accessed = 0
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const cell = input[y][x]
      if (cell === '.') continue
      // prettier-ignore
      accessed += getNeighbors(input, y, x)
        .reduce((a, b) => (b == '@' ? (a += 1) : a) ,0) < 4 ? 1 : 0
    }
  }
  return accessed
}
console.log(part1(useInput('input')))

const part2 = (input: Input) => {
  let accessed = 0
  let lastAccessed = null

  while (lastAccessed !== accessed) {
    // register last accessed count
    lastAccessed = accessed

    const accessedCells: [number, number][] = []
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        const cell = input[y][x]
        if (cell === '.' || cell === 'x') continue
        // prettier-ignore
        const isAccessed =
          getNeighbors(input, y, x)
            .reduce((a, b) => (b == '@' ? (a += 1) : a), 0) < 4

        if (isAccessed) {
          accessed += 1
          accessedCells.push([y, x])
        }
      }
    }
    // Mark accessed cells
    accessedCells.forEach(([y, x]) => (input[y][x] = 'x'))
  }
  return accessed
}

log(part2(useInput('input')))
