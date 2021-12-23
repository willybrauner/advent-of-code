import { calculatePositionAndDepth, getMovementValue, part1Result, TInput } from "."

// Part 1
it("should return value of specific movement", () => {
  const inputs: TInput[] = [
    { movement: "down", value: 1 },
    { movement: "up", value: 3 },
    { movement: "up", value: 6 },
    { movement: "forward", value: 10 },
    { movement: "forward", value: 2 },
  ]
  expect(getMovementValue("down", inputs)).toEqual(1)
  expect(getMovementValue("up", inputs)).toEqual(9)
  expect(getMovementValue("forward", inputs)).toEqual(12)
})
