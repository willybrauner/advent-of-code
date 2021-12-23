const fs = require("fs")
const path = require("path")

export type TMovement = "up" | "down" | "forward"
export type TInput = {
  movement: TMovement
  value: number
}

export const fileInputs: TInput[] = fs
  .readFileSync(path.resolve(__dirname, "inputs.txt"), "utf8")
  .split(/\n/)
  .filter((v) => v)
  .map((x) => ({
    movement: x.split(" ")[0],
    value: parseInt(x.split(" ")[1]),
  }))

/**
 * Part 1
 * @param values
 * @returns
 */
export const getMovementValue = (movement: TMovement, inputs = fileInputs): number =>
  inputs.reduce(
    (acc: number, curr: TInput) =>
      curr.movement === movement ? (acc += curr.value) : acc,
    0
  )
// multiply final horizontal position by final depth
export const part1Result =
  getMovementValue("forward") * (getMovementValue("down") - getMovementValue("up"))

/**
 * Part 2
 */
export const calcPart2 = (inputs: TInput[] = fileInputs): number => {
  let aim = 0
  let horizontalPosition = 0
  let depth = 0

  for (const input of inputs) {
    if (input.movement === "down") {
      aim += input.value
    }
    if (input.movement === "up") {
      aim -= input.value
    }
    if (input.movement === "forward") {
      depth += aim * input.value
      horizontalPosition += input.value
    }
  }
  return horizontalPosition * depth
}
