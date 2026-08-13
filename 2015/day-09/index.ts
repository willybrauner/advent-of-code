/**
 * 2015 - Day 9
 * https://adventofcode.com/2015/day/9
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = Map<string, Record<string, number>>
const useInput = (filename: 'input.test' | 'input'): Input => {
  return fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .reduce((a, b) => {
      const [travel, dist] = b.split(' = ')
      const [from, to] = travel.split(' to ')
      a.set(from, { ...a.get(from), [to]: parseInt(dist) })
      a.set(to, { ...a.get(to), [from]: parseInt(dist) })
      return a
    }, new Map<string, Record<string, number>>())
}

const parts = (input: Input) => {
  // calc all permutations
  const permutations = (arr: string[]): string[][] => {
    if (arr.length <= 1) return [arr]
    return arr.flatMap((item, i) => {
      const rest = [...arr.slice(0, i), ...arr.slice(i + 1)]
      return permutations(rest).map((p) => [item, ...p])
    })
  }

  const getCost = (path: string[], input: Input) => {
    let count = 0
    for (let i = 0; i < path.length; i++) {
      const curr = input.get(path[i])
      const c = curr[path[i + 1]]
      if (c) count += c
    }
    return count
  }

  return permutations([...input.keys()]).reduce((a, b, i) => {
    const pathCost = getCost(b, input)
    if (i === 0) return pathCost
    // part 1
    // return a > pathCost ? pathCost : a
    // part 2
    return a < pathCost ? pathCost : a
  }, 0)
}
log(parts(useInput('input')))
