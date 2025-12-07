/**
 * 2025 - Day 7
 * https://adventofcode.com/2025/day/7
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = string[][]
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .map((e) => e.split(''))

const part1 = (input: Input) => {
  let count = 0
  let start = null
  for (let y = 0; y < input.length; y++)
    for (let x = 0; x < input[y].length; x++)
      if (input[y][x] === 'S') start = [y, x]

  const visited = new Set<string>()
  const run = (curr: [number, number]) => {
    if (!curr) return
    const [y, x] = curr
    const ny = y + 1
    if (ny < 0 || ny >= input.length) return
    if (x < 0 || x >= input[ny].length) return

    const key = `${ny}-${x}`
    if (visited.has(key)) return
    visited.add(key)

    const current = input[ny][x]
    if (current === '^') {
        count++
        run([ny, x - 1])
        run([ny, x + 1])
    } 
    else if (current === '.') run([ny, x])
    
  }
  run(start)

  return count
}
log(part1(useInput('input')))

const part2 = (input: Input) => {
  return input
}
part2(useInput('input.test'))
