import { part1 } from './../day-07/index';
import formatInputs from "./formatInputs"

it("Part 1 example", () => {
  const inputs = formatInputs("inputs-example.txt")
  //console.log("inputs",inputs)
   expect(part1(inputs)).toBe(37)
  
})
