/**
 * 20215 - Day 11
 * https://adventofcode.com/20215/day/11
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = string
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs.readFileSync(path.resolve(__dirname, filename), 'utf8')

const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const splitAlphabet = alphabet.split('')

const isValid = (input: Input): boolean => {
  const containsthreeConsecutiveLetters = (input: Input): boolean => {
    for (let i = 0; i < input.length; i++) {
      const curr = input[i] + (input[i + 1] || '') + (input[i + 2] || '')
      if (curr.length === 3 && alphabet.includes(curr)) return true
    }
    return false
  }
  const containsValidLetters = (input: Input) =>
    !['i', 'o', 'l'].some((e) => input.includes(e))

  const containsTwoPairs = (input: Input) => {
    const count = input
      .match(/(.)\1*/g)
      .reduce((a, b) => a + (b.length >= 2 ? 1 : 0), 0)
    return count >= 2
  }

  return (
    containsthreeConsecutiveLetters(input) &&
    containsValidLetters(input) &&
    containsTwoPairs(input)
  )
}

const increment = (input: Input) =>
  input
    .split('')
    .reverse()
    .reduce(
      (a, carr, i) => {
        let index = splitAlphabet.findIndex((e) => e === carr)
        const wrappedIndex = (index: number) => index % alphabet.length
        let nextIndex = wrappedIndex(index + (i === 0 ? 1 : 0))
        if (a.prevWrapped) nextIndex = wrappedIndex(nextIndex + 1)
        const nextCarr = splitAlphabet[nextIndex]
        return {
          password: `${nextCarr}${a.password}`,
          prevWrapped: carr === 'z' && nextCarr === 'a',
        }
      },
      { password: '', prevWrapped: false },
    )

const part1 = (input: Input) => {
  let password = input
  while (!isValid(password)) password = increment(password).password
  return password
}
log(part1(useInput('input')))

const part2 = (input: Input) => {
  let password = input
  while (!isValid(password)) password = increment(password).password
  return password
}
log(part2('vzbxxzaa'))
