import { getHorizontalAndVerticalInputs, part1, part2 } from "."
import formatInputs from "./formatInputs"

it("", () => {
  const inputs = getHorizontalAndVerticalInputs("inputs-example.txt")
  expect(part1(inputs)).toBe(5)
})

it("", () => {
  const inputs = formatInputs("inputs-example.txt")
  
  const part2Result = part2(inputs)
  console.log(part2Result)
  
})
