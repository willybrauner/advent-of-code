/**
 * 2022 - Day 15
 * https://adventofcode.com/2022/day/15
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Coord = { x: number; y: number }
type Group = { sensor: Coord; beacon: Coord }
type Input = Group[]

export const format = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .map((l) => l.split(':'))
    .filter((e) => e.filter((e) => e).length)
    .map(([s, b], _) => {
      const [sx, sy] = s
        ?.replace('Sensor at x=', '')
        .replace(' y=', '')
        .split(',')
        .map(Number)
      const [bx, by] = b
        ?.replace('closest beacon is at x=', '')
        .replace(' y=', '')
        .split(',')
        .map(Number)
      return { sensor: { x: sx, y: sy }, beacon: { x: bx, y: by } }
    })

// -----------------------------------------------------------------------------

const getManhattanDistance = (sensor: Coord, beacon: Coord) =>
  Math.abs(beacon.x - sensor.x + beacon.y - sensor.y)

/**
 * Part 1
 */
export const part1 = (input: Input) => {
  log(input)

  for (let { sensor, beacon } of input) {
    log(getManhattanDistance(sensor, beacon))
  }

  return input
}
part1(format('input.test'))

/**
 * part2
 */
export const part2 = (input: Input) => {
  return input
}
part2(format('input.test'))
