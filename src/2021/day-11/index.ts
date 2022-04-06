// https://adventofcode.com/2021/day/11
const { log } = console


let flashes = 0;
let stepFlashCoords = [];

const _runStep = (inputs) => 
{
  for (let y = 0; y < inputs.length; y++) 
  {
    for (let x = 0; x < inputs[y].length; x++) 
    {
      if (inputs[y][x] > 9) 
      {  

        const adjCoor = [
          [y-1, x-1],
          [y-1, x],
          [y-1, x+1],
          [y, x-1],
          [y, x+1],
          [y+1, x-1],
          [y+1, x],
          [y+1, x+1] 
        ]
        
        // flash!
        inputs[y][x] = 0
        
        // if has aready flashed, next iteration
        if (stepFlashCoords.some(e=> e.y === y && e.x === x)) continue

        // increment counter
        flashes++
        
        // keep flash coordinates in global
        stepFlashCoords.push({y,x})
  
        // increment adjcent
          adjCoor.forEach((e) => {
          if (!inputs?.[e[0]]?.[e[1]]) return
          inputs[e[0]][e[1]]++
        })

        // if one of adjacent is gretter than 9, run step recucively
        adjCoor.forEach((e) => {
          if (inputs?.[e[0]]?.[e[1]] > 9) {
           _runStep(inputs)
          }
        })
      
      }
    }
  }
}


export const part1 = (inputs: number[][]) => {

    //  start !
  for (let i = 0 ; i < 100; i++)
  {
    // re init array
    stepFlashCoords = []
    // increment each 
    inputs = inputs.map(e => e.map(e => e+1)) 
    // ruuuuun
   _runStep(inputs)
  }
  
  // resolve part 1
   return flashes


}

/**
 * Part 2
 * @param inputs 
 */
export const part2 = (inputs: number[][]) => 
{

  let fullFlashingMotherFunkingStepNumber = 0
  while(true)
  {

    fullFlashingMotherFunkingStepNumber++

    // re init array
    stepFlashCoords = []
    // increment each 
    inputs = inputs.map(e => e.map(e => e+1)) 
    // ruuuuun
   _runStep(inputs)

    

    if (inputs.every(e => e.every(e => e === 0)))
    {
      break
    }
  }

  return fullFlashingMotherFunkingStepNumber

}
