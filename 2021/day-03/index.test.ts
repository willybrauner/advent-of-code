import {
  binaryToDecimal,
  fileInputs,
  getColumnsCount,
  getPart1Result,
  getColumns,
  getCurrentColumnResult,
  calcOxygen,
} from "../day-03"

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
it("should resolve part 1", () => {
  expect(fileInputs).toBeDefined()

  const count = getColumnsCount(exampleInputs)
  expect(count).toEqual([1, 0, 1, 1, 0])
  expect(binaryToDecimal(count)).toEqual(22)
  expect(getPart1Result(exampleInputs)).toEqual(198)
  // youpi
  expect(getPart1Result()).toEqual(4191876)
})

it("should resolve part 2 with example", () => {
  const columns = getColumns(exampleInputs)
  expect(getCurrentColumnResult(columns[0])).toBe(1)
  expect(getCurrentColumnResult(columns[0], true)).toBe(0)
  expect(getCurrentColumnResult(columns[1])).toBe(0)

  const test = calcOxygen(
    exampleInputs,
    getCurrentColumnResult(getColumns(exampleInputs)[0])
  )

  expect(test).toBe("10111")
  expect(parseInt(test, 2)).toBe(23)

  const reverseTest = calcOxygen(
    exampleInputs,
    getCurrentColumnResult(getColumns(exampleInputs)[0], true),
    true
  )

  expect(reverseTest).toBe("01010")
  expect(parseInt(reverseTest, 2)).toBe(10)
})

it("should resolve part 2 with real inputs", () => {
  const oxygenGeneratorRating = calcOxygen(
    fileInputs,
    getCurrentColumnResult(getColumns(fileInputs)[0], false)
  )
  const decimalOxygenGeneratorRating = parseInt(oxygenGeneratorRating, 2)
  
  const co2ScrubberRating = calcOxygen(
    fileInputs,
    getCurrentColumnResult(getColumns(fileInputs)[0], true),
    true
  )

  const decimalCo2ScrubberRating = parseInt(co2ScrubberRating, 2)
  expect(decimalOxygenGeneratorRating * decimalCo2ScrubberRating).toBe(3414905)
})
