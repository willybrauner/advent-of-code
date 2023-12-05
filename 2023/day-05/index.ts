/**
 * 2023 - Day 05
 * https://adventofcode.com/2023/day/05
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Seeds = number[]
type Maps = [number, number, number][][]
type Input = { seeds: Seeds; maps: Maps }

/**
 {
  seeds: [ 79, 14, 55, 13 ],
  maps: [
    [ [50, 98, 2], [52, 50, 48] ],
    ...
  ]
}
 */
// prettier-ignore
const format = (filename: 'input.test' | 'input'): Input =>
  fs.readFileSync(path.resolve(__dirname, filename), 'utf8')
    .trim()
    .split("\n")
    .reduce((a, b) => {
      if (b=="") a.push([])
      else a[a.length-1]?.push(b)
      return a
    },[[]])
    .reduce((a, b, i) => {
      if (i == 0)
        a.seeds = b[0].replace('seeds: ',"").split(' ').map(e=>parseInt(e))
      else
        b.shift() &&
        a.maps.push(b.map(e => e.split(' ').map(e =>parseInt(e))))
      return a
    }, { seeds:null, maps:[] })

const part1 = ({ seeds, maps }: Input) => {
  log('seeds', seeds)
  log('maps', maps)

  //return input
}
log(part1(format('input.test')))

const part2 = (input: Input) => {
  return input
}
part2(format('input.test'))
