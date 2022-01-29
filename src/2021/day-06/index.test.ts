import { part1, part2 } from "."
import formatInputs from "./formatInputs"

it("", () => {
  const inputs = formatInputs("inputs-example.txt")

  const p1_18 = part1(inputs, 18)
  expect(p1_18).toEqual([
    6, 0, 6, 4, 5, 6, 0, 1, 1, 2, 6, 0, 1, 1, 1, 2, 2, 3, 3, 4, 6, 7, 8, 8, 8, 8,
  ])
  expect(p1_18.length).toBe(26)

  const p1_80 = part1(inputs, 80)
  expect(p1_80.length).toBe(5934)
})

it("", () => {
  const inputs = formatInputs("inputs.txt")
  const p1 = part1(inputs, 80)
  expect(p1.length).toBe(362346)
})

it("", () => {
    const inputs = formatInputs("inputs-example.txt")
    expect(part2(inputs, 18).length).toBe(26)
    
  //   const p1_256 = part1(inputs, 256)
  //   console.log('p1_256',p1_256)

  // 18  -> 26
  // 80  -> 5934
  // 256 -> 26984457539

  //expect(p1_256.length).toBe(362346)
})
