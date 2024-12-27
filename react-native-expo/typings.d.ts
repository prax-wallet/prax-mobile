declare module '*.png' {
  const value: number;
  export default value;
}

declare module '*.po' {
  import type { Messages } from '@lingui/core';
  export const messages: Messages;
}
