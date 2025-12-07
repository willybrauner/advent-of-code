/**
 * 2026 - Day 6
 * https://adventofcode.com/2026/day/6
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

interface Input<T = number> {
  rows: T[][]
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
part1(useInput('input'))

const useInput2 = (filename: 'input.test' | 'input') => {
  const lines = fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter((e) => e)
  const rows = lines.slice(0, -1)
  const opLine = lines[lines.length - 1]
  return { rows, opLine }
}

const part2 = ({ rows, opLine }) => {
  const maxWidth = Math.max(...rows.map((r) => r.length))
  let final = 0
  let current = []
  let op = null

  for (let x = maxWidth - 1; x >= 0; x--) {
    let colChars = []
    for (let y = 0; y < rows.length; y++) 
      colChars.push(rows[y][x] || ' ')    
    const colStr = colChars.join('').trim()
    const opChar = opLine[x]

    // last 
    if (colStr === '') {
      if (current.length > 0) {
        const result =
          op === '*'
            ? current.reduce((a, b) => a * b, 1)
            : current.reduce((a, b) => a + b, 0)
        final += result
        current = []
        op = null
      }
      continue
    }
    if (opChar === '*' || opChar === '+') op = opChar
    const num = parseInt(colStr)
    if (!isNaN(num)) current.push(num)
  }

  if (current.length > 0) {
    const result =
      op === '*'
        ? current.reduce((a, b) => a * b, 1)
        : current.reduce((a, b) => a + b, 0)
    final += result
  }
  return final
}

log(part2(useInput2('input')))
