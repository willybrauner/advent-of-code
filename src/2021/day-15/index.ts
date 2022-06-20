// https://adventofcode.com/2021/day/15
import { TInputs } from "./inputs-format"
const { log } = console



/**
 * Priority queue 
 * places elements in order based on the weight each element has
 * @link https://medium.com/@adriennetjohnson/a-walkthrough-of-dijkstras-algorithm-in-javascript-e94b74192026
 */
class PriorityQueue {
  collection: any[] = []
  enqueue(element): void {
    if (this.isEmpty()) {
      this.collection.push(element)
    } else {
      let added = false
      for (let i = 1; i <= this.collection.length; i++) {
        if (element[1] < this.collection[i - 1][1]) {
          this.collection.splice(i - 1, 0, element)
          added = true
          break
        }
      }
      if (!added) {
        this.collection.push(element)
      }
    }
  }
  dequeue() {
    let value = this.collection.shift()
    return value
  }
  isEmpty():boolean {
    return this.collection.length === 0
  }
}





/**
 * Process dijkstra algo on graph
 * @param graph
 * @param start
 * @param end
 */
 type TGraph = { [x: string]: { [x: string]: string } }

function dijkstra(pGraph: TGraph, start?: string, end?: string) {
  // adjacent nodes
  const graph: TGraph = pGraph
  // nodes list
  const nodes: string[] = Object.keys(graph)
  // if start node is node is not defined, use first vertice
  const startNode: string = start || nodes[0]
  // if end node is node is not defined, use last vertice
  const endNode: string = end || nodes[nodes.length - 1]

  // prepare
  let distances = { [startNode]: 0 }
  let isVisited = {}
  // create priority quey instance
  let priorityQueue = new PriorityQueue();
  priorityQueue.enqueue([startNode, 0]);

  // loop until current visitied exist
  while (!priorityQueue.isEmpty()) {

    let shortestStep = priorityQueue.dequeue();
    let currentNode = shortestStep[0];
    let adjNodes = graph[currentNode]

    // loop on adjNodes keys ex: 5,3 , 6,2
    for (const key in adjNodes) {
      // new distance is the registered distance for this current node + adjacent key value / ex: adjNodes { '6,8': 2, '7,7': 6 }, key is 7,7, adjNodes[key] is 6
      let newDistance: any = distances[currentNode] + adjNodes[key]
      // register in dist only if new distance is smallest to existing
      if (newDistance < (distances[key] || Infinity)) {
        distances[key] = newDistance
        priorityQueue.enqueue([key, newDistance]);
      }
    }

    // flag as visited node
    isVisited[currentNode] = true
  }

  return { distances, risk: distances[endNode] }
}

/**
   * Prepare graph for dijkstras Algorithm
   * ex: 
   * 1163751742
   * 1381373672
   * 
   const graph = {
    // coor : { nex, down, prev, up }
    '0,0': { '0,1': 1, '1,0': 1 },
    '0,1': { '0,2': 6, '1,1': 3, '0,0': 1 },
    ...
    }
*/
const buildGraph = (inputs: TInputs) => {
  const graph = {}

  // prepare graph reprentation
  for (let y = 0; y < inputs.length; y += 1) {
    for (let x = 0; x < inputs[y].length; x += 1) {
      const curr = inputs?.[y]?.[x],
        up = inputs?.[y - 1]?.[x],
        down = inputs?.[y + 1]?.[x],
        prev = inputs?.[y]?.[x - 1],
        next = inputs?.[y]?.[x + 1]

      let key = `${y},${x}`

      Object.assign(graph, {
        [key]: {
          ...(next ? { [`${y},${x + 1}`]: next } : {}),
          ...(down ? { [`${y + 1},${x}`]: down } : {}),
          // ...(prev ? { [`${y},${x - 1}`]: prev } : {}),
          // ...(up ? { [`${y - 1},${x}`]: up } : {}),
        },
      })
    }
  }
  return graph
}

/**
 * Build 5 dimensions graph
 * @param inputs
 * @returns
 */
const buildFiveDimensionsInputs = (inputs: TInputs) => {
  // get horizontal grid lines
  let LINES = []
  for (const line of inputs) {
    const newLine = [line]
    for (let j = 1; j < 5; j++) {
      // increment each risk of this line
      newLine.push(
        newLine[newLine.length - 1].map((a) => {
          let v = a + 1
          if (v > 9) v = 1
          return v
        })
      )
    }
    LINES.push(newLine.flat())
  }

  let VERTICALS = [...LINES]
  for (let i = 0; i < 4; i++) {
    const newLines = []
    for (const line of VERTICALS.slice(i * 10)) {
      const l = line.map((a) => {
        let v = a + 1
        if (v > 9) v = 1
        return v
      })
      newLines.push(l)
    }
    VERTICALS = [...VERTICALS, ...newLines]
  }

  return VERTICALS
}

// ----------------------------------------------------------------------------------

export const part1 = (inputs: TInputs) => {
  const graph = buildGraph(inputs)
  const { risk } = dijkstra(graph)
  return risk - inputs[0][0]
}

export const part2 = (inputs) => {
  const fiveDimensionsInputs = buildFiveDimensionsInputs(inputs)
  const graph = buildGraph(fiveDimensionsInputs)
  const { risk } = dijkstra(graph)
  return risk - inputs[0][0]
}
