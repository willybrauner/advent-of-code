// https://adventofcode.com/2021/day/7


export const part1 = (inputs: number[]) =>
{
    // calc the input average
    const average = inputs
        .reduce((a, b) => a + b, 0) 
        /
        inputs.length
        console.log("average", average)

    // get most frequent element in input array
    const array = inputs
        .reduce((a, b) => {
            a[b] = (a[b] ?? 0) + 1
            return [...a]
        }, [])
        .map(el => el ? el : 0)
     console.log(array);

     let wIndex = 0;
     for (let i = 0; i <= array.length; i++) {
        if (array[i] > array[wIndex]) wIndex = i
     }
    console.log(wIndex)

    // final, calc fuel value
    let fuel = 0;
    for (let input of inputs) {
        fuel += Math.abs(wIndex - input)
    }

    return fuel

}