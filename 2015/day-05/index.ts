/**
 * 2015 - Day 5
 * https://adventofcode.com/2015/day/5
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = string[]
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs.readFileSync(path.resolve(__dirname, filename), 'utf8').split('\n')

// prettier-ignore
const part1 = (input: Input) => {
  const containsThreeVowels = (s: string) =>
    s.split('').filter((e) => 'aeiou'.includes(e)).length >= 3

  const oneLetterAppearTwiceInARow = (s: string) =>
    s.split('').some((e, i) => e === s.split('')?.[i + 1])

  const doesNotContainStrings = (s: string) =>
    !s.split('')
      .some((e, i) => 
        ['ab', 'cd', 'pq', 'xy']
          .includes(`${e}${s.split('')?.[i + 1]}`))
  
  return input.reduce((a, b) => {
    const isNice = 
      containsThreeVowels(b) && 
      oneLetterAppearTwiceInARow(b) && 
      doesNotContainStrings(b)      
    return a + (isNice ? 1 : 0)
  }, 0)
}
log(part1(useInput('input')))

const part2 = (input: Input) => {
  return input
}
part2(useInput('input.test'))
