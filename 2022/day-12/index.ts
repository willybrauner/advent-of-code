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
        if (e === 'E') return 27
        return e.charCodeAt(0) - 96
      })
    )

/**
 * Part 1
 */
export const part1 = (input: TInput) => {
  //  log(input)
  // log(input.map((e) => e.toString()))

  const getVertexPositionByCost = (input, cost): [number, number] => {
    for (let y = 0; y < input.length; y++)
      for (let x = 0; x < input[y].length; x++)
        if (input[y][x] === cost) return [y, x]
  }

  const getNeighbors = ([y, x]) => {
    return [
      [y + 1, x],
      [y, x + 1],
      [y - 1, x],
      [y, x - 1],
    ].reduce((a, [pY, pX], i) => {
      const currentNeighbor = input?.[pY]?.[pX]
      if (
        currentNeighbor === input[y][x] ||
        currentNeighbor === input[y][x] + 1
      ) {
        return [...a, ...[[pY, pX]]]
      } else {
        return a
      }
    }, [])
  }

  const getCostBetweenVertices = (_, [y2, x2]) => 1

  log('getVertexPositionByCost(input, 26)', getVertexPositionByCost(input, 26))
  log('getVertexPositionByCost(input, 0)', getVertexPositionByCost(input, 0))
  const isTarget = (vertex) =>
    vertex.every((coord, i) => coord === getVertexPositionByCost(input, 26)[i])

  const { finalCost } = dijkstra<[number, number]>(
    getNeighbors,
    getCostBetweenVertices,
    getVertexPositionByCost(input, 0),
    isTarget
  )

  return finalCost
}
log(part1(format('input.test')))

/**
 * part2
 */
export const part2 = (input: TInput) => {
  return input
}
part2(format('input.test'))
