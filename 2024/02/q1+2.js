const rows = (await Deno.readTextFile('input.txt'))
  .split('\n')
  .filter(a => a)

const reports = rows.map(a => a.split(' ').map(b => +b))

const isReportSafe = (report) => {
  const isIncreasing = report[1] > report[0]
  for (let i = 0; i <= report.length - 2; i++) {
    const first = report[i]
    const next = report[i + 1]
    const diff = next - first
    if (diff === 0) {
      return false
    }
    if (isIncreasing && diff < 0) {
      return false
    }
    if (!isIncreasing && diff > 0) {
      return false
    }
    if (Math.abs(diff) > 3) {
      return false
    }
  }

  return true
}
const isReportSafeWithTolerate = (report, hasSingleLevelRemoved = false) => {
  const isIncreasing = report[1] > report[0]
  for (let i = 0; i <= report.length - 2; i++) {
    const current = report[i]
    const next = report[i + 1]
    const diff = next - current
    if (diff === 0
      || isIncreasing && diff < 0
      || !isIncreasing && diff > 0
      || Math.abs(diff) > 3
    ) {
      if (hasSingleLevelRemoved) {
        return false
      }

      return (i - 1 >= 0 && isReportSafeWithTolerate(report.toSpliced(i - 1, 1), true))
        || isReportSafeWithTolerate(report.toSpliced(i, 1), true)
        || isReportSafeWithTolerate(report.toSpliced(i + 1, 1), true)
    }
  }

  return true
}

const result1 = reports.filter(isReportSafe).length
console.log('result1:', result1)

const result2 = reports.filter(r => isReportSafeWithTolerate(r, false)).length
console.log('result2:', result2)


