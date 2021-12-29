import { markValuesOfOneGrid, gridHasWinnerRow, convertColumnsToRows, parseOneGrid } from "."
import formatInputs from "./formatInputs"

const [PLAY_NUMBERS, GRIDS] = formatInputs("inputs-example.txt")

// it("markValuesOfOneGrid should return marked values", () => {
//   expect(
//     markValuesOfOneGrid(
//       [
//         ["22", "13", "17", "11", "0"],
//         ["8", "2", "23", "4", "24"],
//         ["21", "9", "14", "16", "7"],
//         ["6", "10", "3", "18", "5"],
//         ["1", "12", "20", "15", "19"],
//       ],
//       ["1", "22", "10", "54", "11"]
//     )
//   ).toEqual([
//     ["22**", "13", "17", "11**", "0"],
//     ["8", "2", "23", "4", "24"],
//     ["21", "9", "14", "16", "7"],
//     ["6", "10**", "3", "18", "5"],
//     ["1**", "12", "20", "15", "19"],
//   ])
// })

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

it("should parseOneGrid, ", () => {

    const array = [
        ["22", "13**", "17**", "1", "0"],
        ["8", "2", "23", "4", "24"],
        ["21", "9**", "14**", "16", "7"],
        ["6", "10", "3", "18", "5"],
        ["1", "12", "20", "15", "19"],
      ]

    console.log(
        parseOneGrid(array, ["1", "22", "0", "54", "11"])
    )

})
