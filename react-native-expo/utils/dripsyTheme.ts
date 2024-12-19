import { makeTheme } from 'dripsy';
import { theme } from './theme';

const BREAKPOINTS: (keyof typeof theme.breakpoint)[] = ['mobile', 'tablet', 'desktop', 'lg', 'xl'];

const dripsyTheme = makeTheme({
  breakpoints: BREAKPOINTS.map(breakpoint => `${theme.breakpoint[breakpoint]}px`),

  /**
   * @todo - Someone smarter than me, please map this dynamically, while
   * preserving type safety. (Note that not all color groups have the same
   * sub-keys of `main`/`light`/`dark`/`contrast`.)
   */
  colors: {
    neutralMain: theme.color.neutral.main,
    neutralLight: theme.color.neutral.light,
    neutralDark: theme.color.neutral.dark,
    neutralContrast: theme.color.neutral.contrast,
    primaryMain: theme.color.primary.main,
    primaryLight: theme.color.primary.light,
    primaryDark: theme.color.primary.dark,
    primaryContrast: theme.color.primary.contrast,
    secondaryMain: theme.color.secondary.main,
    secondaryLight: theme.color.secondary.light,
    secondaryDark: theme.color.secondary.dark,
    secondaryContrast: theme.color.secondary.contrast,
    unshieldMain: theme.color.unshield.main,
    unshieldLight: theme.color.unshield.light,
    unshieldDark: theme.color.unshield.dark,
    unshieldContrast: theme.color.unshield.contrast,
    destructiveMain: theme.color.destructive.main,
    destructiveLight: theme.color.destructive.light,
    destructiveDark: theme.color.destructive.dark,
    destructiveContrast: theme.color.destructive.contrast,
    cautionMain: theme.color.caution.main,
    cautionLight: theme.color.caution.light,
    cautionDark: theme.color.caution.dark,
    cautionContrast: theme.color.caution.contrast,
    successMain: theme.color.success.main,
    successLight: theme.color.success.light,
    successDark: theme.color.success.dark,
    successContrast: theme.color.success.contrast,
    baseBlack: theme.color.base.black,
    baseBlackAlt: theme.color.base.blackAlt,
    baseWhite: theme.color.base.white,
    basetransparent: theme.color.base.transparent,
    textPrimary: theme.color.text.primary,
    textSecondary: theme.color.text.secondary,
    textMuted: theme.color.text.muted,
    textspecial: theme.color.text.special,
    actionHoverOverlay: theme.color.action.hoverOverlay,
    actionActiveOverlay: theme.color.action.activeOverlay,
    actionDisabledOverlay: theme.color.action.disabledOverlay,
    actionPrimaryFocusOutline: theme.color.action.primaryFocusOutline,
    actionSecondaryFocusOutline: theme.color.action.secondaryFocusOutline,
    actionUnshieldFocusOutline: theme.color.action.unshieldFocusOutline,
    actionNeutralFocusOutline: theme.color.action.neutralFocusOutline,
    actionDestructiveFocusOutline: theme.color.action.destructiveFocusOutline,
    actionSuccessFocusOutline: theme.color.action.successFocusOutline,
    otherTonalStroke: theme.color.other.tonalStroke,
    otherTonalFill5: theme.color.other.tonalFill5,
    otherTonalFill10: theme.color.other.tonalFill10,
    otherSolidStroke: theme.color.other.solidStroke,
    otherDialogBackground: theme.color.other.dialogBackground,
    otherOverlay: theme.color.other.overlay,
  },
});

export default dripsyTheme;
export type DripsyTheme = typeof dripsyTheme;

declare module 'dripsy' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface DripsyCustomTheme extends DripsyTheme {}
}
