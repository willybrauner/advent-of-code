import { calcPart2, getMovementValue, TInput } from "."

// Part 1
it("should return value of specific movement", () => {
  const testInputs: TInput[] = [
    { movement: "down", value: 1 },
    { movement: "up", value: 3 },
    { movement: "up", value: 6 },
    { movement: "forward", value: 10 },
    { movement: "forward", value: 2 },
  ]
  expect(getMovementValue("down", testInputs)).toEqual(1)
  expect(getMovementValue("up", testInputs)).toEqual(9)
  expect(getMovementValue("forward", testInputs)).toEqual(12)
})

it(" shound return something", () => {
  const testInputs: TInput[] = [
    { movement: "forward", value: 5 },
    { movement: "down", value: 5 },
    { movement: "forward", value: 8 },
    { movement: "up", value: 3 },
    { movement: "down", value: 8 },
    { movement: "forward", value: 2 },
  ]

  expect(calcPart2(testInputs)).toEqual(900)
})
