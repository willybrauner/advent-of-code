/**
 * 2024 - Day 8
 * https://adventofcode.com/2024/day/8
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Coords = [number, number]
type Input = string[][]

const useInput = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((e) => e.split(''))

const getAntennas = (input: Input): Map<string, Coords[]> => {
  const antennas = new Map<string, Coords[]>()
  for (let y = 0; y < input.length; y++)
    for (let x = 0; x < input[y].length; x++)
      if (input[y][x] !== '.')
        antennas.set(input[y][x], [
          ...(antennas.get(input[y][x]) || []),
          [y, x],
        ])
  return antennas
}

// prettier-ignore
const part1 = (input: Input) => {
  const antennas = getAntennas(input)
  const antinodes = new Set()
  antennas.forEach((list) => {
    for (let i = 0; i < list.length; i++) 
      for (let j = 0; j < list.length; j++) {
        if (i === j) continue
        const [y1, x1] = list[i]
        const [y2, x2] = list[j]
        const y = y2 + (y2 - y1)
        const x = x2 + (x2 - x1)
        if (!(y > input.length - 1 || y < 0 || x > input[0].length - 1 || x < 0)) 
          antinodes.add(`${y},${x}`)        
      }
    
  })
  return antinodes.size
}
log(part1(useInput('input')))

const part2 = (input: Input) => {
  return input
}
part2(useInput('input.test'))
