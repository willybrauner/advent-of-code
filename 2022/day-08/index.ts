/**
 * 2022 - Day 08
 *  https://adventofcode.com/2022/day/8
 */

import fs from 'fs'
import path from 'path'
const { log } = console

export type TInput = any

/**
  Formatted input struct:
 [
   [ 3, 0, 3, 7, 3 ],
   [ 2, 5, 5, 1, 2 ],
   [ 6, 5, 3, 3, 2 ],
   [ 3, 3, 5, 4, 9 ],
   [ 3, 5, 3, 9, 0 ]
 ]
 */
export const format = (filename: 'input.test' | 'input'): TInput =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter((e) => e)
    .map((e) => e.split('').map((e) => parseInt(e)))

/**
 * Part 1
 */
export const part1 = (input: TInput = format('input.test')) => {
  let visible = 0

  for (let y = 0; y < input.length; y++) {
    const row = input[y]

    for (let x = 0; x < input[y].length; x++) {
      // TODO on veut pas tester les arbres qui se trouvent au bord du graph
      // voir si ça marche bien
      if (x === 0 || x === input[y][input[y].length - 1]) continue

      let treeValue = input[y][x]
      const bigTreeRow: { value: number; index: number } = row.reduce(
        (a, b, i) => (a.value >= b ? a : { value: b, index: i }),
        { value: 0, index: 0 }
      )

      if (y === 1) {
        log('---------------------------------------')
        log('current', { value: treeValue, index: x })
        log('bigTreeRow', bigTreeRow)
      }

      // si le current est plus grand que le bigger
      // TODO revoir cette condition
      if (x <= bigTreeRow.index && treeValue >= bigTreeRow.value) {
        log('visible on LEFT', treeValue, { y, x })
      }

      // et son index de row est supérieur, (il est positionné a droite)
      // c'est qu'on ne peut pas le voir depuis RIGHT

      // sur une COLUMN,
      // si un tree est plus grand que le courant
      // et son index de row est inférieur, (il est positionné en haut)
      // c'est qu'on ne peut pas le voir depuis TOP

      // et son index de row est supérieur, (il est positionné a droite)
      // c'est qu'on ne peut pas le voir depuis BOTTOM

      //return
    }
  }

  return input
}

/**
 * part2
 */
export const part2 = (input: TInput = format('input.test')) => {}
