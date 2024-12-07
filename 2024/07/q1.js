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

// Q1
{
  const op = (operator, a, b) => {
    if (operator === '+') {
      return a + b
    }
    if (operator === '*') {
      return a * b
    }

    throw new Error(`Invalid operator ${operator}`)
  }

  // Returns true if operators can be combined to produce testValue.
  const isValid = (testValue, nums) => {
    if (nums.length === 1) {
      // console.log('testValue:', testValue, 'nums:', nums)
      return nums[0] === testValue
    }

    if (nums.length > 1) {
      const [first, second, ...rest] = nums
      return  ['+', '*'].some(operator => isValid(testValue, [op(operator, first, second), ...rest]))
    }

    // Should not reach here
    return false;
  }

  const result1 = rows.reduce((acc, [testValue, numbers]) => {
    return isValid(testValue, numbers) ? acc + testValue : acc
  }, 0)

  console.log('result1:', result1)
}
