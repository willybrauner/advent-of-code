/**
 * 2020 - Day 02
 *  https://adventofcode.com/2020/day/2
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

export type Input = any

export const format = (filename: 'input.test' | 'input'): Input =>
  fs.readFileSync(path.resolve(__dirname, filename), 'utf8')
    .trim().split('\n')
    .map(e => e.split(" "))
    .reduce((prev, curr, i)=>  [
     ...prev,
     {
       rang: curr[0].split('-').map(v => parseInt(v)),
       letter: curr[1].split(':')[0],
       code: curr[2].split("")
     }
    ], [])

export const part1 = (input: Input) =>
  input.reduce((prev, curr)=> {
    const count = curr.code.reduce((a, b) => b === curr.letter ? a + 1 : a, 0)
    return (count >= curr.rang[0] && count <= curr.rang[1]) ? prev + 1 : prev
  }, 0)

part1(format('input'))

export const part2 = (input: Input) =>
  input.reduce((prev, { rang, letter, code })=>
      (
        (code[rang[0]-1] === letter || code[rang[1]-1] === letter)
        && (code[rang[0]-1] !== code[rang[1]-1])
      )
      ? prev + 1 : prev
  ,0)

part2(format('input'))
