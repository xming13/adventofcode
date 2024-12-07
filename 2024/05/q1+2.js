const [section1Rows, section2Rows] = (await Deno.readTextFile('input.txt')).split('\n\n').map(a => a.split('\n'))

const [leftMap, rightMap] = section1Rows
  .map(r => r.split('|'))
  .reduce((acc, [left, right]) => {
    acc[0][left] = [...acc[0][left] || [], right]
    acc[1][right] = [...acc[1][right] || [], left]
    return acc
  }, [{}, {}])

console.log('leftMap, rightMap:', leftMap, rightMap)

{
  const check = (elemArr) => {
    return elemArr.every((e, j) => {
      if (j + 1 <= elemArr.length - 1) {
        for (let k = j + 1; k < elemArr.length - 1; k++) {
          const rightElem = elemArr[k]
          if ((leftMap[rightElem] || []).includes(e)) {
            return false
          }
        }
      }

      if (j - 1 >= 0) {
        for (let l = j - 1; l > 0; l--) {
          const leftElem = elemArr[l]
          if ((rightMap[leftElem] || []).includes(e)) {
            return false
          }
        }
      }

      return true
    })
  }

  const res1 = section2Rows
    .map(r => r.split(','))
    .reduce((acc, cur, index) => {
      const res = check(cur)
      return acc + (res ? +cur[(cur.length - 1) / 2] : 0)
    }, 0)

  console.log('res1:', res1)
}

{
  const check = (elemArr) => {
    for (let j = 0; j < elemArr.length; j++) {
      const e = elemArr[j]
      if (j + 1 <= elemArr.length - 1) {
        for (let k = j + 1; k < elemArr.length - 1; k++) {
          const rightElem = elemArr[k]
          if ((leftMap[rightElem] || []).includes(e)) {
            return [k, j]
          }
        }
      }

      if (j - 1 >= 0) {
        for (let l = j - 1; l > 0; l--) {
          const leftElem = elemArr[l]
          if ((rightMap[leftElem] || []).includes(e)) {
            return [j, l]
          }
        }
      }
    }

    return [];
  }

  const res2 = section2Rows
    .map(r => r.split(','))
    .reduce((acc, cur, index) => {
      let res = check(cur)
      if (res.length === 0) {
        return acc
      }

      do {
        let [n1, n2] = res;
        const replaced = cur[n1]
        cur = cur.toSpliced(n1, 1)
        cur = cur.toSpliced(n2, 0, replaced)
        res = check(cur)
      } while (res.length > 0)

      return acc + +cur[(cur.length - 1) / 2]
    }, 0)

  console.log('res2:', res2)

}


