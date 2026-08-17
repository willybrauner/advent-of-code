/**
 * 2015 - Day 14
 * https://adventofcode.com/2015/day/14
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = Map<string, { kms: number; runSecond: number; restSecond: number }>
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .reduce((a, b) => {
      const [first, second] = b.split('fly ')
      const name = first.split(' ')[0]
      const kms = parseInt(second?.split(' ')[0])
      const regex = /for (.+?) seconds/
      const runSecond = parseInt(second?.split(', ')[0].match(regex)[1])
      const restSecond = parseInt(second?.split(', ')[1].match(regex)[1])
      a.set(name, { kms, runSecond, restSecond })
      return a
    }, new Map() as Input)

const part1 = (input: Input) => {
  return input.values().reduce((a, b, i) => {
    let km = 0
    for (let i = 0; i < 2503; i++) {
      let time = i % (b.runSecond + b.restSecond)
      if (time < b.runSecond) km += b.kms
    }
    return a > km ? a : km
  }, 0)
}
log(part1(useInput('input')))

const part2 = (input: Input) => {
  return input
}
part2(useInput('input.test'))
