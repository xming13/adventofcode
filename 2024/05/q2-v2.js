const [section1Rows, section2Rows] = (await Deno.readTextFile('input.txt'))
  .split('\n\n')
  .map(a => a
    .split('\n')
    .filter(a => !!a))

/**
 * sample leftToRightRules
 * {
 *   "29": [ "13" ],
 *   "47": [ "53", "13", "61", "29" ],
 *   "53": [ "29", "13" ],
 *   "61": [ "13", "53", "29" ],
 *   "75": [ "29", "53", "47", "61", "13" ],
 *   "97": [ "13", "61", "47", "29", "53", "75" ]
 * }
 *
 * sample rightToLeftRules
 * {
 *   "13": [ "97", "61", "29", "47", "75", "53" ],
 *   "29": [ "75", "97", "53", "61", "47" ],
 *   "47": [ "97", "75" ],
 *   "53": [ "47", "75", "61", "97" ],
 *   "61": [ "97", "47", "75" ],
 *   "75": [ "97" ]
 * }
 */
const [leftToRightRules, rightToLeftRules] = section1Rows
  .map(r => r.split('|'))
  .reduce((acc, [left, right]) => {
    acc[0][left] = [...acc[0][left] || [], right]
    acc[1][right] = [...acc[1][right] || [], left]
    return acc
  }, [{}, {}])

console.log('leftToRightRules:', leftToRightRules)
console.log('rightToLeftRules:', rightToLeftRules)

{
  // Returns true if num1 is supposed to be on the left of num2,
  // false otherwise.
  const isInOrder = (num1, num2) => (leftToRightRules[num1] || []).includes(num2) && !(rightToLeftRules[num2] || []).includes(num2)

  const check = (elemArr) => {
    const midIndex = (elemArr.length - 1) / 2
    for (let j = 0; j < midIndex; j++) {
      const leftIndex = midIndex - j
      const rightIndex = midIndex + j
      const elemToLeft = elemArr[leftIndex - 1]
      const elemToRight = elemArr[rightIndex + 1]

      // Element on the right of elemToLeft is supposed to be on the left!
      if (!isInOrder(elemToLeft, elemArr[leftIndex])) {
        return [leftIndex - 1, leftIndex]
      }

      // Element on the left of elemToRight is supposed to be on the right!
      if (!isInOrder(elemArr[rightIndex], elemToRight)) {
        return [rightIndex + 1, rightIndex]
      }
    }

    return []
  }

  const getMiddleItem = (arr) => +arr[(arr.length - 1) / 2]

  const res2 = section2Rows
    .map(r => r.split(','))
    .reduce((acc, cur) => {
      let res = check(cur)
      if (res.length === 0) {
        return acc
      }

      do {
        // i2 is always greater than i1
        let [i1, i2] = res

        // Swap the two elements
        const temp = cur[i2]
        cur[i2] = cur[i1]
        cur[i1] = temp

        // Check again
        res = check(cur)
      } while (res.length > 0)

      return acc + getMiddleItem(cur)
    }, 0)

  console.log('res2:', res2)
}
