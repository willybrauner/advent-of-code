/**
 * 2024 - Day 3
 * https://adventofcode.com/2024/day/3
 */
import fs from 'node:fs'
import path from 'node:path'

type Input = any
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs.readFileSync(path.join(__dirname, filename), 'utf-8')

const part1 = (input: Input) :number =>
 input
    .match(/mul\(\d{1,3},\d{1,3}\)/g)
    .reduce((a, b) =>
      a + b.match(/\d{1,3},\d{1,3}/)
        .map(e =>
          e.split(',')
            .map(e => parseInt(e))
            .reduce((c,d) => c * d, 1)
        )[0]
    ,0)

console.log(part1(useInput('input')))

const part2 = (input: Input) => {
  return input
}

part2(useInput('input.test'))
