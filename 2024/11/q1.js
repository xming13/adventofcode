const input = (await Deno.readTextFile('input.txt'))
  .split(' ')
  .map(a => +a)

const blink = (number) => {
  if (number === 0) {
    return 1
  }

  const numberOfDigits = `${number}`.length
  // even number of digits
  if (numberOfDigits % 2 === 0) {
    return [
      +(`${number}`.slice(0, numberOfDigits / 2)),
      +(`${number}`.slice(numberOfDigits / 2)),
    ]
  }

  return number * 2024
}

const process = (input) => {
  for (let i = 0; i < 25; i++) {
    input = input.flatMap(a => blink(a));
  }

  return input.length
}

console.time('d11 q1')
const res1 = process(input)
console.log('res1:', res1)
console.timeEnd('d11 q1')

