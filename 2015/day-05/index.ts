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

const part1 = (input: Input) => {
  const containsThreeVowels = (s: string): boolean =>
    s.split('').filter((e) => 'aeiou'.includes(e)).length >= 3

  const oneLetterAppearTwiceInARow = (s: string): boolean =>
    s.split('').some((e, i) => e === s.split('')?.[i + 1])

  // prettier-ignore
  const doesNotContainStrings = (s: string): boolean =>
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
  // It contains a pair of any two letters
  // that appears at least twice in the string without overlapping,
  // like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps).
  const containsPairs = (s: string): boolean => {
    let arr = s.split('')
    for (let i = 0; i < arr.length; i++) {
      const pair = `${arr[i]}${arr?.[i + 1]}`
      // has other same pair in full string
      let match = arr
        // keep only the arr without current pair
        .slice(i + 2)
        .join('')
        .includes(pair)
      if (match) return true
    }
    return false
  }

  // It contains at least one letter which repeats with exactly one letter between them,
  // like xyx, abcdefeghi (efe), or even aaa.
  const hasRepeatedLetter = (s: string): boolean => {
    let arr = s.split('')
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === arr[i + 2]) return true
    }
    return false
  }

  return input.reduce((a, b) => {
    const isNice = containsPairs(b) && hasRepeatedLetter(b)
    return a + (isNice ? 1 : 0)
  }, 0)
}

log(part2(useInput('input')))
