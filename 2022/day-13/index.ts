/**
 * 2022 - Day 13
 *  https://adventofcode.com/2022/day/13
 */
import fs from 'fs'
import path from 'path'
import retryTimes = jest.retryTimes
const { log, clear } = console
clear()

type Side = number[]
type Pair = Side[]
type Input = [Pair, Pair]

const format = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .toString()
    .split('\n\n')
    .map((e) =>
      e
        .split('\n')
        .filter((e) => e)
        .map((e) => eval(e))
    ) as Input

const arraysAreEqual = (a, b): boolean => {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}

// prettier-ignore
const compare = ([L, R]: Pair): boolean | undefined => {
  const arrL: boolean = Array.isArray(L)
  const arrR: boolean = Array.isArray(R)
  // Do comparison
  if (arrL && arrR)
    if (arraysAreEqual(L, R)) return true
    if (L.length === 0) return
    if (R.length === 0) return true

  else if (arrL && !arrR) {}
  else if (!arrL && arrR) {}
  else {
    if (L < R) {}
    else if (L > R) {}
    else return
  }
}

/**
 * Part 1
 */
const part1 = (input: Input) => {
  let count = 0
  for (let i = 0; i < input.length; i++) {
    const isInOrder = compare(input[i])
    if (isInOrder) count += i + 1
  }
  return count
}
log(part1(format('input.test')))

/**
 * part2
 */
const part2 = (input: Input) => {
  return input
}
part2(format('input.test'))
