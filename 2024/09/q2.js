const input = (await Deno.readTextFile('input.txt'))
  .split('\n')
  .filter(a => a)[0].trimEnd()
//console.log("input:", input);

const convert = (input) => {
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

const convertedInput = convert(input);
//console.log("convertedInput:", convertedInput);

const newArr = [...convertedInput];

for (let i = convertedInput.length - 1; i >= 0; i--) {
  const rightVal = newArr[i];
  //console.log("rightVal:", rightVal);

  if (!rightVal.length || rightVal[0] === '.') {
    continue;
  }

  // Found a number from right.
  // Look for `.` from left.
  const leftIndex = newArr.findIndex(a => a.filter(b => b === '.').length >= rightVal.length);
  if (leftIndex === -1) {
    continue;
  }

  if (leftIndex >= i) {
    //console.log("Exit at newArr, leftIndex, i:", newArr, leftIndex, i);
    continue;
  }

  //console.log(`Swapping ${leftIndex}: (${newArr[leftIndex]}) with ${i}: ${newArr[i]}`)

  const leftIndexInner = newArr[leftIndex].findIndex(a => a === '.');
  for (let j = 0; j < rightVal.length; j++) {
    newArr[leftIndex][leftIndexInner + j] = rightVal[rightVal.length - 1 - j];
    rightVal[rightVal.length - 1 - j] = '.';
  }
  //console.log(newArr.flatMap(a => a).join(''))
}

//console.log("newArr:", newArr);

const flattenNewArr = newArr.flatMap(a => a)
//console.log("flattenNewArr:", flattenNewArr);

const compact = (arr) => {
  return arr.reduce((acc, cur, index) => {
    if (cur === '.') {
      return acc;
    }
    return acc + index * +cur;
  }, 0)
}

console.log("res2:", compact(flattenNewArr));
