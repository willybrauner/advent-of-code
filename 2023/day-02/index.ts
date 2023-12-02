/**
 * 2023 - Day 02
 * https://adventofcode.com/2023/day/2
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Colors = 'blue' | 'red' | 'green'
type Input = [number, Colors][][][]
const format = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((e) =>
      e
        .split(':')[1]
        .trim()
        .split(';')
        .map((e) =>
          e
            .split(',')
            .map((e) => e.split(' ').filter(Boolean))
            .map((e) => {
              // @ts-ignore
              e[0] = parseInt(e[0])
              return e
            }),
        ),
    ) as Input

const part1 = (input: Input) =>
  input.reduce((acc, game, index) => {
    const limits: [number, Colors][] = [
      [12, 'red'],
      [13, 'green'],
      [14, 'blue'],
    ]

    let isValid = true
    for (let [limitNum, color] of limits) {
      const biggest = game.reduce((a, subset) => {
        // le nombre de cub de la couleur courante dans le subset courant
        const currColorNum = subset.find((e) => e[1] === color)?.[0] || 0
        return a > currColorNum ? a : currColorNum
      }, 0)
      if (biggest > limitNum) isValid = false
    }
    return isValid ? acc + (index + 1) : acc
  }, 0)

log(part1(format('input')))

const part2 = (input: Input) => {
  return input
}
part2(format('input.test'))
