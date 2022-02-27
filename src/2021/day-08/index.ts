// https://adventofcode.com/2021/day/8

import { TInputs } from "./formatInputs"

export const part1 = (inputs: TInputs) =>
  inputs
    .map((el) => el.filter((_, i) => i === 1))
    .flat()
    .flat()
    .reduce((acc, curr) => {
      const l = curr.length
      return l === 2 || l === 4 || l === 3 || l === 7 ? acc + 1 : acc
    }, 0)

export const part2 = (inputs: TInputs) => {
  
    // utils
  const arraysAreEqual = (a: [], b: []): boolean => {
    if (a.length !== b.length) return false
    for (var i = 0; i < a.length; ++i) if (a[i] !== b[i]) return false
    return true
  }

  // for test
  const signals = [
    "acedgfb",
    "cdfbe",
    "gcdfa",
    "fbcad",
    "dab",
    "cefabd",
    "cdfgeb",
    "eafb",
    "cagedb",
    "ab",
  ]
    .map((el) => el.split("").sort().join(""))
    .sort((a, b) => a.length - b.length)

  /**
   *   segments | matching digit number
   * ----------------------------------
   * 1 segment  | /
   * 2 segments | 1
   * 3 segments | 7
   * 4 segments | 4
   * 5 segments | 2, 3, 5
   * 6 segments | 0, 6, 9
   * 7 segments | 8
   */
  const arr = new Array(9).fill(null)
  for (const s of signals) {
    if (s.length === 0 || s.length === 1) continue
    if (s.length === 2) arr[1] = s
    if (s.length === 3) arr[7] = s
    if (s.length === 4) arr[4] = s
    if (s.length === 7) arr[8] = s
    if (s.length === 5) {
      // can be 3, if 1 is aready defined
      if (arr[1]) arr[3] = s
      // TODO
    }
    if (s.length === 6) {
        // TODO
    }
  }

}
