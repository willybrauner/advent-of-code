/**
 * 2022 - Day 12
 *  https://adventofcode.com/2022/day/12
 */

import fs from 'fs'
import path from 'path'
import { dijkstra } from './dijkstra'
const { log, clear } = console
clear()

export type TInput = number[][]

export const format = (filename: 'input.test' | 'input'): TInput =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter((e) => e)
    .map((e) =>
      e.split('').map((e) => {
        if (e === 'S') return 0
        if (e === 'E') return 26
        return e.charCodeAt(0) - 96
      })
    )

/**
 * Part 1
 */
export const part1 = (input: TInput) => {
  //  log(input)
  // log(input.map((e) => e.toString()))
  const getNeighbors = ([y, x]) =>
    [
      [y - 1, x],
      [y + 1, x],
      [y, x + 1],
      [y, x - 1],
    ].reduce(
      (a, [pY, pX]) => [...a, ...(input?.[pY]?.[pX] ? [[pY, pX]] : [])],
      []
    )

  const getCostBetweenVertices = (_, [y2, x2]) => input[y2][x2]

  const isTarget = (vertex) => vertex.every((coord, i) => coord === [2, 5][i])

  const { count, distances } = dijkstra<[number, number]>(
    getNeighbors,
    getCostBetweenVertices,
    [0, 0],
    isTarget
  )

  //  log(distances)
  log(count, Object.keys(distances).length)

  return input
}
part1(format('input.test'))

/**
 * part2
 */
export const part2 = (input: TInput) => {
  return input
}
part2(format('input.test'))
