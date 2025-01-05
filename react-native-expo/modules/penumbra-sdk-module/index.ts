import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to PenumbraSdkModule.web.ts
// and on native platforms to PenumbraSdkModule.ts
import PenumbraSdkModule from './src/PenumbraSdkModule';
import { ChangeEventPayload } from './src/PenumbraSdkModule.types';

// Rust-based Penumbra SDK functions

export function createAppStateContainer(): Promise<number> {
  return PenumbraSdkModule.createAppStateContainer();
}

export function startServer(dbPath: String): Promise<number> {
  return PenumbraSdkModule.startServer(dbPath);
}

export function getBlockHeight(): Promise<number> {
  return PenumbraSdkModule.getBlockHeight();
}
export function transparentAddress(): Promise<number[]> {
  return PenumbraSdkModule.transparentAddress();
}

export function transactionPlanner(): Promise<Uint8Array> {
  return PenumbraSdkModule.transactionPlanner();
}

export function authorize(planBytes: Uint8Array): Promise<Uint8Array> {
  return PenumbraSdkModule.authorize(planBytes);
}

export function witnessAndBuild(transactionPlan: Uint8Array, authorizationData: Uint8Array): Promise<Uint8Array> {
  return PenumbraSdkModule.witnessAndBuild(transactionPlan, authorizationData);
}

export function sync() {
  return PenumbraSdkModule.sync();
}

export function loadLocalProvingKey(keyType: String, filePath: String): Promise<Uint8Array> {
  return PenumbraSdkModule.loadLocalProvingKey(keyType, filePath);
}

export { ChangeEventPayload };
