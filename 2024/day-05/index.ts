/**
 * 2024 - Day 5
 * https://adventofcode.com/2024/day/5
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type OrderingRules = [number, number][]
type Updates = number[][]
type Input = [OrderingRules, Updates]
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter(Boolean)
    .reduce(
      (a, b) => {
        b.includes('|')
          ? a[0].push(b.split('|').map((e) => parseInt(e)))
          : a[1].push(b.split(',').map((e) => parseInt(e)))
        return a
      },
      [[], []],
    )

const part1 = ([rules, updates]: Input) =>
  updates.reduce((a, update) => {
    const valid = rules
      .filter(([x, y]) => update.includes(x) && update.includes(y))
      .every(([x, y]) => update.indexOf(x) < update.indexOf(y))
    return a + (valid ? update[(update.length - 1) / 2] : 0)
  }, 0)

log(part1(useInput('input')))

const part2 = (input: Input) => {
  return input
}
part2(useInput('input.test'))
