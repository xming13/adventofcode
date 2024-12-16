const input = (await Deno.readTextFile('input.txt'))
  .split('\n')
  .filter(a => a)

const parseInput = (input) => {
  let map = []
  let movements = []
  let startIndex
  for (let i = 0; i < input.length; i++) {
    const row = input[i]
    if (!row[0]) {
      continue
    }
    if (row[0] === '#') {
      map[i] = row.split('')
      const col = map[i].indexOf('@')
      if (col > -1) {
        startIndex = [i, col]
      }
    }
    if (['<', '^', '>', 'v'].includes(row[0])) {
      movements = movements.concat(row.split(''))
    }
  }

  return [map, movements, startIndex]
}

let [map, movements, robotPosition] = parseInput(input)

const printMap = (map) => {
  for (let i = 0; i < map.length; i++) {
    //console.log(map[i].join(''))
  }
}

const getTarget = (direction, [row, col]) => {
  if (direction === '<') {
    return [row, col - 1]
  }
  if (direction === '^') {
    return [row - 1, col]
  }
  if (direction === '>') {
    return [row, col + 1]
  }
  if (direction === 'v') {
    return [row + 1, col]
  }
  throw new Error(`Should not reach here direction: ${direction}, row: ${row}, col: ${col}`)
}

const swap = ([r1, c1], [r2, c2]) => {
  const temp = map[r1][c1]
  map[r1][c1] = map[r2][c2]
  map[r2][c2] = temp
}

const move = (direction, [row, col]) => {
  // console.log(`[move] direction: ${direction}, [row, col]: ${[row, col]}`)
  const [targetRow, targetCol] = getTarget(direction, [row, col])
  // console.log('targetRow, targetCol:', targetRow, targetCol)

  const target = map[targetRow][targetCol]
  if (target === '#') {
    return [false, [row, col]];
  }

  if (target === '.') {
    swap([row, col], [targetRow, targetCol])
    return [true, [targetRow, targetCol]];
  }

  if (target === 'O') {
    const [hasMoved] = move(direction, [targetRow, targetCol])
    if (!hasMoved) {
      return [hasMoved, [row, col]]
    }

    swap([row, col], [targetRow, targetCol])
    return [hasMoved, [targetRow, targetCol]];
  }
}

for (let i = 0; i < movements.length; i++) {
  const direction = movements[i]
  robotPosition = move(direction, robotPosition)[1]
  console.log(`After move ${i}`)
  printMap(map)
}

const getGPS = ([x, y]) => 100 * x + y;

const getSum = () =>
  map.reduce((acc, cur, i) =>
    acc + cur.reduce((a2, c2, j) => a2 + (c2 === 'O' ? getGPS([i, j]) : 0)
    , 0)
  , 0);

const res1 = getSum(map);
console.log(res1);
