import { part1, part2 } from "./index"
import formatInputs from "./inputs-format"

it("Part 1 example", () => {
  const inputs = formatInputs("inputs-example.txt")
  expect(part1(inputs)).toBe(10)
})

it("Part 2 example", () => {
  const inputs = formatInputs("inputs-example.txt")
  console.log(part2(inputs))
  //expect(part2(inputs)).toBe(...)
})
