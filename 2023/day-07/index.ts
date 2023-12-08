/**
 * 2023 - Day 7
 * https://adventofcode.com/2023/day/7
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Hands = [string, number, number]
type Input = Hands[]

const handType = (hand: string) => {
  const h = hand.split('')
  const checkHand = (common, diff): boolean =>
    h.some(
      (el) =>
        h.filter((e) => e === el).length === common &&
        new Set(h.filter((e) => e !== el)).size === diff,
    )
  return [
    [5, 0, 6],
    [4, 1, 5],
    [3, 1, 4],
    [3, 2, 3],
    [2, 2, 2],
    [2, 3, 1],
    [1, 4, 0],
  ].find((e) => checkHand(e[0], e[1]))[2]
}

const order = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

const sortHands = (hands: Input) =>
  hands.sort((a, b) => {
    if (a[2] > b[2]) return -1
    if (a[2] < b[2]) return 1
    if (a[2] === b[2]) {
      if (a[0][0] === b[0][0]) {
        return sortHands([
          [a[0].slice(1), a[1], a[2]],
          [b[0].slice(1), b[1], b[2]],
        ])
      }
      const aIndex = order.reverse().findIndex((e) => e === a[0][0])
      const bIndex = order.reverse().findIndex((e) => e === b[0][0])
      if (aIndex > bIndex) return -1
      if (aIndex < bIndex) return 1
    }
  })

const part1 = (filename) => {
  const input = fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((e) => e.split(' '))
    .map((e) => [e[0], parseInt(e[1]), handType(e[0])]) as Input
  const sorted = sortHands(input).reverse()
  return sorted.reduce((a, b, i) => a + b[1] * (i + 1), 0)
}

log(part1('input'))

const part2 = (filename) => {
  //  return input
}
part2('input.test')
