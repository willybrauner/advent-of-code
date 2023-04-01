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
        .replace('Sensor at x=', '')
        .replace(' y=', '')
        .split(',')
        .map(Number)
      const [bx, by] = b
        .replace('closest beacon is at x=', '')
        .replace(' y=', '')
        .split(',')
        .map(Number)
      return { sensor: { x: sx, y: sy }, beacon: { x: bx, y: by } }
    })

// -----------------------------------------------------------------------------

/**
 * Part 1
 */
// prettier-ignore
export const part1 = (input: Input, rowY = 10) => {
  const busy = new Set()

  for (let { sensor, beacon } of input)
  {
    const manhattan = Math.abs(beacon.x - sensor.x) + Math.abs(beacon.y - sensor.y)
    const d = manhattan - Math.abs(sensor.y - rowY)

    if (d < 0) continue

    for (let i = 0; i <= d - 1; i++)
      busy.add(sensor.x + i),
      busy.add(sensor.x - i)

    if (
      (beacon.x !== sensor.x + d || beacon.y !== rowY) ||
      (beacon.x !== sensor.x - d || beacon.y !== rowY)
    )
      busy.add(sensor.x + d)
  }
  return busy.size
}

log(part1(format('input'), 2000000))

/**
 * part2
 */
export const part2 = (input: Input) => {
  return input
}
part2(format('input.test'))
