// Reexport the native module. On web, it will be resolved to MyModule.web.ts
// and on native platforms to MyModule.ts
export { default } from './src/MyModule';
export { default as MyModuleView } from './src/MyModuleView';
export * from  './src/MyModule.types';
