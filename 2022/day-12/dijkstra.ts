export interface TItemKey<K = any> {
  key: K
  priority: number
}

/**
 * dijkstra
 * @param getNeighbors
 * @param getCostBetweenVertices
 * @param source
 * @param isTarget
 * @param queue
 */
export function dijkstra<GVertex>(
  getNeighbors: (v: GVertex) => GVertex[],
  getCostBetweenVertices: (a: GVertex, b: GVertex) => number,
  source: GVertex,
  isTarget: (vertex: GVertex) => boolean,
  queue = priorityQueueMinHeap<GVertex>()
) {
  let distances = { [`${source}`]: 0 }
  queue.enqueue(source, 0)
  let finalCost = 0
  let count = 0

  while (!queue.isEmpty()) {
    count++
    const shortestVertex = queue.dequeue()
    const currentVertex = shortestVertex.key
    const neighborVertices = getNeighbors(currentVertex)

    if (isTarget(currentVertex)) {
      finalCost = shortestVertex.priority
      break
    }

    for (const v of neighborVertices) {
      const newDistance =
        distances[`${currentVertex}`] + getCostBetweenVertices(currentVertex, v)

      if (newDistance < (distances[`${v}`] || Infinity)) {
        distances[`${v}`] = newDistance
        queue.enqueue(v, newDistance)
      }
    }
  }

  return { finalCost, distances, count }
}

/**
 * Priority queue with Heap
 *
 * Goal is not to maintain an update a strict order list
 * but to be sure that:
 *  - (nodeIndex * 2) & (nodeIndex * 2 + 1) are greater than nodeIndex priority in heap
 *  - floor(nodeIndex / 2) is smaller than heap[nodeIndex]
 *
 * heap example after insertion:
 *     [
 *       null,
 *       { key: 'F', priority: 14 },
 *       { key: 'D', priority: 19 },
 *       { key: 'B', priority: 36 },
 *       { key: 'A', priority: 100 },
 *       { key: 'C', priority: 30 }
 *     ]
 *
 * @doc: https://en.wikipedia.org/wiki/Heap_(data_structure)
 */
export function priorityQueueMinHeap<K = any>() {
  const heap = [null]

  /**
   * Swipe positions in heap by index
   * @param i
   * @param j
   */
  const _swapPositionsInHeapByIndex = (i: number, j: number): void => {
    let x = heap[i]
    heap[i] = heap[j]
    heap[j] = x
  }

  /**
   * enqueue
   * Insert value is priority in appropriate position in heap
   */
  const enqueue = (key: any, priority: number): void => {
    const node = { key, priority } as TItemKey<K>
    // push new node in heap (at the end of heap)
    // get new current node index (at the last position of heap array)
    // get parent index (is current (index / 2) AND floor to round down the value)
    heap.push(node)
    let nodeIndex = heap.length - 1
    let parentNodeIndex = Math.floor(nodeIndex / 2)

    while (node.priority < heap[parentNodeIndex]?.priority) {
      // invert parent node and node in heap
      // update there indexs
      _swapPositionsInHeapByIndex(nodeIndex, parentNodeIndex)
      nodeIndex = parentNodeIndex
      parentNodeIndex = Math.floor(nodeIndex / 2)
    }
  }

  /**
   * dequeue
   * Remove item from heap
   */
  const dequeue = (): TItemKey<K> => {
    if (heap.length < 3) {
      const node = heap.pop()
      heap[0] = null
      return node
    }

    // Remove last heap item and insert it as first item of the heap
    const node = heap[1]
    let x = heap.pop()
    heap[1] = x

    // We need to get the smallest value index of left/right pair
    let index = 1
    let [left, right] = [2 * index, 2 * index + 1]
    let childIndex =
      heap[right]?.priority <= heap[left]?.priority ? right : left

    while (
      heap[childIndex] &&
      heap[index].priority >= heap[childIndex].priority
    ) {
      // invert child node and node in heap
      // update there indexs (we need to re evaluate left and right)
      _swapPositionsInHeapByIndex(index, childIndex)
      index = childIndex
      let [left, right] = [2 * index, 2 * index + 1]
      childIndex = heap[right]?.priority <= heap[left]?.priority ? right : left
    }
    return node
  }

  const isEmpty = (): boolean => heap.length === 0

  return Object.freeze({
    enqueue,
    dequeue,
    isEmpty,
    heap,
  })
}
