const input = (await Deno.readTextFile('input.txt'))
  .split('\n')
  .filter(a => a)[0].trimEnd()
console.log("input:", input);

const convert = (input) => {
  return input.split('').reduce((acc, cur, index) => {
    const count = +cur;
    for (let i = 0; i < count; i++) {
      acc.push(index % 2 === 0 ? `${index/2}` : `.`)
    }

    return acc;
  }, []);
}

const convertedInput = convert(input);
// console.log("convertedInput:", convertedInput);

const newArr = [...convertedInput];
let leftPointerIndex = 0;

for (let i = convertedInput.length - 1; i >= 0; i--) {
  const val = newArr[i];

  // Found a number from right.
  if (val !== '.') {
    // console.log('val', val)

    // Look for `.` from left.
    leftPointerIndex = newArr.indexOf('.')

    // If there is no `.` or when `.` is over i, exit.
    if (leftPointerIndex === -1 || leftPointerIndex > i) {
      console.log(`Exit at leftPointerIndex: ${leftPointerIndex}, i: ${i}`);
      break;
    }

    // Do swap.
    // console.log(`Swapping ${leftPointerIndex}: (${newArr[leftPointerIndex]}) with ${i}: ${newArr[i]}`)
    newArr[leftPointerIndex] = val;
    newArr[i] = '.';

    if (newArr.indexOf('.') === -1 || newArr.indexOf('.') > i) {
      break;
    }
  }
}

console.log("newArr:", newArr);

const compact = (arr) => {
  return arr.reduce((acc, cur, index) => {
    if (cur === '.') {
      return acc;
    }
    return acc + index * +cur;
  }, 0)
}

console.log("res1:", compact(newArr));
