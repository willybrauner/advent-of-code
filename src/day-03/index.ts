const fs = require("fs")
const path = require("path")

export const fileInputs: string[] = fs
  .readFileSync(path.resolve(__dirname, "inputs.txt"), "utf8")
  .split(/\n/)
  .filter((v) => v)
  .map((x) => x)

/**
 * Convert to columns
 * and deduce witch bit is the winner 
 * [
        [ 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0 ], -> 1
        [ 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1 ] -> 0
        ...
   ]

 * return array of bit winner  
 * [1, 0, ...]

 O n^2
 * @param inputs 
 */
export const getColumnsCount = (inputs = fileInputs): number[] => {
  const valuesArray = []
  for (let input of inputs) {
    input.split("").forEach((value, i) => {
      valuesArray[i] = [...(valuesArray[i] || []), parseInt(value)]
    })
  }

  // count number of 1 and 0 in each array to determine if final rate is 1 or 0
  return valuesArray.map((el) => {
    const count = el.reduce((acc, curr) => acc + (curr === 0 ? -1 : 1), 0)
    return count > 0 ? 1 : 0
  })
}

/**
 * Convert binary to decimal
 * O n
 * @param input
 * @returns
 */
export const binaryToDecimal = (input: number[], reverse: boolean = false): number =>
  input.reduce(
    (acc, curr, index) =>
      acc + (reverse ? 1 - curr : curr) * Math.pow(2, input.length - (index + 1)),
    0
  )

/**
 * Final result par 1
 * 0 n^2
 * @param inputs
 * @returns
 */
export const getPart1Result = (inputs = fileInputs) => {
  const count = getColumnsCount(inputs)
  return binaryToDecimal(count) * binaryToDecimal(count, true)
}

/**
 * Part 2
 * 
 * 
 * 
 * 
 */

/**
 * Get columns array
 * @param inputs
 * @returns
 */
export const getColumns = (inputs = fileInputs) => {
  const columnsArray = []
  for (const input of inputs) {
    input.split("").forEach((value, i) => {
      columnsArray[i] = [...(columnsArray[i] || []), parseInt(value)].join("")
    })
  }
  return columnsArray
}

/**
 * Get winner of a specific column
 * @param column
 * @param reverse
 * @returns
 */
export const getCurrentColumnResult = (column: string, reverse = false): number => {
  // compter les 1 et 0
  const count = column
    ?.split("")
    .map((el) => parseInt(el))
    .reduce((acc, curr) => {
      return acc + (curr === 0 ? -1 : 1)
    }, 0)

  return !reverse ? (count >= 0 ? 1 : 0) : count < 0 ? 1 : 0
}

/**
 * Main Part 2 function
 * 
 * - start inputs array
 *  [ "01110","11110","10110","10111","00101","11100","10000","11001"]
 *
 *  - get first bit of each input (0, 1, 1, 1, 0, 1, 1, 1) -> '1' is winner
 *  - map on each start input and keep input starting with '1'
 *
 * etc...
 *
 */
export const calcOxygen = (
  inputs = fileInputs,
  columnResult = getCurrentColumnResult(getColumns(fileInputs)[0]),
  reverse = false,
  index = 0
) => {
  let final = null
  const next = (inputs, columnResult, index) => {
    const keepInputs = inputs
      .map((el) => {
        const inputBit = parseInt(el.split("")[index])
        return columnResult === inputBit ? el : null
      })
      ?.filter((v) => v)

    if (keepInputs?.length > 0) {
      final = keepInputs
      const newIndex = index + 1

      const column = getColumns(keepInputs)[newIndex]
      const newColumnResult = getCurrentColumnResult(column, reverse)
      return next(keepInputs, newColumnResult, newIndex)
    } else {
      return final[0]
    }
  }
  return next(inputs, columnResult, index)
}

/**
 * Final
 */
const oxygenGeneratorRating = calcOxygen(
  fileInputs,
  getCurrentColumnResult(getColumns(fileInputs)[0])
)

const decimalOxygenGeneratorRating = parseInt(oxygenGeneratorRating, 2)
const co2ScrubberRating = calcOxygen(
  fileInputs,
  getCurrentColumnResult(getColumns(fileInputs)[0], true),
  true
)
const decimalCo2ScrubberRating = parseInt(co2ScrubberRating, 2)

// YOUPI \o/
const result = decimalOxygenGeneratorRating * decimalCo2ScrubberRating // 3414905
