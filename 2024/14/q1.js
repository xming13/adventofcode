const input = (await Deno.readTextFile('input.txt'))
  .split('\n')
  .filter(a => a)
const width = 101
// const width = 11
const height = 103
// const height = 7

const midX = Math.floor(width / 2)
const midY = Math.floor(height / 2)
console.log('midX, midY:', midX, midY)

// Brute force!

// p=0,4 v=3,-3
//[ { px: 0, py: 4, vx: 3, vy: -3 } ]
const parse = (input) => input.map(row => {
  const r1 = /p=(\d+),(\d+) v=(-?\d+),(-?\d+)/g
  const match = r1.exec(row)
  if (!match) { return }
  return { px: +match[1], py: +match[2], vx: +match[3], vy: +match[4] }
});

const move = ({ px, py, vx, vy }) => {
  return {
    px: (px + width + vx) % width, py: (py + height + vy) % height, vx, vy,
  }
}

const end = (r => {
  for (let i = 0; i < 100; i++) {
    r = move(r)
  }
  return r
})

const getQuadrant = (({ px, py }) => {
  if (px === midX || py === midY) { return 0 }
  if (px < midX && py < midY) { return 1 }
  if (px > midX && py < midY) { return 2 }
  if (px < midX && py > midY) { return 3 }
  if (px > midX && py > midY) { return 4 }
  throw new Error('should not reach here', { px, py }, { midX, midY })
})

const print = (arr) => {
  // Utility function to generate a 2D array of given width and height populated with value 0
  const initialise = (width, height) => {
    const visited = []
    for (let i = 0; i < height; i++) {
      visited.push([])
      for (let j = 0; j < width; j++) {
        visited[i].push(0)
      }
    }
    return visited
  }
  const cache = initialise(width, height)
  arr.forEach(({ px, py }) => {
    cache[py][px] = (cache[py][px] || 0) + 1
  })

  for (let i = 0; i < height; i++) {
    console.log(cache[i].map(a => a === 0 ? '.' : a).join(''))
  }
}

const parsed = parse(input)
// console.log("parsed:", parsed);

const ended = parsed.map(end);
print(ended)

const quadrants = ended.map(getQuadrant)
// console.log("quadrants:", quadrants);

const res1 = quadrants.reduce((acc, cur) => {
  if (cur === 0) {
    return acc
  }
  acc[cur - 1]++
  return acc
}, [0, 0, 0, 0]).reduce((acc, cur) => acc * cur, 1);

console.log("res1:", res1);

