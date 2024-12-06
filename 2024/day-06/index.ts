/**
 * 2024 - Day 6
 * https://adventofcode.com/2024/day/6
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = (string | number)[][]
type Coords = [number, number]

const useInput = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((e) => e.split(''))
    .map((e) => e.map((e) => (e === '.' ? 1 : e)))

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

const moveGuard = async (guard: Coords, obstacles: Coords[], input: Input) => {
  const step = async ([y, x]: Coords, dir: number, count: number) => {
    let ny = y
    let nx = x

    // update the guard position
    if (dir === 0) ny--
    if (dir === 1) nx++
    if (dir === 2) ny++
    if (dir === 3) nx--

    // check if we are out of bounds
    if (ny < 0 || ny >= input.length || nx < 0 || nx >= input[ny].length)
      return count

    // check if there is a collision with #
    // mutate the dir & restart before mutate guard position
    if (obstacles.some(([oy, ox]) => oy === ny && ox === nx)) {
      input[y][x] = 0
      return step([y, x], (dir + 1) % 4, count)
    }

    y = ny
    x = nx
    count += input[y][x] === '^' ? 0 : (input[y][x] as number)
    input[y][x] = 0

    // because my runtime failed due to the number of steps
    if (count % 1000 === 0) await new Promise((r) => setTimeout(r, 1))
    return step([y, x], dir, count)
  }
  // next step
  return step(guard, 0, 1)
}

const part1 = async (input: Input) => {
  const guard = findGuard(input)
  const obstacles = findObstacles(input)
  return await moveGuard(guard, obstacles, input)
}
part1(useInput('input')).then((e) => log(e))

const part2 = (input: Input) => {
  return input
}
part2(useInput('input.test'))
