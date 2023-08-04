/**
 * 2020 - Day 8
 * https://adventofcode.com/2020/day/8
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Entry = ['nop' | 'acc' | 'jmp', number]
type Input = Entry[]
const format = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .trim()
    .split('\n')
    .map((e) => e.split(' '))
    .map(([op, arg]) => [op, parseInt(arg)]) as Input

const part1 = (input: Input) => {
  const move = (index: number, visited: number[] = [], acc = 0) => {
    if (visited.includes(index)) return { acc, infiniteLoop: true }
    if (index === input.length) return { acc, infiniteLoop: false }
    visited.push(index)
    const [op, arg] = input[index]
    if (op === 'acc') return move(index + 1, visited, (acc += arg))
    if (op === 'jmp') return move(index + arg, visited, acc)
    if (op === 'nop') return move(index + 1, visited, acc)
  }
  return move(0)
}

log(part1(format('input')).acc)

const part2 = (input: Input) => {
  for (let i = 0; i < input.length; i++) {
    const [op] = input[i]
    if (op === 'jmp' || op === 'nop') {
      // create a new (deep) array because of references...
      const newInput = input.map((arr) => [...arr]) as Input
      // swap the 2 values
      newInput[i][0] = op === 'jmp' ? 'nop' : 'jmp'
      const { acc, infiniteLoop } = part1(newInput)
      if (!infiniteLoop) return acc
    }
  }
}

log(part2(format('input')))
