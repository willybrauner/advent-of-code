import { json } from "stream/consumers"
import formatInputs, { TGrid, TPlayValues, TRow } from "./formatInputs"

const [PLAY_NUMBERS, GRIDS] = formatInputs("inputs.txt")

/**
 * Part 1
 * - Play 5 PLAY_NUMBERS by 5
 * - marked
 * - check if row or column of each grid is marked
 * - multiply sum of all unmarked numbers by last number called
 */

// -------------------------------------------------------------------------- LOCAL

/**
 * Return true if each value of a row is marked
 * @param grid
 */
export const gridHasWinnerRow = (grid: TGrid): boolean =>
  grid.some((row: TRow) => row.every((value: string) => value.endsWith("**")))

/**
 * Get columns from a grid
 * @param grid
 */
export const convertColumnsToRows = (grid: TGrid): TGrid => {
  const valuesArray = []
  for (let row of grid) {
    row.forEach((value, i) => {
      valuesArray[i] = [...(valuesArray[i] || []), value]
    })
  }
  return valuesArray
}

/**
 *
 * @param value
 * @returns
 */
export const getSumOfUnmarkedValueOfGrid = (grid: TGrid): number => {
  const flat = grid.flat().map(el => parseInt(el))
  console.log(flat)
  return 
}

// prepare markvalue
const markValue = (value: string) => (value.endsWith("**") ? value : `${value}**`)

// -------------------------------------------------------------------------- FINAL
/**
 * Parse one grid
 * - Add mark on each matching playValues of the grid
 * - Parse rows and columns to check if is complete
 * - return response
 *
 * @param grid grid to mark & check
 * @param playValues 5 numbers played on one tour
 * @return {TOneGridResult} return {grid, lastCalledPlayValue}
 * If lastCalledPlayValue is null, no row or column match on this grid
 */

type TOneGridResult = { grid: TGrid; lastCalledPlayValue: string }

// prettier-ignore
export const parseOneGrid = (grid: TGrid, playValues: TPlayValues): TOneGridResult => {
  let lastCalledPlayValue: string = null

  // for each play value ...
  const oneGridResult: TOneGridResult = playValues?.reduce<TOneGridResult>(
    (prevResult: TOneGridResult, playValue: string): TOneGridResult => 
    {
      // map on rows, return markedGrid
      const markedGrid = prevResult.grid.reduce<TGrid>(
        (accGrid: TGrid, currRow: TRow): TGrid => 
        {
          // map on values, return markedRow
          const markedRow = currRow.reduce<TRow>(
            (accValue: TRow, currValue: string): TRow => 
            [
              ...accValue,
              playValue === currValue ? markValue(currValue) : currValue,
            ],
            []
          )
          return [...accGrid, markedRow]
        },
        []
      )

      const rowWin = gridHasWinnerRow(markedGrid)
      const columnWin = gridHasWinnerRow(convertColumnsToRows(markedGrid))
      if ((rowWin || columnWin) && !lastCalledPlayValue) 
      {
          lastCalledPlayValue = playValue
          console.log("win", { columnWin, rowWin, grid: markedGrid, lastCalledPlayValue })
      }
       return { grid: markedGrid, lastCalledPlayValue }
      
    },
    { grid, lastCalledPlayValue }
  )
  console.log("resultGrid", oneGridResult)

  return oneGridResult
}

/**
 *
 * @returns
 */
export const parseAllGrids = (): boolean => {
  return
}
