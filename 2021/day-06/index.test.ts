import { part1, part2 } from "."
import formatInputs from "./formatInputs"

it("Part 1 example", () => {
  const inputs = formatInputs("inputs-example.txt")
  expect(part1(inputs, 18)).toBe(26)
  expect(part1(inputs, 80)).toBe(5934)
})

it("Part 1", () => {
  const inputs = formatInputs("inputs.txt")
  expect(part1(inputs, 80)).toBe(362346)
})

it("Part 2 example", () => {
  const inputs = formatInputs("inputs-example.txt")
  expect(part2(inputs, 18)).toBe(26)
  expect(part2(inputs, 256)).toBe(26984457539)
})

it("Part 2", () => {
  const inputs = formatInputs("inputs.txt")
  expect(part2(inputs, 256)).toBe(1639643057051)
})
