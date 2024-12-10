const input = (await Deno.readTextFile('input.txt'))
  .split('\n')
  .filter(a => a)[0].trimEnd()
//console.log("input:", input);

const parseInput = (input) => {
  return input.split('').reduce((acc, cur, index) => {
    const count = +cur;
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(index % 2 === 0 ? `${index/2}` : `.`)
    }
    acc.push(arr);

    return acc;
  }, []);
}

const process = (data) => {
  for (let i = data.length - 1; i >= 0; i--) {
    const rightVal = data[i];
    //console.log("rightVal:", rightVal);

    if (!rightVal.length || rightVal[0] === '.') {
      continue;
    }

    // Found a number from right.
    // Look for `.` from left.
    const leftIndex = data.findIndex(a => a.filter(b => b === '.').length >= rightVal.length);
    if (leftIndex === -1) {
      continue;
    }

    if (leftIndex >= i) {
      //console.log("Exit at data, leftIndex, i:", data, leftIndex, i);
      continue;
    }

    //console.log(`Swapping ${leftIndex}: (${data[leftIndex]}) with ${i}: ${data[i]}`)

    const leftIndexInner = data[leftIndex].findIndex(a => a === '.');
    for (let j = 0; j < rightVal.length; j++) {
      data[leftIndex][leftIndexInner + j] = rightVal[rightVal.length - 1 - j];
      rightVal[rightVal.length - 1 - j] = '.';
    }
    //console.log(data.flatMap(a => a).join(''))
  }

  return data;
}

const calculateChecksum = (arr) => arr.reduce((acc, cur, index) => acc + (cur === '.' ? 0 : index * +cur), 0)

console.time('d9q2');
const data = parseInput(input);
// console.log("data:", data);
/**
 *  Sample of how data looks like:
 *  [
 *   [ "0", "0" ],           [ ".", ".", "." ],
 *   [ "1", "1", "1" ],      [ ".", ".", "." ],
 *   [ "2" ],                [ ".", ".", "." ],
 *   [ "3", "3", "3" ],      [ "." ],
 *   [ "4", "4" ],           [ "." ],
 *   [ "5", "5", "5", "5" ], [ "." ],
 *   [ "6", "6", "6", "6" ], [ "." ],
 *   [ "7", "7", "7" ],      [ "." ],
 *   [ "8", "8", "8", "8" ], [],
 *   [ "9", "9" ]
 * ]
 */

const processed = process(data);
// console.log("processed:", processed);
/**
 * Sample of how processed looks like:
 * processed: [
 *   [ "0", "0" ],           [ "9", "9", "2" ],
 *   [ "1", "1", "1" ],      [ "7", "7", "7" ],
 *   [ "." ],                [ "4", "4", "." ],
 *   [ "3", "3", "3" ],      [ "." ],
 *   [ ".", "." ],           [ "." ],
 *   [ "5", "5", "5", "5" ], [ "." ],
 *   [ "6", "6", "6", "6" ], [ "." ],
 *   [ ".", ".", "." ],      [ "." ],
 *   [ "8", "8", "8", "8" ], [],
 *   [ ".", "." ]
 * ]
 */


const flattenData = processed.flatMap(a => a)
// console.log("flattenData:", flattenData);
/**
 * Sample of how flattenData looks like:
 * flattenData: [
 *   "0", "0", "9", "9", "2", "1", "1",
 *   "1", "7", "7", "7", ".", "4", "4",
 *   ".", "3", "3", "3", ".", ".", ".",
 *   ".", "5", "5", "5", "5", ".", "6",
 *   "6", "6", "6", ".", ".", ".", ".",
 *   ".", "8", "8", "8", "8", ".", "."
 * ]
 */

console.log("res2:", calculateChecksum(flattenData));
console.timeEnd('d9q2');
