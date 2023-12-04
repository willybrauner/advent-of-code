/**
 * 2023 - Day 4
 * https://adventofcode.com/2023/day/4
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = any
const format = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((e) =>
      e
        .split('|')
        .map((e) => e.trim())
        .map((e) => e.split(':'))
        .map((e) =>
          e
            .pop()
            .trim()
            .split(' ')
            .filter(Boolean)
            .map((e) => parseInt(e)),
        ),
    )

const matchEntries = (a1, a2) =>
  a1.reduce((a, b) => [...a, ...(a2.includes(b) ? [b] : [])], [])

const part1 = (input: Input) =>
  input.reduce((a, b) => {
    const calc = (arr) => arr.reduce((a, b, i) => (i === 0 ? 1 : a * 2), 0)
    return a + calc(matchEntries(b[0], b[1]))
  }, 0)

log(part1(format('input')))

const part2 = (input: Input) => {
  const won = {}
  return input.reduce((a, b, i) => {
    for (let j = 1; j <= matchEntries(b[0], b[1]).length; j++) {
      won[i + j] = (won[i + j] || 0) + (won[i] || 0) + 1
    }
    return a + (won[i] || 0) + 1
  }, 0)
}

log(part2(format('input')))
