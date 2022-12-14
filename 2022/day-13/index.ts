/**
 * 2022 - Day 13
 *  https://adventofcode.com/2022/day/13
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Side = [any, any]
type Pair = any
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

// util
const arraysAreEqual = (a, b): boolean => {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}

// prettier-ignore
const comparison = ([L, R]:Pair): boolean | undefined => {
  // check if params are arrays
  const arrL: boolean = Array.isArray(L)
  const arrR: boolean = Array.isArray(R)

  // if both arr arrays
  if (arrL && arrR) {

    // if arrays arr equal, stop here
    if (arraysAreEqual(L, R)) return null
    // else, if L as no length, he is smaller for sure,
    else if (L.length === 0) return true
    // else if L > R return false
    else if (R.length === 0) return false

      // create copy of L and R to not modify there reference
      const copyL= [...L]
      const copyR = [...R]

      // restart comparison
      let compare = comparison([copyL[0], copyR[0]]);

      // Until comparison will be null,
      // remove first item of each side L and R,
      // test them and re compare next first item
      while (compare === null) {
        copyL.shift()
        copyR.shift()
        if (copyL.length === 0) return true
        if (copyR.length === 0) return false
        compare = comparison([copyL[0], copyR[0]])
      }
      return compare
  }

  // case one side is an array, and the other is a number
  // we have to compare have same type on each side,
  // the trick is to transform number to array who will be check bellow
  // on the comparison
  else if (arrL && !arrR) return comparison([L, [R]])
  else if (!arrL && arrR) return comparison([[L], R])

  // If L and R are number
  else {
    if (L < R) return true
    else if (L > R) return false
    else return null
  }
}

/**
 * Part 1
 */
const part1 = (input: Input) => {
  let count = 0
  for (let i = 0; i < input.length; i++) {
    const isInOrder = comparison(input[i])
    if (isInOrder) count += i + 1
  }
  return count
}
log(part1(format('input.test')))

/**
 * part2
 */
const part2 = (input: Input) => {
  const two = [[2]]
  const six = [[6]]
  const flatArr = input
    .reduce((a, [left, right]) => [...a, left, right], [])
    .concat([two, six])
    .sort()
    .sort((left, right) => (comparison([right, left]) ? 1 : -1))
  return (flatArr.indexOf(two) + 1) * (flatArr.indexOf(six) + 1)
}

log(part2(format('input.test')))
