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
 * Final gamma Rate
 * 0 n^2
 * @param inputs
 * @returns
 */
export const getResult = (inputs = fileInputs) => {
  const count = getColumnsCount(inputs)
  return binaryToDecimal(count) * binaryToDecimal(count, true)
}
