import { makeTheme } from 'dripsy';
import { theme } from './theme';

const BREAKPOINTS: (keyof typeof theme.breakpoint)[] = ['mobile', 'tablet', 'desktop', 'lg', 'xl'];

const dripsyTheme = makeTheme({
  breakpoints: BREAKPOINTS.map(breakpoint => `${theme.breakpoint[breakpoint]}px`),

  /**
   * @todo - Someone smarter than me, please map this dynamically, while
   * preserving type safety. (Note that not all color groups have the same
   * `main`/`light`/`dark`/`contrast` sub-keys.)
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

  customFonts: {
    Poppins: {
      default: 'Poppins',
      italic: 'PoppinsItalic',
      bold: 'PoppinsMedium',
      boldItalic: 'PoppinsMediumItalic',
    },
    IosevkaTerm: {
      default: 'IosevkaTerm',
      bold: 'IosevkaTermMedium',
    },
  },

  fonts: {
    root: 'Poppins',
    mono: 'IosevkaTerm',
    heading: 'Poppins',
  },

  // These need to be redefined inside React Native, since RN uses numeric font
  // sizes (rather than, e.g., `rem`s).
  fontSize: {
    text9xl: 128,
    text8xl: 96,
    text7xl: 72,
    text6xl: 60,
    text5xl: 48,
    text4xl: 36,
    text3xl: 30,
    text2xl: 24,
    textXl: 20,
    textLg: 18,
    textBase: 16,
    textSm: 14,
    textXs: 12,
    textXxs: 11,
  },

  // These need to be redefined inside React Native, since RN uses numeric line
  // heights (rather than, e.g., `rem`s).
  lineHeight: {
    text9xl: 132,
    text8xl: 100,
    text7xl: 80,
    text6xl: 68,
    text5xl: 56,
    text4xl: 44,
    text3xl: 40,
    text2xl: 36,
    textXl: 32,
    textLg: 28,
    textBase: 24,
    textSm: 20,
    textXs: 16,
    textXxs: 16,
  },

  sizes: {
    $0: 0,
    $1: 4,
    $2: 8,
    $3: 12,
    $4: 16,
    $5: 20,
    $6: 24,
    $7: 28,
    $8: 32,
    $9: 36,
    $10: 40,
  },

  space: {
    $0: 0,
    $1: 4,
    $2: 8,
    $3: 12,
    $4: 16,
    $5: 20,
    $6: 24,
    $7: 28,
    $8: 32,
    $9: 36,
    $10: 40,
  },

  text: {
    h1: {
      fontFamily: 'heading',
      fontSize: 'text6xl',
      fontWeight: 500,
      lineHeight: 'text6xl',
    },

    h2: {
      fontFamily: 'heading',
      fontSize: 'text5xl',
      fontWeight: 500,
      lineHeight: 'text5xl',
    },

    h3: {
      fontFamily: 'heading',
      fontSize: 'text4xl',
      fontWeight: 500,
      lineHeight: 'text4xl',
    },

    h4: {
      fontFamily: 'heading',
      fontSize: 'text3xl',
      fontWeight: 500,
      lineHeight: 'text3xl',
    },

    large: {
      fontFamily: 'root',
      fontSize: 'textLg',
      fontWeight: 500,
      lineHeight: 'textLg',
    },

    body: {
      fontFamily: 'root',
      fontSize: 'textBase',
      fontWeight: 400,
      lineHeight: 'textBase',
    },

    strong: {
      fontFamily: 'root',
      fontSize: 'textBase',
      fontWeight: 500,
      lineHeight: 'textBase',
    },

    detail: {
      fontFamily: 'root',
      fontSize: 'textXs',
      fontWeight: 500,
      lineHeight: 'textXs',
    },

    detailTechnical: {
      fontFamily: 'mono',
      fontSize: 'textXs',
      fontWeight: 400,
      lineHeight: 'textXs',
    },

    small: {
      fontFamily: 'root',
      fontSize: 'textSm',
      fontWeight: 400,
      lineHeight: 'textSm',
    },

    tab: {
      fontFamily: 'root',
      fontSize: 'textLg',
      fontWeight: 400,
      lineHeight: 'textLg',
    },

    tabSmall: {
      fontFamily: 'root',
      fontSize: 'textSm',
      fontWeight: 500,
      lineHeight: 'textSm',
    },

    tableItem: {
      fontFamily: 'root',
      fontSize: 'textBase',
      fontWeight: 400,
      lineHeight: 'textBase',
    },

    tableHeading: {
      fontFamily: 'root',
      fontSize: 'textBase',
      fontWeight: 500,
      lineHeight: 'textBase',
    },

    technical: {
      fontFamily: 'mono',
      fontSize: 'textBase',
      fontWeight: 500,
      lineHeight: 'textBase',
    },

    xxl: {
      fontFamily: 'root',
      fontSize: 'text2xl',
      fontWeight: 500,
      lineHeight: 'text2xl',
    },

    button: {
      fontFamily: 'root',
      fontSize: 'textBase',
      fontWeight: 500,
      lineHeight: 'textBase',
    },
  },
});

export default dripsyTheme;
export type DripsyTheme = typeof dripsyTheme;

declare module 'dripsy' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface DripsyCustomTheme extends DripsyTheme {}
}
