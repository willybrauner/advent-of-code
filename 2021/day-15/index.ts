// https://adventofcode.com/2021/day/15
import { TInputs } from "./inputs-format"
const { log } = console

/**
 * Priority queue
 */
type TQueueElement = [coord: string, value: number]
function priorityQueue() {
  const collection: TQueueElement[] = []
  const isEmpty = (): boolean => collection.length === 0
  const enqueue = (element: TQueueElement): void => {
    if (isEmpty()) {
      collection.push(element)
    } else {
      let added = false
      for (let i = 1; i <= collection.length; i++) {
        if (element[1] < collection[i - 1][1]) {
          collection.splice(i - 1, 0, element)
          added = true
          break
        }
      }
      if (!added) {
        collection.push(element)
      }
    }
  }
  const dequeue = (): TQueueElement => {
    let value = collection.shift()
    return value
  }
  return Object.freeze({ isEmpty, dequeue, enqueue })
}

/**
 * Process dijkstra algo on graph
 * @param graph
 * @param start
 * @param end
 */
function dijkstra(
  pGraph: { [x: string]: { [x: string]: string } },
  start?: string,
  end?: string
) {
  const graph = pGraph
  const nodes: string[] = Object.keys(graph)
  const startNode: string = start || nodes[0]
  const endNode: string = end || nodes[nodes.length - 1]
  const distances = { [startNode]: 0 }

  const queue = priorityQueue()
  queue.enqueue([startNode, 0])

  while (!queue.isEmpty()) {
    const shortestNode = queue.dequeue() // ex: [ '8,6', 37 ]
    const currentNode = shortestNode[0]
    const adjNodes = graph[currentNode]

    // loop on adjNodes keys ex: 5,3 , 6,2
    for (const coord in adjNodes) {
      // new distance is the registered distance for this current node + adjacent key value / ex: adjNodes { '6,8': 2, '7,7': 6 }, key is 7,7, adjNodes[key] is 6
      let newDistance: any = distances[currentNode] + adjNodes[coord]
      if (newDistance < (distances[coord] || Infinity)) {
        distances[coord] = newDistance
        queue.enqueue([coord, newDistance])
      }
    }
  }
  return { risk: distances[endNode] }
}

/**
 * Prepare graph for dijkstras Algorithm
 * ex:
 * 1163751742
 * 1381373672
 *
 *   {
 *    '0,0': { '0,1': 1, '1,0': 1 },
 *    '0,1': { '0,2': 6, '1,1': 3, '0,0': 1 },
 *     ...
 *   }
 */
const buildGraph = (inputs: TInputs) => {
  const graph = {}
  for (let y = 0; y < inputs.length; y += 1) {
    for (let x = 0; x < inputs[y].length; x += 1) {
      const up = inputs?.[y - 1]?.[x],
        down = inputs?.[y + 1]?.[x],
        prev = inputs?.[y]?.[x - 1],
        next = inputs?.[y]?.[x + 1]
      Object.assign(graph, {
        [`${y},${x}`]: {
          ...(next ? { [`${y},${x + 1}`]: next } : {}),
          ...(down ? { [`${y + 1},${x}`]: down } : {}),
          ...(prev ? { [`${y},${x - 1}`]: prev } : {}),
          ...(up ? { [`${y - 1},${x}`]: up } : {}),
        },
      })
    }
  }
  return graph
}

/**
 * Build 5 dimensions inputs
 * @param inputs
 * @credits https://github.com/superguigui/AoC-2021/blob/main/15/index.js
 */
const buildFiveDimensionsInputs = (inputs: TInputs) => {
  const [h, w] = [inputs.length, inputs[0].length]
  return [...Array(h * 5)].map((_, y) =>
    [...Array(w * 5)].map(
      (_, x) => ((inputs[y % h][x % w] + ~~(y / h) + ~~(x / w) - 1) % 9) + 1
    )
  )
}

export const part1 = (inputs: TInputs): number => {
  const graph = buildGraph(inputs)
  return dijkstra(graph).risk
}

export const part2 = (inputs: TInputs): number => {
  const fiveDimensionsInputs = buildFiveDimensionsInputs(inputs)
  const graph = buildGraph(fiveDimensionsInputs)
  return dijkstra(graph).risk
}
