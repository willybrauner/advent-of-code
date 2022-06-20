// https://adventofcode.com/2021/day/15
import { TInputs } from "./inputs-format"
const { log } = console

type TGraph = { [x: string]: { [x: string]: string } }

/**
 * Process dijkstra algo on graph
 * @param graph
 * @param start
 * @param end
 */
function dijkstra(graph: TGraph, start?: string, end?: string) {
  const vertices: string[] = Object.keys(graph)
  const adjVertices: TGraph = graph
  // if start node is node is not defined, use first vertice
  const startNode: string = start || vertices[0]
  // if end node is node is not defined, use last vertice
  const endNode: string = end || vertices[vertices.length - 1]

  // prepare
  let dist = {}
  let isVisited = {}
  let verticePathFrom = {}

  // loop on vertices who are coordinates (ex: 0,0 / 0,1 etc...)
  for (let i = 0; i < vertices.length; i++) {

    // if is startNode (0,0) register, 0 to distance counter on this node
    // { '0,0': 0 }
    if (vertices[i] === startNode) {
      dist[vertices[i]] = 0  
    } 
    // else, register infinity
    // ex: { '9,4': Infinity }
    else {
      dist[vertices[i]] = Infinity
    }

    // register vertice Path from
    // { '0,0': { '0,1': 1, '1,0': 1 } }
    verticePathFrom[vertices[i]] = vertices[i]
    
    // register visited status on it
    // { '0,0': false }
    isVisited[vertices[i]] = false
  }

  let currentVisited = startNode
  while (currentVisited !== null) {
    let edges = adjVertices[currentVisited]
    let distance = dist[currentVisited]
    for (const key in edges) {
      let newDistance = distance + edges[key]

      if (newDistance < dist[key]) {
        dist[key] = newDistance
        verticePathFrom[key] = currentVisited
      }
    }
    isVisited[currentVisited] = true

    let minDistance = Infinity
    let currVertice = null
    for (const key in dist) {
      if (dist[key] < minDistance && isVisited[key] !== true) {
        minDistance = dist[key]
        currVertice = key
      }
    }

    currentVisited = currVertice
  }

  return { dist, risk: dist[endNode] }
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
    const newLines = [];
    for (const line of VERTICALS.slice(i*10)) {
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
  return risk
}
