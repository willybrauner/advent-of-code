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
  return input.reduce((a, [target, nums]) => {
    const search = (nums: number[], target: number): number => {
      const calc = (index: number, current: number): number => {
        // All numbers are used
        if (index === nums.length) return current === target ? current : 0
        // Try multiplication
        const mRes = calc(index + 1, current * nums[index])
        if (mRes === target) return mRes
        // Try addition
        const addRes = calc(index + 1, current + nums[index])
        if (addRes === target) return addRes
      }
      // for each nums, start nums calc
      for (let i = 0; i < nums.length; i++) {
        const result = calc(i + 1, nums[i])
        if (result === target) return result
      }
      return 0
    }
    return a + search(nums, target)
  }, 0)
}
log(part1(useInput('input')))
//log(part1(useInput('input')))

const part2 = (input: Input) => {
  return input
}
part2(useInput('input.test'))
