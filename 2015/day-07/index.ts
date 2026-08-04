/**
 * 2015 - Day 7
 * https://adventofcode.com/2015/day/7
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = {
  identifier: string
  instruction: string
  fn: (...params: number[]) => number
  params: string[]
  result: number
}

// prettier-ignore
const useInput = (filename: 'input.test' | 'input'): Input[] =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .reduce((a, b) => {
      const [op, k] = b.split('->').map((e) => e.trim())
      let fn: () => number
      let params: string[]

      if (op.includes(' AND ')) {
        const [l, r] = op.split(' AND ')
        params = [l, r]
        fn = (...params: number[]) => params[0] & params[1]
      }
      else if (op.includes(' OR ')) {
        const [l, r] = op.split(' OR ')
        params = [l, r]
        fn = (...params: number[]) => params[0] | params[1]
      }
      else if (op.includes(' LSHIFT ')) {
        const [l, r] = op.split(' LSHIFT ')
        params = [l]
        fn = (...params: number[]) => params[0] << parseInt(r)
      }
      else if (op.includes(' RSHIFT ')) {
        const [l, r] = op.split(' RSHIFT ')
        params = [l]
        fn = (...params: number[]) => params[0] >> parseInt(r)
      }
      else if (op.includes('NOT ')) {
        const [, r] = op.split('NOT ')
        params = [r]
        fn = (...params: number[]) => ~params[0] & 0xffff
      }
      else if (!Number.isNaN(parseInt(op))) {
        params = []
        fn = () => Number(op)
      }
      else if (typeof op === "string") {
        params = [op]
        fn = (...params:number[]) => params[0]
      }

      return [
        ...a,
        { identifier: k, instruction: op, fn, params, result: null },
      ]
    }, [])

const parts = (input: Input[]) => {
  const recursive = (current: Input, fullInput: Input[]): number[] => {
    const calcParams = []

    for (let i = 0; i < current.params?.length; i++) {
      const paramIdentifier = current.params[i]
      if (Number.isInteger(parseInt(paramIdentifier))) {
        calcParams.push(parseInt(paramIdentifier))
        continue
      }

      const targetObj = fullInput.find((e) => e.identifier === paramIdentifier)

      if (targetObj?.result) {
        calcParams.push(targetObj.result)
        continue
      }
      // Restart recurcivly
      const newP = targetObj.fn(...recursive(targetObj, fullInput))
      calcParams.push(newP)
    }

    current.result = current.fn(...calcParams)
    return calcParams
  }

  // Call the recurcive function for all input entrty
  for (let i = 0; i < input.length; i++) {
    recursive(input[i], input)
  }

  const a = input.find((e) => e.identifier === 'a').result

  return {
    // return "a"
    part1: a,
    //
    part2: ''
  }
}
log(parts(useInput('input')))



