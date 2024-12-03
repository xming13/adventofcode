const rows = (await Deno.readTextFile('input.txt'))
  .split('\n')
  .filter(a => a)

const leftNumberCount = {};
const rightNumberCount = {};
rows.forEach(row => {
  const [v1, v2] = row.split('   ').map(a => +a);
  leftNumberCount[v1] = (leftNumberCount[v1] || 0) + 1;
  rightNumberCount[v2] = (rightNumberCount[v2] || 0) + 1;
})

const result = Object.entries(leftNumberCount).reduce((acc, [key, val]) => {
  return acc + (rightNumberCount[key] || 0) * key * val;
}, 0);
console.log("result:", result);

