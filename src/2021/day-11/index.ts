// https://adventofcode.com/2021/day/11
const {log} = console

export const part1 = (inputs: number[][]) => {

  let adjacent = (y, x) => ({
    [`${y}/${x - 1}`]: inputs[y]?.[x - 1],           // center prev
    [`${y}/${x + 1}`]: inputs[y]?.[x + 1],           // center next
    [`${y - 1}/${x}`]: inputs[y - 1]?.[x],           // top
    [`${y - 1}/${x - 1}`]: inputs[y - 1]?.[x - 1],   // top prev
    [`${y - 1}/${x + 1}`]: inputs[y - 1]?.[x + 1],   // top next
    [`${y + 1}/${x}`]: inputs[y + 1]?.[x],           // bottom
    [`${y + 1}/${x - 1}`]: inputs[y + 1]?.[x - 1],   // bottom prev
    [`${y + 1}/${x + 1}`]: inputs[y + 1]?.[x + 1],   // bottom next
  })

  for (let r = 0; r < 3; r++) {
    log("inputs", inputs)

    for (let i = 0; i < inputs.length; i++) {
      for (let p = 0; p < inputs[i].length; p++) {

        inputs[i][p]++
        if (inputs[i][p] > 9)
        {
          inputs[i][p] = 0
          const increment = (y, x) => {
            const adj = adjacent(y, x)
            // log('adj',adj)
            for (let el of Object.keys(adj)) {
              if (adj[el]) adj[el]++
              if (adj[el] > 9) {
                adj[el] = 0
                const [y, x] = el.split("/").map(e => parseInt(e))
                increment(y, x)
              }
            }
          }
          increment(p, i)
        }


      }
    }
  }
}


export const part2 = (inputs) => {

}
