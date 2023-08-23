/**
 * 2020 - Day 5
 * https://adventofcode.com/2020/day/5
 */

import fs from 'fs'
import path from 'path'

const { log, clear } = console
clear()

export type Input = any
const format = (filename: 'input.test' | 'input'): Input =>
  fs.readFileSync(path.resolve(__dirname, filename), 'utf8')
    .trim()
    .split('\n')
    .map(e => [e.slice(0, 7), e.slice(7)])

const part1 = (input: Input) => {
  const get = (els, lowerL, upperL, [a, b], r) => {
    for (let el of els) {
      if (el === lowerL) b = Math.floor((b + a) / 2)
      if (el === upperL) a = Math.round((b + a) / 2)
    }
    return r === 'lower' ? a : b
  }
  const ids = input.reduce((prev, [rows, columns]) => {
    const r = get(rows, 'F', 'B', [0, 127], 'lower')
    const c = get(columns, 'L', 'R', [0, 7], 'upper')
    return [...prev, r * 8 + c]
  }, [])

  return [
    ids,
    ids.reduce((a, b) => a < b ? b : a, 0)
  ]
}
log(part1(format('input'))[1])


const part2 = (input: Input) => {
  const [ids] = part1(input)
  for (let i = 1; i < ids.sort((a, b) => a - b).length - 1; i++) {
    const nextId = ids[i + 1];
    if (nextId === ids[i] + 1) continue;
    else return ids[i] + 1;
  }
}

log(part2(format('input')))
