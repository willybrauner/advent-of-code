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
 * Parse each values and check if is matching with one playValue.
 * If match, return "value*" marked with '*' at the end
 * @param grid
 * @param playValues
 * @returns
 */
export const markValuesOfOneGrid = (grid: TGrid, playValues: TPlayValues): TGrid => {
  return grid.reduce<TGrid>((accGrid: TGrid, currRow: TRow): TGrid => {
    // marked each value of of current row
    const markedRow = currRow.reduce<TRow>((accValue: TRow, currValue: string): TRow => {
      // check if current value is played
      const valueIsPlayed = playValues.some((el) => el === currValue)
      // prepare markvalue
      const markValue = (value: string) => (value.endsWith("**") ? value : `${value}**`)

      return [...accValue, valueIsPlayed ? markValue(currValue) : currValue]
    }, [])
    return [...accGrid, markedRow]
  }, [])
}

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
export const parseOnGrid = (grid: TGrid, playValues: TPlayValues): boolean => {
  // Mark
  const markedGrid = markValuesOfOneGrid(grid, playValues)
  // parse Row and Columns

  console.log(markedGrid)

  return
}

export const parseAllGrids = (): boolean => {
  return
}
