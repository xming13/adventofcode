// I was trying a different approach but realised I misunderstood the question.
// Keeping it for now.

// const input = (await Deno.readTextFile('input.txt'))
//   .split('\n')
//   .filter(a => a)[0].trimEnd()
// console.log('input:', input)
//
// const convert = (input) => {
//   return input.split('').reduce((acc, cur, index) => {
//     const count = +cur
//     for (let i = 0; i < count; i++) {
//       acc += index % 2 === 0 ? `${index / 2}` : `.`
//     }
//
//     return acc
//   }, '')
// }
//
// const convertedInput = convert(input)
// const convertedInputArr = convertedInput.split('')
// const processed = []
//
// const digitsCount = convertedInputArr.filter(a => a !== '.').length
// console.log('digitsCount:', digitsCount)
//
// let rightPointerIndex = convertedInputArr.length - 1
// for (let i = 0; i < convertedInputArr.length; i++) {
//   if (processed.length === digitsCount) {
//     break
//   }
//
//   const val = convertedInputArr[i]
//
//   if (val !== '.') {
//     processed.push(val)
//     continue
//   }
//
//   // Find number from right from last accessed.
//   for (let j = rightPointerIndex; j >= 0; j--) {
//     const rVal = convertedInputArr[j]
//     if (rVal !== '.') {
//       rightPointerIndex = j - 1
//       processed.push(rVal)
//       break
//     }
//   }
// }
//
// const compact = (str) => {
//   return str.split('').reduce((acc, cur, index) => {
//     if (cur === '.') {
//       return acc
//     }
//     return acc + index * +cur
//   }, 0)
// }
//
// console.log('processed.join(\'\'):', processed.join(''))
//
// const res1 = compact(processed.join(''))
// console.log('res1:', res1)
