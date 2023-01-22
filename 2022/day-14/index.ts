/**
 * 2022 - Day 14
 *  https://adventofcode.com/2022/day/14
 */
import fs from 'fs'
import path from 'path'
import { before } from 'node:test'
const { log, clear } = console
clear()

type Rocks = Set<any>
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

const getMaxY = (rocks: Rocks): number => {
  let maxY = 0
  rocks.forEach((e) => {
    const y = parseInt(e.split(',')[1])
    if (y > maxY) maxY = y
  })
  return maxY
}

const getRocksCoords = (input: Input): Rocks =>
  input.reduce((a, b) => new Set([...a, ..._getOneRockCoords(b)]), new Set())

const _getOneRockCoords = (rock: Rock): Rocks => {
  const coords = new Set()
  const setter = (a, b) => coords.add(`${a},${b}`)

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

const getOneSandPos = (rocks: Rocks, maxY: number): [number, number] => {
  const pos: [number, number] = [500, 0]
  while (true) {
    let [x, y] = pos
    const canDown = !rocks.has(`${x},${y + 1}`)
    const canDownLeft = !rocks.has(`${x - 1},${y + 1}`)
    const canDownRight = !rocks.has(`${x + 1},${y + 1}`)
    if (canDown) {
      pos[1]++
      if (pos[1] >= maxY) break
    } else if (canDownLeft) {
      pos[1]++
      pos[0]--
    } else if (canDownRight) {
      pos[1]++
      pos[0]++
    } else break
  }
  return pos
}

/**
 * Part 1
 */
export const part1 = (input: Input) => {
  const rocks = getRocksCoords(input)
  const maxY = getMaxY(rocks)
  let count = 0

  while (true) {
    const [x, y] = getOneSandPos(rocks, maxY)
    if (y >= maxY) break
    rocks.add(`${x},${y}`)
    count++
  }

  return count
}

log(part1(format('input.test')))

/**
 * part2
 */
export const part2 = (input: Input) => {
  return input
}
part2(format('input.test'))
