const aoa = (await Deno.readTextFile('input.txt'))
  .split('\n')
  .filter(a => a)
  .map(r => r.split(''))

console.log("aoa:", aoa);

const maxX = aoa[0].length - 1;
const maxY = aoa.length - 1;

/**
 * Expected structure
 * key: frequency
 * value: array of coordinates where i, j where 0,0 is top left,
 * x is increasing from left to right, y is increasing from top to bottom
 */
const parseAoa = (aoa) => {
  const cache = {};
  for (let i = 0; i <= aoa.length - 1; i++) {
    for (let j = 0; j <= aoa[i].length - 1; j++) {
      const val = aoa[i][j];
      if (val === '.') {
        continue;
      }

      if (!cache[val]) {
        cache[val] = [];
      }

      cache[val].push([i, j]);
    }
  }

  return cache;
}

const data = parseAoa(aoa);
console.log("data:", data);

const computeAntiNodes = () => {
  let antiNodes = new Set();

  Object.entries(data).forEach(([key, coordinates]) => {
    console.log("key, coordinates:", key, coordinates);
    for (let i = 0; i <= coordinates.length - 2; i++) {
      for (let j = i + 1; j <= coordinates.length - 1; j++) {
        console.log(`Compare ${coordinates[i]}, ${coordinates[j]}`)
        const newSet = getAntiNodes(coordinates[i], coordinates[j]);
        console.log("newSet:", newSet);
        antiNodes = antiNodes.union(newSet);
      }
    }
  });

  return antiNodes;
}

const getAntiNodes = ([i1, j1], [i2, j2]) => {
  const diffI = i2 - i1;
  const diffJ = j2 - j1;

  const n1 = [i1 - diffI, j1 - diffJ]
  const n2 = [i2 + diffI, j2 + diffJ]

  const set = new Set()

  console.log("n1:", n1);
  console.log("n2:", n2);

  if (isInMap(n1)) {
    set.add(`${n1[0]},${n1[1]}`)
  }
  if (isInMap(n2)) {
    set.add(`${n2[0]},${n2[1]}`)
  }
  console.log("set:", set);

  return set;
}

const isInMap = ([x, y]) => x >= 0 && x <= maxX && y >= 0 && y <= maxY

console.time('res1')
const antiNodes = computeAntiNodes();
console.log("antiNodes:", antiNodes);
console.log("res1:", antiNodes.size);
console.timeEnd('res1')

