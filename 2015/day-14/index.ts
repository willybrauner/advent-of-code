/**
 * 2015 - Day 14
 * https://adventofcode.com/2015/day/14
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = Map<
  string,
  {
    kms: number
    runSecond: number
    restSecond: number
    kmOnTour: number
    points: number
  }
>
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
      a.set(name, { kms, runSecond, restSecond, kmOnTour: 0, points: 0 })
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
  for (let i = 0; i < 2503; i++) {
    for (let [_, b] of input.entries()) {
      let time = i % (b.runSecond + b.restSecond)
      if (time < b.runSecond) b.kmOnTour += b.kms
    }
    const bestKmOnTour = [...input.values()].sort(
      (a, b) => b.kmOnTour - a.kmOnTour,
    )[0].kmOnTour
    for (let entry of input.entries())
      if (entry[1].kmOnTour === bestKmOnTour) entry[1].points++
  }
  return [...input.values()].sort((a, b) => b.points - a.points)[0].points
}
log(part2(useInput('input')))
