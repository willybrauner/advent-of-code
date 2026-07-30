import { input } from './input'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')
const canvas = document.createElement('canvas')
app?.appendChild(canvas)

const GRID_SIZE = 1000
const CELL_SIZE = 1
const GAP = 1
const PITCH = CELL_SIZE + GAP

canvas.width = GRID_SIZE * PITCH
canvas.height = GRID_SIZE * PITCH
const ctx = canvas.getContext('2d')!

const grid: number[][] = []
for (let y = 0; y < GRID_SIZE; y++) {
  grid.push(new Array(GRID_SIZE).fill(0))
}

const STEP_DURATION = 200

function applyInstruction(index: number) {
  const { action, from, to } = input[index]
  const [x0, y0] = from
  const [x1, y1] = to

  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      if (action === 'turn on') grid[y][x] = 1
      if (action === 'turn off') grid[y][x] = 0
      if (action === 'toggle') grid[y][x] = grid[y][x] === 0 ? 1 : 0
    }
  }
}

function draw() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      ctx.fillStyle = grid[y][x] === 1 ? 'yellow' : '#555'
      ctx.fillRect(x * PITCH, y * PITCH, CELL_SIZE, CELL_SIZE)
    }
  }
}

let index = 0
let lastStepTime: number | null = null

const tick = (timestamp: number) => {
  if (lastStepTime === null) lastStepTime = timestamp
  if (timestamp - lastStepTime >= STEP_DURATION && index < input.length) {
    applyInstruction(index)
    draw()
    index++
    lastStepTime = timestamp
  }
  if (index < input.length) requestAnimationFrame(tick)
}

draw()
requestAnimationFrame(tick)
