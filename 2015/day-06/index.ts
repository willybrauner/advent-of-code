/**
 * 2015 - Day 6
 * https://adventofcode.com/2015/day/6
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Coords = [number, number]
type Instruction = {
  action: 'turn on' | 'turn off' | 'toggle'
  from: Coords
  to: Coords
}
type Input = Instruction[]
export const useInput = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .map((e) => e.split('through ').join(''))
    .reduce((a, b) => {
      const spl = b.split(' ')
      const [from, to] = spl
        .splice(-2)
        .map((e) => e.split(',').map((e) => parseInt(e)))
      const action = spl.join(' ')
      a.push({ action, from, to })
      return a
    }, [])

const GRID_LENGTH = 1000

const createGrid = (): number[][] => {
  const arr = []
  for (let i = 0; i < GRID_LENGTH; i++) arr.push(new Array(GRID_LENGTH).fill(0))
  return arr
}

const parseAndMute = (
  grid: number[][],
  from: Coords,
  to: Coords,
  cb: (grid: number[][], x: number, y: number) => void,
) => {
  for (let y = 0; y < grid.length; y++)
    for (let x = 0; x < grid[y].length; x++) {
      const isInRange = y >= from[1] && y <= to[1] && x >= from[0] && x <= to[0]
      if (isInRange) {
        cb(grid, x, y)
      }
    }
}

const part1 = (input: Input) => {
  const grid = createGrid()

  for (let { action, from, to } of input) {
    if (action === 'turn on') {
      parseAndMute(grid, from, to, (grid, x, y) => (grid[y][x] = 1))
    }
    if (action === 'turn off') {
      parseAndMute(grid, from, to, (grid, x, y) => (grid[y][x] = 0))
    }
    if (action === 'toggle') {
      parseAndMute(grid, from, to, (grid, x, y) => {
        grid[y][x] = grid[y][x] === 0 ? 1 : 0
      })
    }
  }
  return [...grid].reduce((a, b) => {
    return a + b.filter(Boolean).length
  }, 0)
}
part1(useInput('input'))

const part2 = (input: Input) => {
  const grid = createGrid()

  for (let { action, from, to } of input) {
    if (action === 'turn on') {
      parseAndMute(grid, from, to, (grid, x, y) => {
        grid[y][x]++
      })
    }
    if (action === 'turn off') {
      parseAndMute(grid, from, to, (grid, x, y) => {
        if (grid[y][x] > 0) grid[y][x]--
      })
    }
    if (action === 'toggle') {
      parseAndMute(grid, from, to, (grid, x, y) => {
        grid[y][x] = grid[y][x] + 2
      })
    }
  }
  // console.log(` ${grid.map((e) => e + `\n`)}`.replaceAll(',', ' '))
  return [...grid].reduce((a, b) => {
    return a + b.reduce((a, b) => a + b, 0)
  }, 0)
}
log(part2(useInput('input')))
