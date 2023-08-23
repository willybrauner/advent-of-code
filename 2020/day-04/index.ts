/**
 * 2020 - Day 4
 *  https://adventofcode.com/2020/day/4
 *  // part1: 00:20
 *  // part2: 00:30
 */

import fs from 'fs'
import path from 'path'

const { log, clear } = console
clear()

export type Input = any

export const format = (filename: 'input.test' | 'input'): Input =>
  fs.readFileSync(path.resolve(__dirname, filename), 'utf8')
    .trim()
    .split('\n')
    .reduce((a, b) => {
      if (b === '')
        return [...a, []]
      else {
        a[a.length - 1].push(b)
        return a
      }
    }, [[]])
    .map(e => e.join(' '))
    .map(e => e.split(' ')
    )
    .reduce((a, b) => {
      const o = {}
      for (let field of b) {
        const [k, v] = field.split(':')
        if (k === 'cid') continue
        o[k] = v
      }
      return [...a, o]
    }, [])


const part1 = (input: Input) => input.reduce((a, b) => Object.keys(b).length === 7 ? a + 1 : a, 0)
part1(format('input'))

const part2 = (input: Input) =>
  input.reduce((a, b) => {
      const unit = b?.hgt?.substring(b?.hgt.length - 2)
      const height = b?.hgt?.split(unit)[0]
      return (
        Object.keys(b).length === 7 &&
        b?.byr >= 1920 && b?.byr <= 2002 &&
        b?.iyr >= 2010 && b?.iyr <= 2020 &&
        b?.eyr >= 2020 && b?.eyr <= 2030 && (
          unit === 'cm'
            ? height >= 150 && height <= 193
            : height >= 59 && height <= 76
        ) &&
        (
          b?.hcl?.startsWith('#') &&
          b?.hcl?.slice(1).length === 6 &&
          b?.hcl?.slice(1).split('').every(e => /^[0-9a-fA-F]$/.test(e))
        )
        && ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']?.some(e => e === b?.ecl)
        && b?.pid?.split('').length === 9
      )
        ? a + 1 : a
    }
    , 0)

log(part2(format('input')))
