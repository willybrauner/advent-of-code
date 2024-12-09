/**
 * 2024 - Day 7
 * https://adventofcode.com/2024/day/7
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = [number, number[]][]

// prettier-ignore
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((e) => e.split(':'))
    .reduce((a: Input, [result, nums]) => {
      return [
        ...a,
        [ parseInt(result), nums.trim().split(' ').map((e) => parseInt(e)) ],
      ]
    }, [] as Input)

const search = (nums: number[], target: number, addConcat = true): number => {
  const calc = (index: number, curr: number): number => {
    if (index === nums.length) return curr === target ? curr : 0

    const multiply = curr * nums[index]
    const add = curr + nums[index]
    const concat = parseInt(`${curr}${nums[index]}`)
    const operations = [multiply, add, addConcat && concat].filter(Boolean)

    for (const nextResult of operations) {
      const res = calc(index + 1, nextResult)
      if (res === target) return res
    }
  }

  const result = calc(1, nums[0])
  if (result === target) return result
  return 0
}

const part1 = (input: Input) =>
  input.reduce((a, [target, nums]) => a + search(nums, target, false), 0)

log(part1(useInput('input')))

const part2 = (input: Input) =>
  input.reduce((a, [target, nums]) => a + search(nums, target, true), 0)

log(part2(useInput('input')))
