/**
 * 2015 - Day 16
 * https://adventofcode.com/2015/day/16
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = Record<string, number>[]
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .map((e) => {
      const rest = e.slice(e.indexOf(':') + 1).trim()
      return rest.split(', ').reduce((a, b) => {
        return { ...a, [b.split(':')[0]]: parseInt(b.split(':')[1]) }
      }, {})
    })

const properties = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
}

const part1 = (input: Input) => {
  for (let i = 0; i < input.length; i++) {
    const entries = Object.entries(input[i])
    let length = entries.length
    for (const [linePropName, linePropValue] of entries) {
      if (properties?.[linePropName] === linePropValue) length -= 1
    }
    if (length === 0) return i + 1
  }
  return input
}
log(part1(useInput('input')))

const part2 = (input: Input) => {
  return input
}
part2(useInput('input.test'))
