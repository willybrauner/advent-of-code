/**
 * 2022 - Day 3
 *  https://adventofcode.com/2022/day/3
 */

import fs from "fs"
import path from "path"
const { log } = console

export type TInput = any
export const format = (filename: "input.test.txt" | "input.txt"): TInput =>
  fs.readFileSync(path.resolve(__dirname, filename), "utf8")

export const part1 = (input: TInput) =>
{
  log(input)
}

export const part2 = (input: TInput) =>
{

}
