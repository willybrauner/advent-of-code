// https://adventofcode.com/2021/day/11
const { log } = console

export const part1 = (inputs: number[][]) => {
  let lights = 0

  const runStep = (pY, pX) => {
    for (let y = -1 + pY; y <= 1 + pY; y++) 
    {
      for (let x = -1 + pX; x <= 1 + pX; x++) 
      { 
        // log({y,x}, {pY, pX})
        if (!inputs?.[y]?.[x]) continue
        
        if (inputs[y][x] === 10) {
          inputs[y][x] = 0
          lights++
          runStep(y, x)
        }        
        
        inputs[y][x]++
        
      }
    }
  }

  // start
  for (let i = 0 ; i < 1; i++)
  {
    inputs = inputs.map(e => e.map(e => e+1))
    runStep(0, 0)
    log(inputs)
  }

  // ---------------------------------------------------

  const run = () => 
  {
   for (let y = 0; y < inputs.length; y++) 
    {
      for (let x = 0; x < inputs[y].length; x++) 
      {

        if (inputs[y][x] > 9) 
        {  
   
          let adjCoor = [
            [y-1, x-1],
            [y-1, x],
            [y-1, x+1],
            [y, x-1],
            [y, x+1],
            [y+1, x-1],
            [y+1, x],
            [y+1, x+1] 
          ]
    
          // increment
           adjCoor.forEach((e) => {
            if (!inputs?.[e[0]]?.[e[1]]) return
            inputs[e[0]][e[1]]++
          })

          inputs[y][x] = 0
          log(inputs)
        }
      }
    }
  }


  // start 
  // for (let i = 0 ; i < 2; i++)
  // {
  //   inputs = inputs.map(e => e.map(e => e+1))
  //   run()
  //   log('inputs',inputs)
  // }

  return lights
}









export const part2 = (inputs) => {}
