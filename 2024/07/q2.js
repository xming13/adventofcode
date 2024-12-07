const rows = (await Deno.readTextFile('input.txt'))
  .split('\n')
  .filter(a => a)
  .map(r => r.split(': ').map((a, i) => i === 0 ? +a : a.split(' ').map(b => +b)))

// console.log("rows:", rows);
/**
 * Sample data
 * rows: [
 *   [ 190, [ 10, 19 ] ],
 *   [ 3267, [ 81, 40, 27 ] ],
 *   [ 83, [ 17, 5 ] ],
 *   [ 156, [ 15, 6 ] ],
 *   [ 7290, [ 6, 8, 6, 15 ] ],
 *   [ 161011, [ 16, 10, 13 ] ],
 *   [ 192, [ 17, 8, 14 ] ],
 *   [ 21037, [ 9, 7, 18, 13 ] ],
 *   [ 292, [ 11, 6, 16, 20 ] ]
 * ]
 */

// Q2
{
  const op = (operator, first, second) => {
    if (operator === '+') {
      return first + second
    }
    if (operator === '*') {
      return first * second
    }
    if (operator === '|') {
      return +`${first}${second}`
    }

    throw new Error(`Invalid operator ${operator}`)
  }

  // Returns true if operators can be combined to produce testValue.
  const isValid = (testValue, nums) => {
    if (nums.length === 1) {
      // console.log('testValue:', testValue, 'nums:', nums[0])
      return nums[0] === testValue
    }

    // This will never be valid if the first number is bigger than test value.
    // if (!nums.includes(0) && nums[0] > testValue) {
    //   return false
    // }

    const [first, second, ...rest] = nums
    return isValid(testValue, [op('+', first, second), ...rest]) || isValid(testValue, [op('*', first, second), ...rest]) || isValid(testValue, [op('|', first, second), ...rest])
  }

  console.time('q2')
  const result2 = rows.reduce((acc, [testValue, numbers]) => {
    return isValid(testValue, numbers) ? acc + testValue : acc
  }, 0)
  console.log('result2:', result2)
  console.timeEnd('q2')
}
