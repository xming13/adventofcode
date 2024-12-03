const rows = (await Deno.readTextFile('input.txt'))
  .split('\n')
  .filter(a => a)

const arr1 = []
const arr2 = []

rows.forEach((a) => {
  const [v1, v2] = a.split('   ')
  arr1.push(+v1)
  arr2.push(+v2)
})
arr1.sort()
arr2.sort()

let distance = 0
for (let i = 0; i < arr1.length; i++) {
  distance += Math.abs(arr1[i] - arr2[i])
}
console.log(distance)

