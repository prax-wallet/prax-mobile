import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to PenumbraSdkModule.web.ts
// and on native platforms to PenumbraSdkModule.ts
import PenumbraSdkModule from './src/PenumbraSdkModule';
import { ChangeEventPayload } from './src/PenumbraSdkModule.types.ts';


// Rust-based Penumbra SDK functions

export function invokeRust(): Promise<string> {
  return PenumbraSdkModule.invokeRust();
}

export function performAsyncTask(input: string): Promise<string> {
  return PenumbraSdkModule.performAsyncTask(input);
}

export function requestBlockHeight(): Promise<number> {
  return PenumbraSdkModule.requestBlockHeight();
}

export function startServer(): Promise<number> {
  return PenumbraSdkModule.startServer();
}

export function sayAfter(ms: number, who: string): Promise<string> {
  return PenumbraSdkModule.sayAfter(ms, who);
}

export function startCounter(): Promise<boolean> {
  return PenumbraSdkModule.startCounter();
}

export function getCounter(): Promise<number> {
  return PenumbraSdkModule.getCounter();
}

export { ChangeEventPayload };
