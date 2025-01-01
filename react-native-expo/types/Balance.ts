/** A user's holding of a given asset. */
export default interface Balance {
  symbol: string;
  name: string;
  /** The amount represented as a decimal number of the display denom. */
  amount: number;
  /**
   * The equivalent value represented as a decimal number of the display denom.
   */
  equivalentValue: number;
}
