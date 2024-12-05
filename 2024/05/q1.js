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
            return [j, k, -1]
          }
        }
      }

      if (j - 1 >= 0) {
        for (let l = j - 1; l > 0; l--) {
          const leftElem = elemArr[l]
          if ((rightMap[leftElem] || []).includes(e)) {
            return [j, l, 1]
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
      console.log(`${index}:`, res, cur)

      if (!res[2]) {
        return acc
      }

      do {
        let [n1, n2, direction] = res;
        console.log('n1, n2, direction:', n1, n2, direction)
        console.log('cur:', cur)

        if (direction === -1) {
          const replaced = cur[n2]
          console.log('replaced:', replaced)
          cur = cur.toSpliced(n2, 1)
          console.log('after remove:', cur)
          cur = cur.toSpliced(n1, 0, replaced)
          console.log('after insert:', cur)
        } else if (direction === 1) {
          const replaced = cur[n1]
          console.log('[2] replaced:', replaced)
          cur = cur.toSpliced(n1, 1)
          console.log('[2] after remove:', cur)
          cur = cur.toSpliced(n2, 0, replaced)
          console.log('[2] after insert:', cur)
        }

        res = check(cur)
        console.log('res:', res)
      } while (res.length > 0)

      return acc + +cur[(cur.length - 1) / 2]
    }, 0)

  console.log('res2:', res2)

}


