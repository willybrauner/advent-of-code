/**
 * 2024 - Day 02
 * https://adventofcode.com/2024/day/02
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = number[][]
const format = (filename: 'input.test' | 'input'): Input =>
  fs.readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split("\n")
    .filter(Boolean)
    .map((e) => e.split(' ')
    .map((e) => parseFloat(e)))

const part1 = (input: Input) =>
   input.reduce((acc, report)=> {
    const dir = Math.sign(report[1] - report[0])
    const isSafe = (arr: number[]) => {
      if (arr.length == 1) return 1
      const currDir = Math.sign(arr[1] - arr[0])
      const levelDiff = Math.abs(arr[0] - arr[1])
      const levelIsValid = levelDiff >= 1 && levelDiff <= 3
      arr.shift()
      return (levelIsValid && currDir === dir) ? isSafe(arr) : 0
    }
    return acc + isSafe(report)
  }, 0)

part1(format('input'))


const part2 = (input: Input) =>
  input.reduce((acc, report)=> {

    // Update isSafe function on part 2
    const isSafe = (arr: number[], index = 0, dir: number | null = null): number => {
      if (index === arr.length - 1) return 1;
      const currDir = Math.sign(arr[index + 1] - arr[index])
      const levelDiff = Math.abs(arr[index] - arr[index + 1])
      const levelIsValid = levelDiff >= 1 && levelDiff <= 3
      if (dir === null) dir = currDir;
      return (!levelIsValid || currDir !== dir) ? 0 : isSafe(arr, index + 1, dir);
    };
    const safe = isSafe(report)
    if (!safe) {
      for (let i = 0; i < report.length; i++) {
        const newReport = [...report];
        newReport.splice(i, 1);
        if (isSafe(newReport)) return acc + 1;
      }
    }
    return acc + safe
  }, 0)

log(part2(format('input')))
