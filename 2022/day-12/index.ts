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

const getVertexPositionByCost = (input, cost): [number, number][] => {
  const pos = []
  for (let y = 0; y < input.length; y++)
    for (let x = 0; x < input[y].length; x++)
      if (input[y][x] === cost) pos.push([y, x])
  return pos
}

const processDijkstra = (
  input: TInput,
  startVec2: [number, number]
): number => {
  const getNeighbors = ([y, x]) => {
    return [
      [y + 1, x],
      [y, x + 1],
      [y - 1, x],
      [y, x - 1],
    ].reduce((a, [pY, pX], i) => {
      const currentNeighbor = input?.[pY]?.[pX]
      if (currentNeighbor <= input[y][x] + 1) {
        return [...a, ...[[pY, pX]]]
      } else {
        return a
      }
    }, [])
  }

  const getCostBetweenVertices = () => 1

  const isTarget = (vertex) =>
    vertex.every(
      (coord, i) => coord === getVertexPositionByCost(input, 26)[0][i]
    )

  const { finalCost } = dijkstra<[number, number]>(
    getNeighbors,
    getCostBetweenVertices,
    startVec2,
    isTarget
  )

  return finalCost
}

/**
 * Part 1
 */
export const part1 = (input: TInput) => {
  return processDijkstra(input, getVertexPositionByCost(input, 0)[0])
}
log(part1(format('input')))

/**
 * part2
 */
export const part2 = (input: TInput) => {
  const starts = [
    // start position
    ...getVertexPositionByCost(input, 0),
    ...getVertexPositionByCost(input, 1),
  ]

  const costs = []
  for (let start of starts) {
    costs.push(processDijkstra(input, start))
  }

  return costs.sort((a, b) => a - b)[0]
}
log(part2(format('input')))
