import { part1, part2 } from "./index"
import formatInputs from "./inputs-format"
const {log} = console

it("Part 1 example", () => {
  const inputs = formatInputs("inputs-example.txt")
  part1(inputs)
  expect(part1(inputs)).toBe(17)
})

it("Part 2 example", () => {
  const inputs = formatInputs("inputs.txt")
  part2(inputs)
  //expect(part2(inputs)).toBe(...)
})
