// https://adventofcode.com/2021/day/8

export const part1 = (inputs) =>
  inputs
    .map((el) => el.filter((_, i) => i === 1))
    .flat()
    .flat()
    .reduce((acc, curr) => {
      const l = curr.length
      return l === 2 || l === 4 || l === 3 || l === 7 ? acc + 1 : acc
    }, 0)

export const part2 = (inputs) => {

  const total = []

  for (let input of inputs) 
  {
    
    const signals = input[0]
      .map((el) => el.split("").sort().join(""))
      .sort((a, b) => a.length - b.length)

    const outputs = input[1]
      .map((el) => el.split("").sort().join(""))

    // utils
    const diffBetweenTwoSignals = (arr1, arr2) => 
      arr1.filter(x => !arr2.includes(x))
      .concat(arr2.filter(x => !arr1.includes(x)));

    /**
     *   segments | matching digit number
     * ----------------------------------
     * 1 segment  | /
     * 2 segments | 1
     * 3 segments | 7
     * 4 segments | 4
     * 5 segments | 3 (match w/ 1), 5 (match with 4 who aren't match to 1), 2
     * 6 segments | 6 (only one match with 1), 0, 9
     * 7 segments | 8
     */
    const arr = new Array(10).fill(null)
    for (const s of signals) 
    {
      if (s.length === 0 || s.length === 1) continue
      else if (s.length === 2) arr[1] = s
      else if (s.length === 3) arr[7] = s
      else if (s.length === 4) arr[4] = s
      else if (s.length === 7) arr[8] = s

      else if (s.length === 5) {
      
        // is '3' if it contains segments of "1" (right top / right bottom)
        if (
          arr[1].split('').map((e)=> s.includes(e)).filter(e => e).length === 2
          ) {
          arr[3] = s
        }
        // is '5' if contains segment of 4 without segment of 1 (top left and center)
        else if (
          diffBetweenTwoSignals(arr[4].split(""),arr[1].split(""))
            .every(segment => s.split('').some(e => e === segment))
        ){
          arr[5] = s
        } 
        // is '2'
        else {
          arr[2] = s
        }
      }

      else if (s.length === 6) {
        
        // is '6', if contains one cara difference with 1
        if (
          !arr[1].split('').every(segment => s.split('').some(e => e === segment))
          ){
          arr[6] = s
        }
        // is '0', if contains one cara difference with 4
        else if (
          !arr[4].split('').every(segment => s.split('').some(e => e === segment))
        ) {
          arr[0] = s
        }
        // is '9'
        else {
          arr[9] = s
        }
      } 
    }
    
    total.push( 
      outputs.reduce((prev, curr) =>  
        parseInt([prev,  arr.findIndex(e => e === curr)].join(''))
      ,0)
    )

  }

  return total.reduce((prev, curr)=> prev + curr, 0)
}
