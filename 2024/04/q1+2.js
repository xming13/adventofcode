// Convert to 2D array
const arr = (await Deno.readTextFile('input.txt')).split('\n').map(r => r.split(''));
console.log('arr:', arr);

{
  // Given a position, returns the number of direction (out of 8) that has the valid string XMAS
  const getValidCount = (x, y) => {
    return [[-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1]]
      .filter(a => isValid(x, y, a))
      .length;
  };

  // direction: [-1,0], [-1,-1], [-1,1], [1,0], [1,1], [1,0], [1,-1], [-1,0]
  const isValid = (x, y, [dirX, dirY]) => ['X', 'M', 'A', 'S']
    .every((letter, index) => arr[x + index * dirX] && arr[x + index * dirX][y + index * dirY] === letter);

  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      sum += getValidCount(i, j);
    }
  }

  console.log('sum1:', sum);
}

{
  const isValid = (x, y) => {
    if (arr[x][y] !== 'A') {
      return false;
    }

    const leftTop = arr[x-1] && arr[x-1][y+1];
    const rightBottom = arr[x+1] && arr[x+1][y-1];
    const rightTop = arr[x+1] && arr[x+1][y+1];
    const leftBottom = arr[x-1] && arr[x-1][y-1];
    const leftTopToRightBottomValid = (leftTop === 'M' && rightBottom === 'S') || (leftTop === 'S' && rightBottom === 'M');
    const rightTopToLeftBottomValid = (rightTop === 'M' && leftBottom === 'S') || (rightTop === 'S' && leftBottom === 'M');
    return leftTopToRightBottomValid && rightTopToLeftBottomValid;
  }

  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      sum += isValid(i, j) ? 1 : 0;
    }
  }

  console.log('sum2:', sum);
}

