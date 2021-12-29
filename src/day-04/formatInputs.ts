const fs = require("fs")
const path = require("path")

export type TPlayNumbers = [string, string, string, string, string]
export type TRow = [string, string, string, string, string]
export type TGrid = [TRow, TRow, TRow, TRow, TRow]

export default (filename: string = "inputs.txt"): [string[], TGrid[]] => {
  const fileInputs: string[] = fs
    .readFileSync(path.resolve(__dirname, filename), "utf8")
    .split("\n\n")
    .filter((v) => v)

  /**
   * PLAY NUMBERS
   */
  const PLAY_NUMBERS: string[] = fileInputs.shift().split(",")

  /**
 * GRID 
 * Keep strings instead of convert them to numbers, is easier to marking values 
 * ex: '14*'
 * [
       [
          [ '22', '13', '17', '11', '0' ],
          [ '8', '2', '23', '4', '24' ],
          [ '21', '9', '14', '16', '7' ],
          [ '6', '10', '3', '18', '5' ],
          [ '1', '12', '20', '15', '19' ]
        ],
        ...
     ]
   ]
 */

  const GRIDS = fileInputs.map((el) =>
    el.split("\n").map((el) => el.split(" ").filter((el) => el !== ""))
  ) as TGrid[]

  return [PLAY_NUMBERS, GRIDS]
}
