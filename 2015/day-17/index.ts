/**
 * 2015 - Day 17
 * https://adventofcode.com/2015/day/17
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = number[]
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .map((e) => parseInt(e))

const part1 = (input: Input) => {
  const combinations = (values: Input, target: number) => {
    let count = 0

    const recusive = (startIndex: number, currentCombo: number[]) => {
      for (let i = startIndex; i < values.length; i++) {
        const newCombo = [...currentCombo, values[i]]
        if (newCombo.reduce((a, b) => a + b, 0) === target) count++
        recusive(i + 1, newCombo)
      }
    }

    recusive(0, [])
    return count
  }

  return combinations(input, 150)
}
log(part1(useInput('input')))

const part2 = (input: Input) => {
  return input
}
part2(useInput('input.test'))
