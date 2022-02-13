
import { part1, part2 } from './../day-07/index';
import formatInputs from "./formatInputs"

it("Part 1 example", () => {
  const inputs = formatInputs("inputs-example.txt")
   expect(part1(inputs)).toBe(37)
})

it("Part 2 example", () => {
  const inputs = formatInputs("inputs-example.txt")
  console.log("part2(inputs)",part2(inputs));
  
   //expect().toBe(37)
})
