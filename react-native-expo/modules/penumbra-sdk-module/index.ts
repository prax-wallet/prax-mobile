// Import the native module. On web, it will be resolved to PenumbraSdkModule.web.ts
// and on native platforms to PenumbraSdkModule.ts
import PenumbraSdkModule from './src/PenumbraSdkModule';
import { ChangeEventPayload } from './src/PenumbraSdkModule.types';

// Rust-based Penumbra SDK functions

export function createAppStateContainer(): Promise<number> {
  return PenumbraSdkModule.createAppStateContainer();
}

export function startServer(): Promise<number> {
  return PenumbraSdkModule.startServer();
}

export function getBlockHeight(): Promise<number> {
  return PenumbraSdkModule.getBlockHeight();
}

export { ChangeEventPayload };
