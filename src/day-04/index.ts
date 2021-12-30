import formatInputs, { TGrid, TPlayValues, TRow } from "./formatInputs"

const [PLAY_NUMBERS, GRIDS] = formatInputs("inputs.txt")

/**
 * Part 1
 * - Play numbers
 * - mark matching grid values
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
 * Get sum value of remains number (unmarked) of a grid
 * @param value
 */
export const getSumOfUnmarkedValueOfGrid = (grid: TGrid): number => {
  return grid
    .flat()
    ?.filter((el) => !el.endsWith("**"))
    ?.map((el) => parseInt(el))
    .reduce((acc, curr) => acc + curr, 0)
}

/**
 * prepare markvalue with **
 * @param value
 * @returns
 */
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
 * @return {TGrid} return marked grid
 */

export const parseOneGrid = (grid: TGrid, playValue: string): TGrid => {
  // map on rows, return markedGrid
  const markedGrid = grid.reduce<TGrid>((accGrid: TGrid, currRow: TRow): TGrid => {
    // map on values, return markedRow
    const markedRow = currRow.reduce<TRow>(
      (accValue: TRow, currValue: string): TRow => [
        ...accValue,
        playValue === currValue ? markValue(currValue) : currValue,
      ],
      []
    )
    return [...accGrid, markedRow]
  }, [])

  return markedGrid
}

/**
 * Parse all grids
 */
type TGridsResult = {
  markedGrids: TGrid[]
  winnerGrid: TGrid
  lastCalledPlayValue: string
}
export const parseAllGrids = (grids = GRIDS, playValues: TPlayValues = PLAY_NUMBERS) => {
  let lastCalledPlayValue = null
  let winnerGrid = null

  /**
   * - Map on playValues
   *    - Map on grids
   *       - for each grid and check if row or column win
   */
  const result = playValues?.reduce<TGridsResult>(
    (prevResult: TGridsResult, playValue: string): TGridsResult => {
      // if already flag, don't continue
      if (lastCalledPlayValue) {
        return {
          markedGrids: prevResult.markedGrids,
          winnerGrid: prevResult.winnerGrid,
          lastCalledPlayValue,
        }
      }

      const markedGrids: TGrid[] = []
      for (let i = 0; i < prevResult.markedGrids.length; i++) {
        const grid = prevResult.markedGrids[i]
        const parsedGrid = parseOneGrid(grid, playValue)

        if (
          (gridHasWinnerRow(parsedGrid) ||
            gridHasWinnerRow(convertColumnsToRows(parsedGrid))) &&
          !lastCalledPlayValue
        ) {
          lastCalledPlayValue = playValue
          winnerGrid = parsedGrid
          break
        } else {
          markedGrids[i] = parsedGrid
        }
      }

      return {
        winnerGrid,
        lastCalledPlayValue,
        markedGrids,
      }
    },
    { markedGrids: grids, lastCalledPlayValue, winnerGrid }
  )

  // prettier-ignore
  return (
    parseInt(result.lastCalledPlayValue) 
    * 
    getSumOfUnmarkedValueOfGrid(result.winnerGrid)
  )
}
