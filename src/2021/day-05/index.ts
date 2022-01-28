// https://adventofcode.com/2021/day/5
import formatInputs from "./formatInputs";

/**
 * Select only horizontal & vertical lines
 *  -> select only matching x1 and x2 or y1 and y2
 */
 const inputs = formatInputs().filter(input => 
        (
            input[0].x === input[1].x
            ||
            input[0].y === input[1].y
        ) 
        &&
        input
)

