// https://adventofcode.com/2021/day/10

type TOpen = "(" | "[" | "{" | "<";
type TClose = ")" | "]" | "}" | ">";
type TCara = TOpen & TClose

const COUPLES = [["(", ")"],["[", "]"],["{", "}"],["<", ">"]]

// utils
const isOpen = (cara:TCara) =>
  COUPLES.some(c => c[0] === cara)

const isMatching = (open, close) =>
  COUPLES.some((couple) => couple[0] === open && couple[1] === close)

const getCloseByOpen = (open:TOpen): TClose =>
  COUPLES.find(couple => couple[0] === open)[1] as TClose

/**
 * Part 1
 */
export const part1 = (inputs: TCara[][]) => {
  const illegals = []
  for (let line of inputs)
  {
    const stack = []
    for (let cara of line)
    {
      // is open, push on first position of stack
      if(isOpen(cara)) stack.unshift(cara)
      // is close
      else {
        // if open match with close, Pattern is complete, remove the first cara form stack
        if (isMatching(stack[0], cara)) stack.shift()
        // push in illegals array
        else {
          illegals.push(cara)
          break
        }
      }
    }
  }

  // return obj  { '}': 2, '>': 2, ')': 3, ']': 1 }
  const objCount = illegals.reduce((a,b)=> ({...a, [b]: a[b] ? a[b]+1 : 1 }), {})

  return Object.keys(objCount).reduce((a, b) => {
     if(b === ")") return a + (3 * objCount[b])
     if(b === "]") return a + (57 * objCount[b])
     if(b === "}") return a + (1197 * objCount[b])
     if(b === ">") return a + (25137 * objCount[b])
  }, 0)

}


/**
 * Part 2
 */
export const part2 = (inputs: TCara[][]) => {

  const rests = []
  for (let i = 0; i < inputs.length; i++)
  {
    const stack = []
    const line = inputs[i]
    for (let l = 0; l < line.length; l++)
    {
      const cara = line[l]
      // is open, push in 1st position in stack
      if(isOpen(cara)) stack.unshift(cara)
      // is close
      else {
        // remove 1st cara from stack
        if (isMatching(stack[0], cara)) stack.shift()
        // if not matching, he is corrupted, stop here
        else break
      }
      // if is last cara, this is an uncomplete
      if (l === line.length - 1) {
        rests.push(stack)
        break
      }
    }
  }

  // return arrays of missings cara to completes lines
  // [ [ ']', ')', '}', '>' ], ... ]
  const missings = rests.map(el => el.map(c => getCloseByOpen(c)));

  // final calc de la mort
  const totals = missings
  .reduce((acc, curr) => [
    ...acc,
    curr.reduce((a, b) => {
      if (b === ']') return (a * 5) + 2;
      if (b === ')') return (a * 5) + 1;
      if (b === '}') return (a * 5) + 3;
      if (b === '>') return (a * 5) + 4;
    }, 0)
  ] , [])
  .sort((a, b) => a - b)

  return totals[Math.floor(totals.length / 2)]

}
