// https://adventofcode.com

type TOpen = "(" | "[" | "{" | "<";
type TClose = ")" | "]" | "}" | ">";
type TCara = TOpen & TClose

const {log} = console
const COUPLES = [["(", ")"],["[", "]"],["{", "}"],["<", ">"]]
const isOpen = (cara:TCara)=> COUPLES.some(c => c[0] === cara)
const isMatching = (open, close) =>
   COUPLES.some((couple) => 
    couple[0] === open && couple[1] === close
   )

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
  
export const part2 = (inputs: TCara[][]) => {}
