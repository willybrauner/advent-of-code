/**
 * 2022 - Day 11
 *  https://adventofcode.com/2022/day/11
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

export type TMonkey = {
  monkey: number
  startingItems: number[]
  operation: (x) => number
  isDivisible: (x) => boolean
  divisible: number
  throwTo: (x) => number
  inspected: number
}
export type TInput = TMonkey[]

export const format = (filename: 'input.test' | 'input'): TInput => {
  const data = fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter((e) => e)

  // prepare monkey items array
  let monkeys = []
  for (const line of data) {
    if (line.startsWith('Monkey')) monkeys.push([line])
    else monkeys[monkeys.length - 1].push(line)
  }

  // format a single monkey object
  const formatMonkey = (monkey): TMonkey => {
    const obj: TMonkey = {
      monkey: null,
      startingItems: null,
      operation: null,
      isDivisible: null,
      divisible: null,
      throwTo: null,
      inspected: 0,
    }

    monkey
      // merge 3 last line on the same line for an easier process
      .reduce((a, b, i) => {
        if (i < 4) return [...a, b]
        else {
          a[a.length - 1] = a[a.length - 1] + '/' + b.trim()
          return a
        }
      }, [])
      .forEach((line, i) => {
        if (i === 0) {
          obj.monkey = parseInt(line.split(' ')[1].slice(0, -1))
        }
        if (i === 1) {
          obj.startingItems = line
            .replace('Starting items: ', '')
            .split(', ')
            .map((e) => parseInt(e))
        }
        if (i === 2) {
          obj.operation = (old) =>
            eval(line.replace('Operation: new =', '').trim())
        }
        if (i === 3) {
          const [test, isTrue, isFalse] = line.split('/')
          obj.divisible = parseInt(test.split(' ')[test.split(' ').length - 1])
          obj.isDivisible = (x): boolean => Number.isInteger(x / obj.divisible)
          obj.throwTo = (isDivisible: boolean) =>
            parseInt(
              isDivisible
                ? isTrue.split(' ')[isTrue.split(' ').length - 1]
                : isFalse.split(' ')[isFalse.split(' ').length - 1]
            )
          // log('throwTo', obj.throwTo(obj.isDivisible()))
        }
      })
    return obj
  }
  // process on each monkeys
  return monkeys.map((e) => formatMonkey(e))
}

const resolver = (
  monkeys: TMonkey[],
  rounds = 20,
  magicFn: (a: number) => number
) => {
  for (let i = 0; i < rounds; i++) {
    for (let m = 0; m < monkeys.length; m++) {
      const monkey = monkeys[m]
      monkey.startingItems?.forEach((startingItem, i) => {
        monkey.inspected++
        const worry = magicFn(monkey.operation(startingItem))
        const trowTo = monkey.throwTo(monkey.isDivisible(worry))
        monkeys[trowTo].startingItems.push(worry)
      })
      // clear!
      monkey.startingItems = []
    }
  }

  return monkeys
    .sort((a, b) => b.inspected - a.inspected)
    .splice(0, 2)
    .reduce((a, b) => a * b.inspected, 1)
}

/**
 * Part 1
 */
export const part1 = (input: TInput) =>
  resolver(input, 20, (e) => Math.floor(e / 3))

log(part1(format('input.test')))

/**
 * part2
 */
export const part2 = (input: TInput) =>
  resolver(
    input,
    10000,
    (a) => a % input.map((m) => m.divisible).reduce((a, b) => a * b)
  )

log(part2(format('input.test')))
