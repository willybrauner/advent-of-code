
import { part1, part2 } from './index';
import formatInputs from "./formatInputs"

it("Part 1 example", () => {
   const inputs = formatInputs("inputs-example.txt")
   expect(part1(inputs)).toBe(26)
})

it("Part 2 example", () => {
  const inputs = formatInputs("inputs-example.txt")
  expect(part2(inputs)).toBe(61229)   
})
