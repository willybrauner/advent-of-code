import { format, part1, part2 } from "./index"
const { log } = console

it("resolve part 1", () => {
  const input = format("input.test.txt")
  expect(part1(input)).toBe(15)
})

it("resolve part 2", () => {
  const input = format("input.test.txt")
  expect(part2(input)).toBe(12)
})
