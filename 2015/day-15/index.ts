/**
 * 2015 - Day 15
 * https://adventofcode.com/2015/day/15
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = Record<
  string,
  {
    apacity: number
    durability: number
    flavor: number
    texture: number
    calories: number
  }
>
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .reduce((a, e) => {
      const [name, data] = e.split(': ')
      const d = data
        .split(', ')
        .map((e) => e.split(' '))
        .reduce((a, b) => {
          return {
            ...a,
            [b[0]]: parseInt(b[1]),
          }
        }, {})
      return {
        ...a,
        [name]: d,
      }
    }, {})

    const part1 = (input: Input) => {
  // log(input)
  
  const getPermutations = (
    ingredientsNbr: number,
    total: number,
  ): number[][] => {
    const result = []
    const rec = (rest: number, restTotal: number, current: number[]) => {
      // if this is the last, push the result and stop
      if (rest === 1) {
        result.push([...current, restTotal])
        return
      }
      for (let a = 0; a < total; a++) {
        rec(rest - 1, restTotal - a, [...current, a])
      }
    }
    // start
    rec(ingredientsNbr, total, [])
    return result
  }

  const permutations = getPermutations(Object.keys(input).length, 100)
  // log('permutations', permutations)

  // group all properties
  const ingredients = Object.values(input)
  const groups = {}
  for (let ingredient of ingredients) {
    for (let [property, value] of Object.entries(ingredient)) {
      if (property === 'calories') continue
      groups[property] = [...(groups?.[property] || []), value]
    }
  }

  return permutations.reduce((a, permutation, i) => {
    let arr = []
    for (let propertyValues of Object.values(groups)) {
      let v = 0
      for (let i = 0; i < permutation.length; i++) {
        v += permutation[i] * propertyValues[i]
      }
      arr.push(v < 0 ? 0 : v)
    }
    const multiply = arr.reduce((a, b) => a * b, 1)
    const result = multiply > a ? multiply : a
    return result
  }, 0)
}
log(part1(useInput('input')))

const part2 = (input: Input) => {
  return input
}
part2(useInput('input.test'))
