import { binaryToDecimal, fileInputs, getColumnsCount, getResult } from "../day-03"

it("should works", () => {
  expect(fileInputs).toBeDefined()

  const exampleInputs = [
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010",
  ]

  const count = getColumnsCount(exampleInputs)
  expect(count).toEqual([1, 0, 1, 1, 0])
  expect(binaryToDecimal(count)).toEqual(22)
  expect(getResult(exampleInputs)).toEqual(198)

  // youpi
  expect(getResult()).toEqual(4191876)


})
