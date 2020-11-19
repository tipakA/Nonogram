export function getLongest(data: any[][]) {
  let longest: any;
  let size = 0;
  for (const d of data) {
    if (d.length >= size) {
      longest = d;
      size = d.length;
    }
  }
  return { longest, size };
}

export function transposeArray(array: any[][]) {
  return array[0].map((_: any, colIndex: number) => array.map(row => row[colIndex]));
}