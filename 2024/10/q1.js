const input = (await Deno.readTextFile('input.txt'))
  .split('\n')
  .filter(a => a)
  .map(r => r.split('').map(a => +a))
// console.log("input:", input);

const walk = (input, number, [i, j]) => {
  if (input[i] && typeof input[i][j] !== 'undefined' && input[i][j] === number) {
    if (number === 0) {
      return [`${i},${j}`]
    }

    return [
      ...walk(input, number - 1, [i - 1, j]),
      ...walk(input, number - 1, [i + 1, j]),
      ...walk(input, number - 1, [i, j - 1]),
      ...walk(input, number - 1, [i, j + 1])
    ].filter((a, i, arr) => a && arr.indexOf(a) === i);
  }

  return [];
}

const process = (input) => {
  let total = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      if (input[i][j] === 9) {
        total += walk(input, 9, [i,j]).length;
      }
    }
  }
  return total;
}

console.time('d10 q1');
const res1 = process(input);
console.log("res1:", res1);
console.timeEnd('d10 q1');

