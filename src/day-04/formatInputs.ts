const fs = require("fs")
const path = require("path")

type TRow = [number, number, number, number, number]
type TGrid = [TRow, TRow, TRow, TRow, TRow]

export default (filename: string = "inputs.txt"): [number[], TGrid[]] => {
  const fileInputs: string[] = fs
    .readFileSync(path.resolve(__dirname, filename), "utf8")
    .split("\n\n")
    .filter((v) => v)

  /**
   * PLAY NUMBERS
   */
  const PLAY_NUMBERS: number[] = fileInputs
    .shift()
    .split(",")
    .map((el) => parseInt(el))

  /**
 * GRID 
 * [
      [
        [ 86, 46, 47, 61, 57 ],
        [ 44, 74, 17, 5, 87 ],
        [ 78, 8, 54, 55, 97 ],
        [ 11, 90, 7, 75, 70 ],
        [ 81, 50, 84, 10, 60 ]
      ],
      [
        [ 86, 46, 47, 61, 57 ],
        [ 44, 74, 17, 5, 87 ],
        [ 78, 8, 54, 55, 97 ],
        [ 11, 90, 7, 75, 70 ],
        [ 81, 50, 84, 10, 60 ]
      ],
      ...
      
     ]
   ]
 */

  const GRIDS = fileInputs.map((el) =>
    el.split("\n").map((el) =>
      el
        .split(" ")
        .filter((el) => el !== "")
        .map((el) => parseInt(el))
    )
  ) as TGrid[]

  return [PLAY_NUMBERS, GRIDS]
}
