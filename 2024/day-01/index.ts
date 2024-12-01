/**
 * 2024 - Day 01
 * https://adventofcode.com/2024/day/01
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = number[][]
const format = (filename: 'input.test' | 'input'): Input =>
  fs.readFileSync(path.resolve(__dirname, filename), 'utf8').split("\n").filter(Boolean)
    .reduce((a, b)=> {
    const [left, right] = b.split("  ")
    a[0].push(parseFloat(left))
    a[1].push(parseFloat(right))
    return a
  },[[],[]]).reduce((a,b)=>
      [...a, b.sort((c,d)=> c-d)]
    , []) as Input


const part1 = ([left, right]: Input) => {
  let sum = 0
  for (let i = 0; i < left.length;i++)
    sum += Math.abs(left[i] - right[i])
  return sum
}
part1(format('input'))

const part2 = ([left, right]: Input) => {
  let sum = 0
  for (let i = 0; i < left.length;i++)
    sum += right.reduce((a, b)=> a + (b === left[i] ? b : 0), 0)
  return sum
}
part2(format('input'))
