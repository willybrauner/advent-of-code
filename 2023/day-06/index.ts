/**
 * 2023 - Day 6
 * https://adventofcode.com/2023/day/6
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = string[][]
const format = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((e) => e.split(' ').filter((e) => /\d/.test(e)))

const run = (time, distance): number => {
  const won = []
  for (let i = 1; i < time; i++) {
    const millimeters = (time - i) * i
    if (millimeters > distance) won.push(millimeters)
  }
  return won.length
}

const part1 = (input: Input): number =>
  input
    .map((e) => e.map((e) => parseInt(e)))
    .reduce((a: number[][], b) => {
      b.forEach((e, i) => {
        a[i] = a[i] || []
        a[i].push(e)
      })
      return a
    }, [])
    .reduce((a, [time, distance]) => a * run(time, distance), 1)

log(part1(format('input')))

const part2 = (input: Input) => {
  const [time, distance] = input.map((e) => parseInt(e.join('')))
  return run(time, distance)
}

log(part2(format('input')))
