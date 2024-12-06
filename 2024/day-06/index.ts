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

const moveGuard = (guard: Coords, obstacles: Coords[], input: Input) => {
  const step = ([y, x]: Coords, dir: number, count: number) => {
    let ny = y
    let nx = x

    // update the guard position
    if (dir === 0) ny--
    if (dir === 1) nx++
    if (dir === 2) ny++
    if (dir === 3) nx--

    // check if we are out of bounds
    if (ny < 0 || ny > input.length - 1 || nx < 0 || nx > input[ny].length - 1) {
      log('FINISH, guard pos is', [y, x], count)
      return count
    }

    // check if there is a collision with #
    // mutate the dir & restart before mutate guard position
    if (obstacles.some(([oy, ox]) => oy === ny && ox === nx)) {
      count += input[y][x] === '^' ? 0 : (input[y][x] as number)
      return step([y, x], (dir + 1) % 4, count)
    }

    y = ny
    x = nx
    log([y, x], input[y][x])

    count += input[y][x] === '^' ? 0 : (input[y][x] as number)
    input[y][x] = 0
    return step([y, x], dir, count)
  }

  // next step
  return step(guard, 0, 1)
}

const part1 = (input: Input) => {
  const guard = findGuard(input)
  log('guard', guard)
  const obstacles = findObstacles(input)
  const moves = moveGuard(guard, obstacles, input)
  log('moves', moves)

  return input
}
part1(useInput('input'))

const part2 = (input: Input) => {
  return input
}
part2(useInput('input.test'))
