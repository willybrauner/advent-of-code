/**
 * 2024 - Day 5
 * https://adventofcode.com/2024/day/5
 */
import fs from 'fs'
import path from 'path'

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

part1(useInput('input'))

const part2 = ([rules, updates]: Input) =>
  updates.reduce((a, update) => {
    const isValid = (up: number[]): boolean =>
      rules
        .filter(([x, y]) => up.includes(x) && up.includes(y))
        .every(([x, y]) => up.indexOf(x) < up.indexOf(y))
    if (isValid(update)) return a

    const check = (up: number[]): number => {
      if (isValid(up)) return up[(up.length - 1) / 2]
      for (let [x, y] of rules) {
        const xi = up.indexOf(x)
        const yi = up.indexOf(y)
        if (xi !== -1 && yi !== -1 && xi > yi) {
          const temp = up[xi]
          up[xi] = up[yi]
          up[yi] = temp
          return check(up)
        }
      }
    }
    return a + check(update)
  }, 0)

part2(useInput('input'))
