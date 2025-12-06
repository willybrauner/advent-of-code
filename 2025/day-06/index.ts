/**
 * 2026 - Day 6
 * https://adventofcode.com/2026/day/6
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = {
  rows: number[][]
  sign: string[]
}

// prettier-ignore
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs.readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n').filter(e => e)
    .map(e =>e.trim())
    .reduce((a, b, i, arr) => {
      if (i === arr.length -1) a.sign = b.split(' ').filter(e => e.trim() != '')
      else a.rows.push(b.split(' ').filter(e => e.trim() != '').map(e => parseInt(e)))
      return a
    }, { rows: [], sign: null })

// prettier-ignore
const part1 = ({rows, sign}: Input) => {
  const formatted = []
  for (let y = 0; y < rows.length; y++)
    for (let x = 0; x < rows[y].length; x++) {
    formatted[x] = [...(formatted[x] || []), rows[y][x]]
  }
  return formatted.reduce((a, b, index) => 
   a + b.reduce((a, b,i, arr) => 
        sign[index]  === "*"? a*b: ( a+ b + (i == arr.length-1? -1: 0))
      ,1)
  , 0)

}
log(part1(useInput('input')))

const part2 = (input: Input) => {
  return input
}
part2(useInput('input.test'))
