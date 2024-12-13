const input = (await Deno.readTextFile('input.txt'))
  .split('\n')

// Brute force!

// Button A: X+94, Y+34
// Button B: X+22, Y+67
// Prize: X=8400, Y=5400
//[ { ax: 94, ay: 34, bx: 22, by: 67, px: 8400, py: 5400 } ]
const arr = [];
let n = {};
for (let i = 0; i < input.length; i++) {
  const row = input[i];
  const r1 = /[XY][+=]?(\d+)/g
  const match1 = +(r1.exec(row)?.[1]);
  const match2 = +(r1.exec(row)?.[1]);

  if (i % 4 === 0) {
    n = {};
    n.ax  = match1;
    n.ay = match2;
  }

  if (i % 4 === 1) {
    n.bx  = match1;
    n.by = match2;
  }

  if (i % 4 === 2) {
    n.px  = match1;
    n.py = match2;
  }

  if (i % 4 === 3) {
    arr.push(n);
  }
}

const check = (item) => {
  const valids = [];
  for (let i = 0; i <= 100; i++) {
    for (let j = 0; j <= 100; j++) {
      if (i * item.ax + j * item.bx === item.px && i * item.ay + j * item.by === item.py) {
        valids.push(i * 3 + j);
      }
    }
  }

  if (valids.length === 0) {
    return 0;
  }

  return valids.reduce((acc, cur) => cur < acc ? cur : acc, valids[0]);
}
console.time('d13 q1');
console.log("res1:", arr.map(check).reduce((acc, cur) => acc + cur, 0));
console.timeEnd('d13 q1');
