/**
 * 2025 - Day 8
 * https://adventofcode.com/2025/day/8
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

/**
 * Union-Find (Disjoint Set Union = DSU)
 */
class DSU {
  n: number
  parent: number[]
  size: number[]
  constructor(n: number) {
    this.n = n
    this.parent = Array.from({ length: n }, (_, i) => i)
    this.size = Array(n).fill(1)
  }
  // return the root index of x
  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x])
    }
    return this.parent[x]
  }
  // union by size; return true if where is an union
  union(a: number, b: number) {
    let ra = this.find(a)
    let rb = this.find(b)
    if (ra === rb) return false
    // if the size of root a is less than that of root b, swap them
    if (this.size[ra] < this.size[rb]) [ra, rb] = [rb, ra]
    this.parent[rb] = ra
    this.size[ra] += this.size[rb]
    return true
  }
  // Rerturn the size of the set that contains x
  sizeOf(x: number): number {
    return this.size[this.find(x)]
  }
  // Return the sizes of all components
  componentSizes(): number[] {
    const counts = new Map<number, number>()
    for (let i = 0; i < this.parent.length; i++) {
      const r = this.find(i)
      counts.set(r, (counts.get(r) ?? 0) + 1)
    }
    return Array.from(counts.values())
  }
}
type Input = number[][]

const useInput = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((e) => e.split(',').map(Number))

const part1 = (input: Input) => {
  const keep: { i: number; j: number; distance: number }[] = []

  // prettier-ignore
  for (let i = 0; i < input.length; i++) {
    const [ax, ay, az] = input[i]
    for (let j = i + 1; j < input.length; j++) {
      const [bx, by, bz] = input[j]
      keep.push({
         i, j,
         distance: (
              ((ax-bx) * (ax-bx))
            + ((ay-by) * (ay-by)) 
            + ((az-bz) * (az-bz)) 
         )
      })
    }
  }

  const keepSorted = keep
    .sort((a, b) => a.distance - b.distance)
    .filter((_, i) => i < 1000)

  const dsu = new DSU(input.length)
  for (const { i, j } of keepSorted) dsu.union(i, j)
  return dsu
    .componentSizes()
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a * b, 1)
}

log(part1(useInput('input')))

const part2 = (input: Input) => {
  return input
}
part2(useInput('input.test'))
