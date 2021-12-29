import formatInputs from "./formatInputs"

const [PLAY_NUMBERS, GRIDS] = formatInputs("inputs-example.txt")

it("should works", () => {
console.log(PLAY_NUMBERS, GRIDS)
})
