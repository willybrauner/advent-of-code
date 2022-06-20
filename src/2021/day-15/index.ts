// https://adventofcode.com/2021/day/15
import { TInputs } from "./inputs-format"
const { log } = console

type TGraph = { [x: string]: { [x: string]: string } }

/**
 * Process dijkstra algo on graph
 * @param graph
 * @param start
 * @param end
 * @returns
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
  for (let i = 0; i < vertices.length; i++) {
    if (vertices[i] === startNode) {
      dist[vertices[i]] = 0
    } else {
      dist[vertices[i]] = Infinity
    }
    verticePathFrom[vertices[i]] = vertices[i]
    isVisited[vertices[i]] = false
  }

  let currentVisited = startNode
  while (currentVisited !== null) {
    let edges = adjVertices[currentVisited]
    let distance = dist[currentVisited]
    //console.log('1',edges, distance)
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

  //return { dist, verticePathFrom, isVisited }
  // return risk
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

const buildFiveDimensionGraph = (inputs: TInputs) => {
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

    log("newLine", newLine.flat().join(""))
    LINES.push(newLine.flat())
  }


  // TODO 
  const VERTICALS = []
  for (let i = 1; i <= 5; i++) {
    for (const line of LINES) {
      
      VERTICALS.push(
        line.map((a) => {
          let v = a + i
          if (v > 9) v = 1
          return v
        })
      )
    }
    log("VERTICALS",VERTICALS.map(e => e.join('')))
     log("-----------------------")
     if (i === 2) {break}
  }

  //log("LINES", LINES)
}

// ----------------------------------------------------------------------------------

export const part1 = (inputs: TInputs) => {
  const graph = buildGraph(inputs)
  const { risk } = dijkstra(graph)
  return risk - inputs[0][0]
}

export const part2 = (inputs) => {
  const fiveDimensionsGraph = buildFiveDimensionGraph(inputs)
  log("fiveDimensionsGraph", fiveDimensionsGraph)
  const graph = buildGraph(inputs)
  const { risk } = dijkstra(graph)
  return risk - inputs[0][0]
}
