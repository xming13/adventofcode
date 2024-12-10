const input = (await Deno.readTextFile('input.txt'))
  .split('\n')
  .filter(a => a)[0].trimEnd()
// console.log("input:", input);

const convert = (input) => {
  return input.split('').reduce((acc, cur, index) => {
    const count = +cur;
    for (let i = 0; i < count; i++) {
      acc.push(index % 2 === 0 ? `${index/2}` : `.`)
    }

    return acc;
  }, []);
}

const process = (data) => {
  let leftPointerIndex = 0;

  for (let i = data.length - 1; i >= 0; i--) {
    const val = data[i];

    // Found a number from right.
    if (val !== '.') {
      // console.log('val', val)

      // Look for `.` from left.
      leftPointerIndex = data.indexOf('.')

      // If there is no `.` or when `.` is over i, exit.
      if (leftPointerIndex === -1 || leftPointerIndex > i) {
        console.log(`Exit at leftPointerIndex: ${leftPointerIndex}, i: ${i}`);
        break;
      }

      // Do swap.
      // console.log(`Swapping ${leftPointerIndex}: (${newArr[leftPointerIndex]}) with ${i}: ${newArr[i]}`)
      data[leftPointerIndex] = val;
      data[i] = '.';

      if (data.indexOf('.') === -1 || data.indexOf('.') > i) {
        break;
      }
    }
  }

  return data;
}

const calculateChecksum = (arr) => arr.reduce((acc, cur, index) => acc + (cur === '.' ? 0 : index * +cur), 0)

console.time('d9q1');
const data = convert(input);
// console.log("data:", data);
/**
 * Sample of how data looks like:
 * data: [
 *   "0", "0", ".", ".", ".", "1", "1",
 *   "1", ".", ".", ".", "2", ".", ".",
 *   ".", "3", "3", "3", ".", "4", "4",
 *   ".", "5", "5", "5", "5", ".", "6",
 *   "6", "6", "6", ".", "7", "7", "7",
 *   ".", "8", "8", "8", "8", "9", "9"
 * ]
 */

const processed = process(data);
// console.log("processed:", processed);
/**
 * Sample of how processed looks like:
 * processed: [
 *   "0", "0", "9", "9", "8", "1", "1",
 *   "1", "8", "8", "8", "2", "7", "7",
 *   "7", "3", "3", "3", "6", "4", "4",
 *   "6", "5", "5", "5", "5", "6", "6",
 *   ".", ".", ".", ".", ".", ".", ".",
 *   ".", ".", ".", ".", ".", ".", "."
 * ]
 */

console.log("res1:", calculateChecksum(processed));
console.timeEnd('d9q1');
