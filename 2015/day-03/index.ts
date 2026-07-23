/**
 * 2015 - Day 3
 * https://adventofcode.com/2015/day/3
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Dirs = '>' | '<' | 'v' | '^'
type Input = Dirs[]
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs.readFileSync(path.resolve(__dirname, filename), 'utf8').split('') as Input

const part1 = (input: Input) => {
  const parseCoords = (curr: string) => curr.split(',').map((e) => parseInt(e))
  const grid = new Set<string>()
  let coords: string = '0,0'
  grid.add(coords)
  for (let i = 0; i < input.length; i++) {
    const dir = input[i]
    const [y, x] = parseCoords(coords)
    if (dir == '>') coords = `${y},${x + 1}`
    if (dir == '<') coords = `${y},${x - 1}`
    if (dir == '^') coords = `${y - 1},${x}`
    if (dir == 'v') coords = `${y + 1},${x}`
    grid.add(coords)
  }
  return grid.size
}
log(part1(useInput('input')))

const part2 = (input: Input) => {
  return input
}
part2(useInput('input.test'))
