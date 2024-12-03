const input = (await Deno.readTextFile("input.txt")).trim()

{
  const r1 = /mul\((\d{1,3},\d{1,3})\)/g;
  const sum = input.matchAll(r1).reduce((acc, cur) => acc + cur[1].split(',').reduce((a, c) => +a * +c, 1), 0);
  console.log('sum1:', sum);
}

{
  const r2 = /(do\(\))|(don\'t\(\))|mul\((\d{0,3},\d{0,3})\)/g;
  const { sum: sum2 } = input.matchAll(r2).reduce((acc, cur) => {
    if (cur[1]) {
      return { ...acc, enabled: true };
    }

    if (cur[2]) {
      return { ...acc, enabled: false };
    }

    return acc.enabled
      ? { ...acc, sum: acc.sum + cur[3].split(',').reduce((a, c) => +a * +c, 1) }
      : acc;
  }, { enabled: true, sum: 0 });

  console.log('sum2:', sum2);
}

// Even simplified version
{
  const r2 = /(do\(\))|(don\'t\(\))|mul\((\d{0,3},\d{0,3})\)/g;
  const { sum: sum2 } = input.matchAll(r2).reduce(({ enabled, sum }, [_, _do, _dont, nums]) => ({
    enabled: _do ? true : _dont ? false : enabled,
    sum: nums && enabled ? sum + nums.split(',').reduce((a, c) => +a * +c, 1) : sum,
  }), { enabled: true, sum: 0 });

  console.log('sum2:', sum2);
}
