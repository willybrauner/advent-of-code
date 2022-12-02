import { resolvePartOne, resolvePartTwo } from "./index"
import { fileInputs } from "."

describe("day 1", () => {
  it("fileInputs should return defined inputs array", () => {
    expect(fileInputs).toBeDefined()
    expect(fileInputs).not.toContain(null)
  })

  it("should return the right number of inputs", () => {
    expect(resolvePartOne([1, 2, 1])).toEqual(1)
    expect(resolvePartOne([130, 2021, 110, 120, 133])).toEqual(3)
    expect(resolvePartOne(fileInputs)).toEqual(1184)

    // GROUP 1 --- 199 + 200 + 208 = 607
    // GROUP 2 --- 200 + 208 + 210 = 618
    // GROUP 3 --- 208 + 210 + 200 = 618
    // GROUP 4 --- 210 + 200 + 207 = 617
    // GROUP 5 --- 200 + 207 + 240 = 647

    expect(resolvePartTwo([199, 200, 208, 210, 200, 207, 240])).toEqual(2)
    expect(resolvePartTwo(fileInputs)).toEqual(1158)
  })
})
