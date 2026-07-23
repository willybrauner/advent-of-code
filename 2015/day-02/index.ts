/**
 * 2015 - Day 2
 * https://adventofcode.com/2015/day/2
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Dimensions = [number, number, number]
type Input = Dimensions[]
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .map((e) => e.split('x').map((e) => parseInt(e)) as Dimensions)

const part1 = (input: Input) => {
  let count = 0
  for (let d of input) {
    const s1 = (d[0] * d[1])
    const s2 = (d[1] * d[2])
    const s3 = (d[2] * d[0])
    const smallestSide = [s1, s2, s3].sort((a, b)=> a - b)[0]    
    count += 
      2 * s1
      + 2 * s2
      + 2 * s3
      + smallestSide
  }
  return count
}
log(part1(useInput('input')))

const part2 = (input: Input) => {
   let count = 0
  for (let d of input) {
    const sides = [d[0], d[1], d[2]].sort((a, b)=> a - b).slice(0, -1)
    const calc = (sides[0]* 2 + sides[1]*2) + (d[0] * d[1] * d[2])
    count += calc
  }
  return count
}
log(part2(useInput('input')))
