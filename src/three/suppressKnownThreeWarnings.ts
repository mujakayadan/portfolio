import { setConsoleFunction } from 'three';

const suppressedWarnings = new Set([
  'THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.',
  'THREE.WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead.',
]);

setConsoleFunction((type, message, ...params) => {
  if (type === 'warn' && suppressedWarnings.has(message)) {
    return;
  }

  if (type === 'error') {
    console.error(message, ...params);
    return;
  }

  if (type === 'warn') {
    console.warn(message, ...params);
    return;
  }

  console.log(message, ...params);
});
