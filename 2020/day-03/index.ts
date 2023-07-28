/**
 * 2020 - Day 3
 *  https://adventofcode.com/2020/day/3
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

export type Input = any

/**

 [
 '..##.......',
 '.#....#..#.',
 '.#...##..#.',
 '.#.#.#....#',
 '#.##...#...',
 '.#..#...#.#'
 '#...#...#..',
 '..#.#...#.#',
 '..#.##.....',
 '.#........#',
 '#...##....#',
 ]

 */
export const format = (filename: 'input.test' | 'input'): Input =>
  fs.readFileSync(path.resolve(__dirname, filename), 'utf8')
    .trim().split('\n')

export const part1 = (input: Input, right = 3, down = 1) => {
  let trees = 0
  let c = 0
  for (let y = 0; y < input.length; y += down) {
    const mx = (right*c) % input[y].length
    if(input[y][mx] === "#") trees++
    c++
  }
    return trees
}
part1(format('input.test'))

export const part2 = (input: Input) => {
  let trees = []
  for (let [right, down] of [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]) {
    trees.push(part1(input, right, down))
  }
}
part2(format('input.test'))
