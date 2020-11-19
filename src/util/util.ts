/**
 * Return longest element from the passed 2D array, along with it's size.
 * @param data 2D array to determine longest element from.
 */
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

/**
 * Transposes a 2D array.
 * @param array 2D array to transpose.
 */
export function transposeArray(array: any[][]) {
  return array[0].map((_: any, colIndex: number) => array.map(row => row[colIndex]));
}