/**
 * 2024 - Day 6
 * https://adventofcode.com/2024/day/6
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = string[][]
type Coords = [number, number]

const useInput = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((e) => e.split(''))

const findGuard = (input: Input): Coords => {
  for (let y = 0; y < input.length; y++)
    for (let x = 0; x < input[y].length; x++)
      if (input[y][x] === '^') return [y, x]
}

const findObstacles = (input: Input): Coords[] => {
  const obstacles: Coords[] = []
  for (let y = 0; y < input.length; y++)
    for (let x = 0; x < input[y].length; x++)
      if (input[y][x] === '#') obstacles.push([y, x])
  return obstacles
}

const moveGuard = (
  [y, x]: Coords,
  obstacles: Coords[],
  input: Input,
  preventLoops = false,
): { visited: Set<string>; isLoop: boolean } => {
  const visited = new Set<string>()
  const obstacleSet = new Set(obstacles.map(([oy, ox]) => `${oy},${ox}`)) // Optimize obstacle lookup
  let dir = 0

  while (true) {
    const key = `${y},${x}` + (preventLoops ? `,${dir}` : '')
    if (preventLoops && visited.has(key)) {
      return { visited, isLoop: true }
    }
    visited.add(key)

    let ny = y
    let nx = x
    if (dir === 0) ny--
    if (dir === 1) nx++
    if (dir === 2) ny++
    if (dir === 3) nx--

    // If the guard get go out the grid
    if (ny < 0 || ny >= input.length || nx < 0 || nx >= input[ny].length)
      return { visited, isLoop: false }

    // If the next is an obstacle
    // I was searching inside obstacles on each frame but doesn't work on part 2
    // Need to use an externalized Set.
    //  if (obstacles.some(([oy, ox]) => oy === ny && ox === nx)) {
    if (obstacleSet.has(`${ny},${nx}`)) {
      // update dir
      dir = (dir + 1) % 4
    } else {
      // update coords
      y = ny
      x = nx
    }
  }
}

const part1 = (input: Input) => {
  const guard = findGuard(input)
  const obstacles = findObstacles(input)
  const { visited } = moveGuard(guard, obstacles, input)
  return visited.size
}

log(part1(useInput('input')))

const part2 = (input: Input): number => {
  const guard = findGuard(input)
  const obstacles = findObstacles(input)
  const { visited } = moveGuard(guard, obstacles, input, true)

  const obstructionCoords = new Set<string>()
  for (const coords of visited) {
    const [y, x] = coords.split(',').map(Number)
    if (y === guard[0] && x === guard[1]) continue
    const modifiedObstacles: Coords[] = [...obstacles, [y, x]]
    const { isLoop } = moveGuard(guard, modifiedObstacles, input, true)
    if (isLoop) obstructionCoords.add(`${y},${x}`)
  }
  return obstructionCoords.size
}

// Run part2
log(part2(useInput('input')))
