import { parseOnGrid } from "."
import formatInputs from "./formatInputs"

const [PLAY_NUMBERS, GRIDS] = formatInputs("inputs-example.txt")

it("should works", () => {
//   console.log(PLAY_NUMBERS, GRIDS)
  console.log(
    parseOnGrid(
      [
        ["22", "13", "17", "11", "0"],
        ["8", "2", "23", "4", "24"],
        ["21", "9", "14", "16", "7"],
        ["6", "10", "3", "18", "5"],
        ["1", "12", "20", "15", "19"],
      ],
      ["1", "22", "10", "54", "11"]
    )
  )
})
