import { part1, part2 } from "./index"
import formatInputs from "./inputs-format"
const {log} = console

it("Part 1 example", () => {
  const inputs = formatInputs("inputs-example.txt")
  log(inputs)
  part1(inputs)
  //expect(part1(inputs)).toBe(...)
})

it("Part 2 example", () => {
  const inputs = formatInputs("inputs-example.txt")
  part2(inputs)
  //expect(part2(inputs)).toBe(...)
})
