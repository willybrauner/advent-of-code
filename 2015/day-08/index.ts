/**
 * 2018 - Day 8
 * https://adventofcode.com/2018/day/8
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = string[]
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs.readFileSync(path.resolve(__dirname, filename), 'utf8').split('\n')

const part1 = (input: Input) => {
  return input.reduce((a, b) => {
    const splitS: string[] = b.split('')
    // easier parsing, it's to avoid conflict between inner '"' and around string quotes "..."
    splitS.pop()
    splitS.shift()

    // 2 counters, real string counter and after decode counter
    let sCount: number = 2
    let count: number = 0

    while (splitS.length) {
      if (splitS[0] !== '\\') {
        sCount++
        count++
        splitS.splice(0, 1)
      } else {
        if (splitS[1] === '\\') {
          sCount += 2
          count++
          splitS.splice(0, 2)
        } else if (splitS[1] === '"') {
          sCount += 2
          count++
          splitS.splice(0, 2)
        } else if (splitS[1] === 'x') {
          sCount += 4
          count++
          splitS.splice(0, 4)
        }
      }
    }
    console.log('splitS', splitS, sCount, count)
    return a + (sCount - count)
  }, 0)
}
log(part1(useInput('input')))

const part2 = (input: Input) => {
  return input
}
part2(useInput('input.test'))
