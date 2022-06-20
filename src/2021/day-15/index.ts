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
  let dist = {}
  let isVisited = {}

  // loop on vertices who are coordinates (ex: 0,0 / 0,1 etc...)
  for (let i = 0; i < nodes.length; i++) {
    // if is startNode (0,0) register, 0 to distance counter on this node { '0,0': 0 }
    if (nodes[i] === startNode) {
      dist[nodes[i]] = 0
    }
    // else, register infinity, ex: { '9,4': Infinity }
    else {
      // dist[nodes[i]] = Infinity
    }
    // register visited status on it. ex: { '0,0': false }
    isVisited[nodes[i]] = false
  }

  // start
  let currentVisitedNode = startNode

  // loop until current visitied exist
  while (currentVisitedNode !== null) {
    // get current visited adjacent nodes
    let adjNodes = graph[currentVisitedNode]

    // loop on adjNodes keys ex: 5,3 , 6,2
    for (const key in adjNodes) {
      // new distance is the registered distance for this current node + adjacent key value / ex: adjNodes { '6,8': 2, '7,7': 6 }, key is 7,7, adjNodes[key] is 6
      let newDistance = dist[currentVisitedNode] + adjNodes[key]
      // log('newDistance',newDistance)

      // register in dist only if new distance is smallest to existing
      if (newDistance < (dist[key] || Infinity)) {
        dist[key] = newDistance
      }
    }

    // flag as visited node
    isVisited[currentVisitedNode] = true

    let minDistance = Infinity
    let currNode = null
    
    // create filtered dist bedore iteration doesn't slow down, because it creates a new Object 
    // on each iteration

    // const filteredDist = Object.keys(dist).reduce(
    //   (a, b) => ({
    //     ...a,
    //     ...(dist[b] !== Infinity ? { [b]: dist[b] } : {}),
    //   }),
    //   {}
    // )

    //log("filteredDist",filteredDist)
    for (const key in dist) {
      if (dist[key] < minDistance && isVisited[key] !== true) {
        minDistance = dist[key]
        currNode = key
      }
    }

    currentVisitedNode = currNode
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
  return risk
}
