/** A user's holding of a given asset. */
export default interface Balance {
  assetSymbol: string;
  assetName: string;
  /** The amount represented as a decimal number of the display denom. */
  amount: number;
  /**
   * The equivalent value represented as a decimal number of the display denom
   * of the asset selected by the user as their default asset.
   */
  equivalentValue: number;
}
