const aoa = (await Deno.readTextFile('input.txt'))
  .split('\n')
  .filter(a => a)
  .map(r => r.split(''))
const maxX = aoa[0].length - 1
const maxY = aoa.length - 1
const startingPosition = aoa.reduce((acc, cur, index) => {
  if (acc[0] >= 0) {
    return acc
  }
  const colIndex = cur.indexOf('^')
  if (colIndex === -1) { return acc }
  return [colIndex, index]
}, [-1, -1])

// Q1
{
  let position = startingPosition

  // x=0,y=0 is at top left
  // x=9,y=9 is at bottom right
  let direction = [0, -1] // initial direction is up
  let numberOfLoops = 0

  // Initialise array to keep tracked of visited pos
  const visited = [];
  for (let i = 0; i <= maxY; i++) {
    visited[i] = [];
    for (let j = 0; j <= maxX; j++) {
      visited[i][j] = 0;
    }
  }

  // Set starting position as visited
  visited[position[1]][position[0]] = 1;

  const isOutOfMap = (pos) => !pos || pos.x < 0 || pos.x > maxX || pos.y < 0 || pos.y > maxY

  const turnRight = ([dx, dy]) => {
    if (dx === 0 && dy === 1) {
      return [-1, 0]
    }
    if (dx === 1 && dy === 0) {
      return [0, 1]
    }
    if (dx === 0 && dy === -1) {
      return [1, 0]
    }
    if (dx === -1 && dy === 0) {
      return [0, -1]
    }
    throw new Error(`[turnRight] Should not reach here - [${dx},${dy}]`)
  }

  // Returns true if reached the end of map - completed the walk.
  const walk = () => {
    const [dx, dy] = direction
    const [x, y] = position
    const [targetX, targetY] = [x + dx, y + dy]
    const item = aoa[targetY]?.[targetX];
    if (isOutOfMap(item)) {
      return true
    }

    if (item === '#') {
      direction = turnRight(direction)
      return
    }

    position = [targetX, targetY]
    visited[targetY][targetX] = 1;
  }

  do {
    if (walk()) {
      break
    }

    numberOfLoops++
    console.log(`[${numberOfLoops}] pos:`, position)
  } while (true)

  console.log('q1 visited:', visited.reduce((acc, cur) => acc + cur.reduce((a, c) => a + c, 0), 0))
}



