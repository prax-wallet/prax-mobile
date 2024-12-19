import { makeTheme } from 'dripsy';
import { theme } from './theme';

const BREAKPOINTS: (keyof typeof theme.breakpoint)[] = ['mobile', 'tablet', 'desktop', 'lg', 'xl'];

const dripsyTheme = makeTheme({
  ...theme,
  breakpoints: BREAKPOINTS.map(breakpoint => `${theme.breakpoint[breakpoint]}px`),
});
export default dripsyTheme;
export type DripsyTheme = typeof dripsyTheme;

declare module 'dripsy' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface DripsyCustomTheme extends DripsyTheme {}
}
