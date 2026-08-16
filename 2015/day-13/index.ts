/**
 * 2013 - Day 13
 * https://adventofcode.com/2013/day/13
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = Map<string, Record<string, number>>
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .reduce((a, e) => {
      const [key, rest] = e.split(' would ')
      const sign = rest.slice(0, 4) === 'gain' ? 1 : -1
      const next = rest.slice(5, -1).split(' ')
      const num = sign * parseInt(next[0])
      const to = next[next.length - 1]
      a.set(key, { ...a.get(key), [to]: num })
      return a
    }, new Map<string, Record<string, number>>())

const permutations = (arr: string[]): string[][] => {
  if (arr.length <= 1) return [arr]
  return arr.flatMap((item, i) => {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)]
    return permutations(rest).map((p) => [item, ...p])
  })
}

export const modulo = (base: number, modulo: number): number => {
  return ((base % modulo) + modulo) % modulo
}

const getCount = (b, input: Input) => {
  let count = 0
  for (let i = 0; i < b.length; i++) {
    const curr = b[i]
    const prev = b[modulo(i - 1, b.length)]
    const next = b[modulo(i + 1, b.length)]
    count += input.get(curr)[prev] + input.get(curr)[next]
  }
  return count
}

const part1 = (input: Input) => {
  return permutations([...input.keys()]).reduce((a, b, i) => {
    const count = getCount(b, input)
    if (i === 0) return count
    return a < count ? count : a
  }, 0)
}
log(part1(useInput('input')))

const part2 = (input: Input) => {
  // add myself to the input
  const me = [...input.keys()].reduce((acc, e) => ({ ...acc, [e]: 0 }), {})
  input.set('me', me)
  for (let el of input.keys()) {
    input.set(el, { ...input.get(el), me: 0 })
  }

  return permutations([...input.keys()]).reduce((a, b, i) => {
    const count = getCount(b, input)
    if (i === 0) return count
    return a < count ? count : a
  }, 0)
}
log(part2(useInput('input')))
