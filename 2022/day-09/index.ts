/**
 * 2022 - Day 09
 *  https://adventofcode.com/2022/day/9
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()



type Direction = 'R' | 'U' | 'L' | 'D';
type Input = [Direction, number][]

export const format = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter((e) => e)
    .map((e) =>
      e.split(' ').map((e, i) => (i == 1 ? parseInt(e) : e))
    ) as Input

const resolve = (input: Input, rope: [number, number][]) => {
  const visited = new Set()

  const moveHead = (direction) => {
    if (direction === 'U') rope[0][1]++
    if (direction === 'D') rope[0][1]--
    if (direction === 'L') rope[0][0]--
    if (direction === 'R') rope[0][0]++
  }

  const moveTail = () => {
    for (let i = 1; i < rope.length; i++) {
      const [hx, hy] = rope[i - 1]
      const [tx, ty] = rope[i]
      const dx = hx - tx
      const dy = hy - ty
      if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1) return
      if (dy !== 0) rope[i][1] += dy > 0 ? 1 : -1
      if (dx !== 0) rope[i][0] += dx > 0 ? 1 : -1
    }
  }

  for (let i = 0; i < input.length; i++) {
    const [direction, move] = input[i]
    for (let j = 0; j < move; j++) {
      moveHead(direction)
      moveTail()
      visited.add(`${rope[rope.length - 1][0]}-${rope[rope.length - 1][1]}`)
    }
  }
  return visited.size
}

/**
 * Part 1
 */
export const part1 = (input: Input) => {
  return resolve(input, [
    [0, 0],
    [0, 0],
  ])
}
log(part1(format('input.test')))

/**
 * part2
 */
export const part2 = (input: Input) => {
  return resolve(input, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ])
}
log(part2(format('input.test')))
