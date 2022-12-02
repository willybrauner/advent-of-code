// https://adventofcode.com/2022/day/2
import fs from 'fs'
import path from 'path'
const { log } = console

export type TInput = string[]

export const format = (filename: 'input.test.txt' | 'input.txt'): TInput =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter((e) => e)
    .map((e) => e[0] + e[2])

export const part1 = (input: TInput) =>
  input.reduce((a, b) => {
    const lose = ['BX', 'CY', 'AZ']
    const draw = ['AX', 'BY', 'CZ']
    const win = ['CX', 'AY', 'BZ']
    let curr
    if (lose.includes(b)) curr = lose.indexOf(b) + 1
    if (draw.includes(b)) curr = draw.indexOf(b) + 1 + 3
    if (win.includes(b)) curr = win.indexOf(b) + 1 + 6
    return (a || 0) + curr
  }, 0)

export const part2 = (input: TInput) =>
  input.reduce((a, b) => {
    const lose = ['BX', 'CY', 'AZ']
    const draw = ['AX', 'BY', 'CZ']
    const win = ['CX', 'AY', 'BZ']
    const type = ['X', 'Y', 'Z']
    let curr
    if (b[1] == 'X') {
      const match = lose.find((e, i) => e[0] === b[0])
      curr = type.indexOf(match[1]) + 1
    }
    if (b[1] == 'Y') {
      const match = draw.find((e, i) => e[0] === b[0])
      curr = type.indexOf(match[1]) + 1 + 3
    }
    if (b[1] == 'Z') {
      const match = win.find((e, i) => e[0] === b[0])
      curr = type.indexOf(match[1]) + 1 + 6
    }
    return (a || 0) + curr
  }, 0)
