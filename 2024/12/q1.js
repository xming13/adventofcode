const input = (await Deno.readTextFile('input.txt'))
  .split('\n')
  .filter(a => a)
  .map(r => r.split(''))

// Utility function to generate a 2D array of the same size as `input` populated with value 0
const initialise = (input) => {
  const visited = []
  for (let i = 0; i < input.length; i++) {
    visited.push([])
    for (let j = 0; j < input[i].length; j++) {
      visited[i].push(0)
    }
  }
  return visited
}

// First we loop through every item and calculate its perimeter score
const populatePerimeter = (input) => {
  // Returns 0 if input[i][j] is val, otherwise 1
  const check = (i, j, val) => {
    return input[i] && input[i][j] && input[i][j] === val ? 0 : 1
  }

  const calculatePerimeter = (i, j, val) =>
    check(i - 1, j, val)
    + check(i + 1, j, val)
    + check(i, j - 1, val)
    + check(i, j + 1, val)

  const perimeters = initialise(input)
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      perimeters[i][j] = calculatePerimeter(i, j, input[i][j])
    }
  }
  return perimeters;
}

// Next we find area of region by walking through adjacent squares
const process = (input) => {
  const perimeters = populatePerimeter(input);
  const visited = initialise(input)

  /**
   *
   * @param i
   * @param j
   * @param val
   * @returns {number[]|*[]} first value is no. of regions, second value is sum of perimeters
   */
  const walk = (i, j, val) => {
    // if it is adjacent, return the perimeter
    if (typeof visited[i]?.[j] === 'undefined' || visited[i][j] === 1) {
      return [0, 0]
    }

    if (input[i][j] === val) {
      visited[i][j] = 1;
      const [x1, y1] = walk(i - 1, j, val)
      const [x2, y2] = walk(i + 1, j, val)
      const [x3, y3] = walk(i, j - 1, val)
      const [x4, y4] = walk(i , j + 1, val)
      return [1 + x1 + x2 + x3 + x4, perimeters[i][j] + y1 + y2 + y3 + y4];
    }

    return [0, 0];
  }

  let total = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (visited[i][j] === 1) {
        continue;
      }

      const [region, perimeter] = walk(i, j, input[i][j]);
      total += region * perimeter;
    }
  }
  return total;
}

console.time('d11 q1')
const res1 = process(input)
console.log('res1:', res1)
console.timeEnd('d11 q1')
