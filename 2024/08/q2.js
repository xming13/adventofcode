const aoa = (await Deno.readTextFile('input.txt'))
  .split('\n')
  .filter(a => a)
  .map(r => r.split(''))

console.log('aoa:', aoa)

const maxX = aoa[0].length - 1
const maxY = aoa.length - 1

/**
 * Expected structure
 * key: frequency
 * value: array of coordinates, where 0, 0 is top left
 * `i` is increasing from left to right, `j` is increasing from top to bottom
 *
 * {
 *   "0": [ [ 1, 8 ], [ 2, 5 ], [ 3, 7 ], [ 4, 4 ] ],
 *   A: [ [ 5, 6 ], [ 8, 8 ], [ 9, 9 ] ]
 * }
 */
const parseAoa = (aoa) => {
  const cache = {}
  for (let i = 0; i <= aoa.length - 1; i++) {
    for (let j = 0; j <= aoa[i].length - 1; j++) {
      const val = aoa[i][j]
      if (val === '.') {
        continue
      }

      if (!cache[val]) {
        cache[val] = []
      }

      cache[val].push([i, j])
    }
  }

  return cache
}

const data = parseAoa(aoa)
console.log('data:', data)

const computeAntiNodes = () => {
  let antiNodes = new Set()

  Object.values(data).forEach(coordinates => {
    for (let i = 0; i <= coordinates.length - 2; i++) {
      for (let j = i + 1; j <= coordinates.length - 1; j++) {
        const newSet = getAntiNodes(coordinates[i], coordinates[j])
        antiNodes = antiNodes.union(newSet)
      }
    }
  })

  return antiNodes
}

const getAntiNodes = ([i1, j1], [i2, j2]) => {
  const di = Math.abs(i2 - i1)
  const dj = Math.abs(j2 - j1)

  const isLeft = i1 < i2 ? -1 : 1
  const isTop = j1 < j2 ? -1 : 1
  const set = new Set()
  set.add(`${i1},${j1}`)
  set.add(`${i2},${j2}`)

  for (let k = 1; k < maxX; k++) {
    const n1 = [i1 + di * isLeft * k, j1 + dj * isTop * k]
    const n2 = [i2 + di * -isLeft * k, j2 + dj * -isTop * k]

    const inMap1 = isInMap(n1);
    const inMap2 = isInMap(n2);

    if (!inMap1 && !inMap2) {
      break;
    }

    if (inMap1) {
      set.add(`${n1[0]},${n1[1]}`)
    }
    if (inMap2) {
      set.add(`${n2[0]},${n2[1]}`)
    }
  }

  return set
}

const isInMap = ([x, y]) => x >= 0 && x <= maxX && y >= 0 && y <= maxY

console.time('res2')
const antiNodes = computeAntiNodes()
// console.log('antiNodes:', antiNodes)
console.log('res2:', antiNodes.size)
console.timeEnd('res2')

