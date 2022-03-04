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
   * 5 segments | 3 (match w/ 1), 5 (match with 4 who aren't match to 1), 2
   * 6 segments | 0, 6, 9
   * 7 segments | 8
   */
  const arr = new Array(9).fill(null)
  for (const s of signals) {
    if (s.length === 0 || s.length === 1) continue
    else if (s.length === 2) arr[1] = s
    else if (s.length === 3) arr[7] = s
    else if (s.length === 4) arr[4] = s
    else if (s.length === 7) arr[8] = s
    else if (s.length === 5) {
      
      const signalMatchingLength = (signal:number):number => 
      arr[signal].split('').map((e)=> s.includes(e)).filter(e => e).length
      
 
      const getDiffSegmentBetween2Signals = (arr1, arr2) => 
      arr1.filter(x => !arr2.includes(x))
      .concat(arr2.filter(x => !arr1.includes(x)));;

      console.log(getDiffSegmentBetween2Signals(arr[4].split(""), arr[1].split("")))
      
      // is '3' if it contains segments of "1" (right top / right bottom)
      if (signalMatchingLength(1) === 2)
      {
        arr[3] = s
        console.log('is 3',s)
      }

      // is '5' if contains segment of 4 but not contains segment of 1
      else if (
        
        // get segments present in '4' but not in '1'
        getDiffSegmentBetween2Signals(arr[4].split(""), arr[1].split("")) // ["e", "f"]
        //  e et f are equal to "1" segment ?
        // if not true, enter in this condition
      )
      {
        console.log("is 5 !")
        console.log("arr 1", arr[1].split(''))
        arr[5] = s
      }


    }
    if (s.length === 6) {
        // TODO
    }
  }

}
