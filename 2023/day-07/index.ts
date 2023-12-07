/**
 * 2023 - Day 7
 * https://adventofcode.com/2023/day/7
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = [string, number][]
const format = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((e) => e.split(' '))
    .map((e) => [e[0], parseInt(e[1])])

const handType = (hand: string) => {
  const h = hand.split('')
  // 5 same
  const isFive = new Set(h).size === 1
  // 4 + 1
  const isFour = h.some(
    (el) =>
      h.filter((e) => e === el).length === 4 &&
      h.filter((e) => e !== el).length === 1,
  )
  // 3 + 2 same
  const isThreeFH = h.some(
    (el) =>
      h.filter((e) => e === el).length === 3 &&
      new Set(h.filter((e) => e !== el)).size === 1,
  )
  // 3 + 2 diff
  const isThree = h.some(
    (el) =>
      h.filter((e) => e === el).length === 3 &&
      new Set(h.filter((e) => e !== el)).size === 2,
  )
  // 2 + 2 + 1
  const isTwoPair = h.some(
    (el) =>
      h.filter((e) => e === el).length === 2 &&
      new Set(h.filter((e) => e !== el)).size === 2,
  )
  // 2 + 1 + 1 + 1
  const isOnePair = h.some(
    (el) =>
      h.filter((e) => e === el).length === 2 &&
      new Set(h.filter((e) => e !== el)).size === 3,
  )
  // 1 + 1 + 1 + 1 + 1
  const isHighCard = new Set(h).size === 5

  if (isFive) return 'Five of a kind'
  if (isFour) return 'Four of a kind'
  if (isThreeFH) return 'Full house'
  if (isThree) return 'Three of a kind'
  if (isTwoPair) return 'Two pair'
  if (isOnePair) return 'One pair'
  if (isHighCard) return 'High card'
}

const part1 = (input: Input) => {
  // put the hands in order of strength
  for (let [hand] of input) {
    const type = handType(hand)
    log('type', type)
    // ...
  }
  // reorder if others get multi hands have the same type
}

log(part1(format('input.test')))

const part2 = (input: Input) => {
  return input
}
part2(format('input.test'))
