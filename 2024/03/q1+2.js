const input = (await Deno.readTextFile('input.txt')).trim()

{
  const r1 = /(mul\(\d{0,3},\d{0,3}\))/g
  let match = r1.exec(input)
  let sum = 0
  let count = 1

  while (match != null) {
    // console.log(match);

    if (match[1]) {
      sum += match[1].replace('mul(', '').replace(')', '').split(',').reduce((acc, cur) => acc * cur, 1)
    }

    match = r1.exec(input)
    count++
  }
  console.log('sum1:', sum)
  console.log('count1 matched:', count)
}

{
  const r2 = /(do\(\))|(don\'t\(\))|(mul\(\d{0,3},\d{0,3}\))/g

  let match = r2.exec(input)
  let sum = 0
  let count = 1

  let isEnabled = true
  while (match != null) {
    // console.log(match);

    if (match[1]) {
      isEnabled = true
    }
    if (match[2]) {
      isEnabled = false
    }
    if (match[3] && isEnabled) {
      sum += match[3].replace('mul(', '').replace(')', '').split(',').reduce((acc, cur) => acc * cur, 1)
    }

    match = r2.exec(input)
    count++
  }
  console.log('sum2:', sum)
  console.log('count2 matched:', count)
}
