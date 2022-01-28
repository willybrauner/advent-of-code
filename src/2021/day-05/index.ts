// https://adventofcode.com/2021/day/5

import formatInputs from "./formatInputs"

export type TDiagram = number[][]
export type TCoor = { x: number; y: number }
export type TLine = [TCoor, TCoor]

/**
 * select only matching x1 and x2 or y1 and y2
 */
export const getInputs = (file = "inputs.txt") =>
  formatInputs(file).filter(
    (input) => (input[0].x === input[1].x || input[0].y === input[1].y) && input
  )

/**
 * get biggest values x and y in order to build the diagram
 */
const getBiggestInputValues = (inputs: TLine[]): TCoor =>
  inputs.reduce(
    (acc, line) => {
      const biggestInLine = (coor: "x" | "y") =>
        line.reduce((a, b) => (b[coor] > a ? b[coor] : a), 0)

      const biggest = (coor: "x" | "y") =>
        biggestInLine(coor) > acc[coor] ? biggestInLine(coor) : acc[coor]

      return {
        x: biggest("x"),
        y: biggest("y"),
      }
    },
    { x: 0, y: 0 }
  )

/**
 * Build the diagram (replace '.' by 0) 
    [
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      // ...
    ]
 */
const buildDiagram = (biggestValues: TCoor): TDiagram =>
  new Array(biggestValues.y + 1)
    .fill(null)
    .map(() => new Array(biggestValues.x + 1).fill(0))

/**
 * Mark covered points by lines
 * WARN, "diagram" non premitive array will be muted in this function
 */
const markCoveredPoints = (diagram: TDiagram, inputs: TLine[]): TDiagram => {
  for (const line of inputs) {
    const moveHorizontally = line[0].x !== line[1].x

    if (moveHorizontally) {
      const [from, to] = [line[0].x, line[1].x].sort((a, b) => a - b)
      for (let i = from; i <= to; i++) {
        diagram[line[0].y][i] = diagram[line[0].y][i] + 1
      }
    } else {
      const [from, to] = [line[0].y, line[1].y].sort((a, b) => a - b)
      for (let i = from; i <= to; i++) {
        diagram[i][line[0].x] = diagram[i][line[0].x] + 1
      }
    }
  }
  return diagram
}

/**
 * Return overlap lines number
 */
const countOverlapLines = (markedDiagram: TDiagram): number =>
  markedDiagram.reduce(
    (prev, line) => prev + line.reduce((a, b) => a + (b >= 2 ? 1 : 0), 0),
    0
  )

/**
 * part 1
 */
export const part1 = (inputs = getInputs("inputs.txt")) => {
  const biggestValues = getBiggestInputValues(inputs)
  const diagram = buildDiagram(biggestValues)
  const markedDiagram = markCoveredPoints(diagram, inputs)
  return countOverlapLines(markedDiagram)
}
