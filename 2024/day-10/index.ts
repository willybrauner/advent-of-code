/**
 * 2024 - Day 10
 * https://adventofcode.com/2024/day/10
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
    .map((e) => e.split('').map((e) => (e !== '.' ? parseInt(e) : e)))

const getTrailheads = (input: Input): Coords[] => {
  const trailheads: Coords[] = []
  for (let y = 0; y < input.length; y++)
    for (let x = 0; x < input.length; x++)
      if (input[y][x] === 0) trailheads.push([y, x])
  return trailheads
}

// prettier-ignore
const score = (input: Input, [sy, sx]: Coords, checkAllPaths = false): number => {
  const dirs = [[1, 0],[0, 1],[-1, 0],[0, -1]]
  const stack: Coords[] = [[sy, sx]]
  const visited = new Set<string>()
  visited.add(`${sy},${sx}`)
  let count = 0
  let rating = 0
  
  while (stack.length) {
    const [y, x] = stack.pop()
//    const [y, x] = queue.shift() // Utiliser shift() pour BFS au lieu de pop() pour DFS

    visited.add(`${y},${x}`)

    for (const [dy, dx] of dirs) {
      const [ny, nx] = [y + dy, x + dx]
      const curr = input?.[y]?.[x]
      const next = input?.[ny]?.[nx]

      if (
        next === (curr as number) + 1 && 
        (checkAllPaths || !visited.has(`${ny},${nx}`))
      ) {
        stack.push([ny, nx])
        visited.add(`${ny},${nx}`)
        if (next === 9) {
          count++
          rating += 1
        }
      }
    }
  }
  return count
}

const part1 = (input: Input) =>
  getTrailheads(input).reduce(
    (a: number, coords: Coords) => a + score(input, coords),
    0,
  )

log(part1(useInput('input')))

const part2 = (input: Input) =>
  getTrailheads(input).reduce(
    (a: number, coords: Coords) => a + score(input, coords, true),
    0,
  )

log(part2(useInput('input')))
