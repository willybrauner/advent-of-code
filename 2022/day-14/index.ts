/**
 * 2022 - Day 14
 *  https://adventofcode.com/2022/day/14
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Rock = [number, number][]
type Input = Rock[]

export const format = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter((e) => e)
    .map((e) =>
      e.split(' -> ').map((e) => e.split(',').map((e) => parseInt(e)))
    ) as Input

const getRocksCoords = (input: Input): Map<string, [number, number]> =>
  input.reduce((a, b) => new Map([...a, ...getOneRockCoords(b)]), new Map())

const getOneRockCoords = (rock: Rock): Map<string, [number, number]> => {
  const coords = new Map()
  const setter = (a, b) => coords.set(`${a}-${b}`, [a, b])

  for (let i = 0; i < rock.length; i++) {
    const [cX, cY] = rock[i]
    setter(cX, cY)
    if (!rock?.[i + 1]) return coords
    const [nX, nY] = rock[i + 1]
    if (cX != nX) {
      const delta = nX - cX
      const sign = Math.sign(delta)
      for (let j = 0; j < Math.abs(delta); j += 1) {
        setter(cX + j * sign, cY)
      }
    }
    if (cY != nY) {
      const delta = nY - cY
      const sign = Math.sign(delta)
      for (let j = 0; j < Math.abs(delta); j += 1) {
        setter(cX, cY + j * sign)
      }
    }
  }
}

/**
 * Part 1
 */
export const part1 = (input: Input) => {
  log(input)

  const all = getRocksCoords(input)
  log('all', all)

  return input
}
part1(format('input.test'))

/**
 * part2
 */
export const part2 = (input: Input) => {
  return input
}
part2(format('input.test'))
