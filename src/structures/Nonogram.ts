import { getLongest, transposeArray } from '../util/util';
import { NonogramNumbers } from '../util/interfaces';

export default class Nonogram {
  constructor(width: number, height: number, data: NonogramNumbers) {
    this.#height = height;
    this.#width = width;
    this.#numbers = data;

    this.#verticalCount = getLongest(data.vertical).size;
    this.#horizontalCount = getLongest(data.horizontal).size;

    this.init();
  }

  #height: number;
  #width: number;
  #board: string[][] = [];
  #numbers: NonogramNumbers;
  #verticalCount: number;
  #horizontalCount: number;
  #cachedFullBoard: string[] = [];
  #cachedFullBoardIsValid = false;

  /**
   * Height of the Nonogram.
   */
  public get height() {
    return this.#height;
  }

  /**
   * Width of the Nonogram.
   */
  public get width() {
    return this.#width;
  }

  /**
   * If the full board cache is valid. Note that it will be `false` when nothing was cached yet.
   */
  public get isCachedFullBoardValid() {
    return this.#cachedFullBoardIsValid;
  }

  /**
   * Nonogram board.
   */
  public get board() {
    const board = this.#board.map(x => x.join(' ')).join('\n');
    return board;
  }

  /**
   * Nonogram board, including numbers around it.
   */
  public get fullBoard(): string {
    if (this.#cachedFullBoardIsValid) return this.#cachedFullBoard.join('\n');
    return this.makeFullBoard().join('\n');
  }

  /**
   * Invalidates full board cache.
   * Returns `false` if cache was invalid before the call, or if there was no board cached. Otherwise returns `true`
   */
  public invalidateCache() {
    if (!this.#cachedFullBoardIsValid || !this.#cachedFullBoard.length) return false;
    this.#cachedFullBoardIsValid = false;
    return true;
  }

  /**
   * Function for creating board with numbers.
   * It's relatively expensive, so returned board is cached.
   */
  private makeFullBoard() {
    const board = this.#board;
    const numbers = this.#numbers;
    let arr = [];

    for (let i = 0; i !== this.#verticalCount; i++) {
      for (let j = 0; j !== this.#width; j++) {
        const l = numbers.vertical[j].length - 1;
        const n = numbers.vertical[j][l] ? numbers.vertical[j].pop()!.toString() : ' ';
        arr.push(n);
      }
      board.unshift(arr);
      arr = [];
    }

    const transposed: string[][] = transposeArray(board);

    for (let i = 0; i !== this.#horizontalCount; i++) {
      for (let offset = 0; offset !== this.#verticalCount; offset++) arr.push(' ');
      for (let j = 0; j !== this.#height; j++) {
        const l = numbers.horizontal[j].length - 1;
        const n = numbers.horizontal[j][l] ? numbers.horizontal[j].pop()!.toString() : ' ';
        arr.push(n);
      }
      transposed.unshift(arr);
      arr = [];
    }

    const finalBoard = transposeArray(transposed).map(x => x.join(' '));

    this.#cachedFullBoard = finalBoard;
    this.#cachedFullBoardIsValid = true;

    return finalBoard;
  }

  /**
   * Init the board. Used only in the constructor.
   */
  private init() {
    for (let i = 0; i !== this.#height; i++) {
      const arr: string[] = [];
      // for (let j = 0; j !== this.#width; j++) Math.random() > 0.5 ? arr.push('.') : Math.random() > 0.5 ? arr.push('X') : arr.push('O');
      for (let j = 0; j !== this.#width; j++) arr.push('.');
      this.#board.push(arr);
    }
  }
}