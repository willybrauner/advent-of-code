/**
 * 2024 - Day 3
 * https://adventofcode.com/2024/day/3
 */
import fs from 'node:fs'
import path from 'node:path'

type Input = string
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

part1(useInput('input'))

const part2 = (input: Input): number => {
  const segments = ("do()"+input).split(/(do\(\)|don't\(\))/)
  let flag = false
  let count = 0
  for (let segment of segments)
    if (segment === "do()")
      flag = true
    else if (segment === "don't()")
      flag = false
    else
      if (flag)
        count += segment.match(/mul\(\d{1,3},\d{1,3}\)/g)
            .map(e =>
              e.match(/\d{1,3},\d{1,3}/g)[0]
              .split(',')
              .map(e => parseInt(e))
              .reduce((c, d) => c * d, 1)
            )
            .reduce((a, b) => a + b, 0)
  return count
}

part2(useInput('input'))
