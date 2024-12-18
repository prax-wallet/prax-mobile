import { makeTheme } from 'dripsy';
import { theme } from './theme';

const dripsyTheme = makeTheme({
  ...theme,
  breakpoints: [
    `${theme.breakpoint.mobile}px`,
    `${theme.breakpoint.tablet}px`,
    `${theme.breakpoint.desktop}px`,
    `${theme.breakpoint.lg}px`,
    `${theme.breakpoint.xl}px`,
  ],
});
export default dripsyTheme;
type DripsyTheme = typeof dripsyTheme;

declare module 'dripsy' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface DripsyCustomTheme extends DripsyTheme {}
}
