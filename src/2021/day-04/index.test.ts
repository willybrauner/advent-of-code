import {
  gridHasWinnerRow,
  convertColumnsToRows,
  getSumOfUnmarkedValueOfGrid,
  parseAllGridsAndCalc,
  getLastWinnerGridAndCalc,
} from "."
import formatInputs from "./formatInputs"

it("gridHasWinnerRow should return true if all value are ended with **", () => {
  expect(
    gridHasWinnerRow([
      ["22**", "13**", "17**", "11**", "0**"],
      ["8", "2", "23", "4", "24"],
      ["21**", "9**", "14**", "16", "7"],
      ["6", "10", "3", "18", "5"],
      ["1", "12", "20", "15", "19"],
    ])
  ).toEqual(true)
})

const array = [
  ["22**", "13**", "17**", "11**", "0"],
  ["8", "2", "23", "4", "24"],
  ["21**", "9**", "14**", "16", "7"],
  ["6", "10", "3", "18", "5"],
  ["1", "12", "20", "15", "19"],
]

it("should convertColumnsToRows", () => {
  expect(convertColumnsToRows(array)).toEqual([
    ["22**", "8", "21**", "6", "1"],
    ["13**", "2", "9**", "10", "12"],
    ["17**", "23", "14**", "3", "20"],
    ["11**", "4", "16", "18", "15"],
    ["0", "24", "7", "5", "19"],
  ])
})

it("should return sum of unmarked", () => {
  expect(
    getSumOfUnmarkedValueOfGrid([
      ["22", "13**", "17**", "11**", "0"],
      ["8", "2", "23", "4", "24"],
    ])
  ).toEqual(83)
})

it("example should return 4512", () => {
  const [PLAY_NUMBERS, GRIDS] = formatInputs("inputs-example.txt")
  const all = parseAllGridsAndCalc(GRIDS, PLAY_NUMBERS)
  expect(all).toEqual(4512)
})

// --------------------------------------------------- PART 2

it("PART 2", () => {
  const [PLAY_NUMBERS, GRIDS] = formatInputs("inputs.txt")
  const all = getLastWinnerGridAndCalc(GRIDS, PLAY_NUMBERS)
  expect(all).toEqual(4624)
})
