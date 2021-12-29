import formatInputs, { TGrid, TRow } from "./formatInputs"

const [PLAY_NUMBERS, GRIDS] = formatInputs("inputs.txt")

/**
 * Part 1
 * - Play 5 PLAY_NUMBERS by 5
 * - marked
 * - check if row or column of each grid is marked
 * - multiply sum of all unmarked numbers by last number called
 */

// -------------------------------------------------------------------------- LOCAL

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
 * @return {boolean} return true if one column or one row of the grid is complete
 * (all numbers of this column or this row is marked)
 */
export const parseOnGrid = (
  grid: TGrid,
  playValues: [string, string, string, string, string]
): boolean => {
  // Mark
  const markedGrid = grid.reduce((accRow: TRow, currRow: TRow, i) => {
    const markedRow = currRow.reduce((accValue, currValue, i) => {
      const valueIsPlayed = playValues.some((el) => el === currValue)
      return [...(accValue || []), valueIsPlayed ? markValue(currValue) : currValue]
    }, [])
    return [...accRow, markedRow]
  }, [])

  console.log(markedGrid)

  return
}

export const parseAllGrids = (): boolean => {
  return
}
