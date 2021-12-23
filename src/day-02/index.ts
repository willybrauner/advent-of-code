const fs = require("fs")
const path = require("path")

export type TInput = {
  movement: "up" | "down" | "forward"
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

//console.log(fileInputs)
export const calculatePositionAndDepth = (inputs: TInput[] = fileInputs) => {
  const depth = inputs.reduce((acc, current: TInput) => {
    if (current.movement === "down") {
      acc += current.value
    }
    if (current.movement === "up") {
      acc -= current.value
    }
    return acc
  }, 0)

  const horizontalPostion = inputs.reduce((acc, current: TInput) => {
    if (current.movement === "forward") {
      acc += current.value
    }
    return acc
  }, 0)

  return horizontalPostion * depth
}

console.log("position", calculatePositionAndDepth())
