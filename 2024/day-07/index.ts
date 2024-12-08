/**
 * 2024 - Day 7
 * https://adventofcode.com/2024/day/7
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = [number, number[]][]
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((e) => e.split(':'))
    .reduce((a: Input, [result, nums]) => {
      return [
        ...a,
        [
          parseInt(result),
          nums
            .trim()
            .split(' ')
            .map((e) => parseInt(e)),
        ],
      ]
    }, [] as Input)

const part1 = (input: Input) => {
  const search = (nums: number[], target: number): number => {
    const calc = (index: number, curr: number): number => {
      // All numbers are used
      if (index === nums.length) {
        return curr === target ? curr : 0
      }
      // test all possibilities recursively
      for (const nextCurr of [curr * nums[index], curr + nums[index]]) {
        const res = calc(index + 1, nextCurr)
        if (res === target) return res
      }
      // fallback
      return 0
    }
    // for each nums, start nums calc
    for (let i = 0; i < nums.length; i++) {
      const result = calc(i + 1, nums[i])
      if (result === target) return result
    }
    return 0
  }
  return input.reduce((a, [target, nums]) => a + search(nums, target), 0)
}
log(part1(useInput('input')))

const part2 = (input: Input) => {
  const search = (nums: number[], target: number): number => {
    const calc = (index: number, curr: number): number => {
      if (index === nums.length) return curr === target ? curr : 0

      const multiply = curr * nums[index]
      const add = curr + nums[index]
      const concat = parseInt(`${curr}${nums[index]}`)

      for (const nextCurr of [multiply, add, concat]) {
        const res = calc(index + 1, nextCurr)
        if (res === target) return res
      }
      return 0
    }

    for (let i = 0; i < nums.length; i++) {
      const result = calc(i + 1, nums[i])
      if (result === target) return result
    }
    return 0
  }
  return input.reduce((a, [target, nums]) => a + search(nums, target), 0)
}
log(part2(useInput('input.test')))
