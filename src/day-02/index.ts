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
export const part1Result =
  (getMovementValue("down") - getMovementValue("up")) * getMovementValue("forward")

  /**
   * Part 2
   * 
   */

  