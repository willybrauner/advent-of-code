/**
 * 2022 - Day 10
 *  https://adventofcode.com/2022/day/10
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

export type TInput = number[]

export const format = (filename: 'input.test' | 'input'): TInput =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter((e) => e)
    .map((e) => (e === 'noop' ? 0 : parseInt(e.split(' ')[1])))

/**
 * Part 1
 */
export const part1 = (input: TInput) => {
  let x = 1
  let cycles = 0
  let strength = 0

  const incrementCycles = () => {
    cycles++
    for (let cycle of [20, 60, 100, 140, 180, 220]) {
      if (cycles === cycle) strength += cycle * x
    }
  }

  for (let i = 0; i < input.length; i++) {
    let curr = input[i]
    if (curr === 0) incrementCycles()
    else {
      for (let c = 0; c < 2; c++) {
        incrementCycles()
        if (c === 1) x += curr
      }
    }
  }
  return input
}
part1(format('input.test'))

/**
 * part2
 */
export const part2 = (input: TInput) => {
  let x = 1
  let cycles = 0

  let sprite = [0, 1, 2]
  const moveSprite = (pos) =>
    (sprite = new Array(3).fill(null).map((e, i) => pos + i))
  const matchWithSprite = (v) => sprite.some((e) => e === v)

  let CRTPos = 0
  let CRT = ''
  const CRTS = []

  const incrementCycles = () => {
    cycles++
    CRTPos++
    CRT += matchWithSprite(CRTPos) ? '#' : '.'
    const checks = [40, 80, 120, 160, 200, 240]
    for (let i = 0; i < checks.length; i++) {
      if (cycles === checks[i]) {
        log(CRT) // display response \o\
        CRTS.push(CRT)
        CRT = ''
        CRTPos = 0
      }
    }
  }

  for (let i = 0; i < input.length; i++) {
    let curr = input[i]
    if (curr === 0) incrementCycles()
    else {
      for (let c = 0; c < 2; c++) {
        incrementCycles()
        if (c === 1) {
          x += curr
          moveSprite(x)
        }
      }
    }
  }
  return input
}
part2(format('input'))
