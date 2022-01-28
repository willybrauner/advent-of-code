// https://adventofcode.com/2021/day/5

import formatInputs from "./formatInputs"

export type TDiagram = number[][]
export type TCoor = { x: number; y: number }
export type TLine = [TCoor, TCoor]

/**
 * select only matching x1 and x2 or y1 and y2
 */
export const getHorizontalAndVerticalInputs = (file = "inputs.txt") =>
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
      ...
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
    const [x1, x2] = [line[0].x, line[1].x]
    const [y1, y2] = [line[0].y, line[1].y]

    const moveHorizontally = x1 !== x2 && y1 === y2
    const moveVertically = y1 !== y2 && x1 === x2
    const moveOnDiagonal = y1 !== y2 && x1 !== x2

    if (moveHorizontally) {
      const [from, to] = [x1, x2].sort((a, b) => a - b)
      for (let i = from; i <= to; i++) {
        diagram[y1][i] += 1
      }
    } else if (moveVertically) {
      const [from, to] = [y1, y2].sort((a, b) => a - b)
      for (let i = from; i <= to; i++) {
        diagram[i][x1] += 1
      }
    }
    if (moveOnDiagonal) {
      for (let i = 0; i <= Math.abs(x1 - x2); i++) {
        const distanceX = Math.sign(x1 - x2) * -i
        const distanceY = Math.sign(y1 - y2) * -i
        diagram[y1 + distanceY][x1 + distanceX] += 1
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

const resolvePart = (inputs: TLine[]): number => {
  const biggestValues = getBiggestInputValues(inputs)
  const diagram = buildDiagram(biggestValues)
  const markedDiagram = markCoveredPoints(diagram, inputs)
  return countOverlapLines(markedDiagram)
}

/**
 * part 1
 */
export const part1 = (inputs = getHorizontalAndVerticalInputs("inputs.txt")): number =>
  resolvePart(inputs)

/**
 * part 2
 */
export const part2 = (inputs = formatInputs("inputs.txt")): number => 
  resolvePart(inputs)
