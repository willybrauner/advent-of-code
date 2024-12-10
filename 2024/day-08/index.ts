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

const isAligned = ([y1, x1]: Coords, [y2, x2]: Coords) => {
  return (
    // match horizontal
    y1 === y2 ||
    // match vertical
    x1 === x2 ||
    // match diagonal
    Math.abs(x2 - x1) === Math.abs(y2 - y1)
  )
}

// only when one of the antennas is twice as far away as the other
const isRightDistance = ([y1, x1]: Coords, [y2, x2]: Coords) => {
  return Math.abs(x1 - x2) === Math.abs(y1 - y2) * 2
}

const part1 = (input: Input) => {
  const antennas = getAntennas(input)
  const antinodes = new Set()
  antennas.forEach((list, key) => {
    log(key, list)
    for (let i = 0; i < list.length; i++)
      for (let j = i + 1; j < list.length; j++)
        if (isAligned(list[i], list[j]) && isRightDistance(list[i], list[j])) {
          const midX = (list[i][1] + list[j][1]) / 2
          const midY = (list[i][0] + list[j][0]) / 2
          antinodes.add(`${midX},${midY}`)
        }
  })
  return antinodes.size
}
log(part1(useInput('input.test')))

const part2 = (input: Input) => {
  return input
}
part2(useInput('input.test'))
