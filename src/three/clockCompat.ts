import * as THREE from 'three';

/**
 * Drop-in Clock replacement without Three.js r183+ deprecation noise.
 * @react-three/fiber 9.x still constructs THREE.Clock internally.
 */
class ClockCompat {
  autoStart: boolean;
  startTime = 0;
  oldTime = 0;
  elapsedTime = 0;
  running = false;

  constructor(autoStart = true) {
    this.autoStart = autoStart;
  }

  start() {
    this.startTime = performance.now();
    this.oldTime = this.startTime;
    this.elapsedTime = 0;
    this.running = true;
  }

  stop() {
    this.getElapsedTime();
    this.running = false;
    this.autoStart = false;
  }

  getElapsedTime() {
    this.getDelta();
    return this.elapsedTime;
  }

  getDelta() {
    let diff = 0;

    if (this.autoStart && !this.running) {
      this.start();
      return 0;
    }

    if (this.running) {
      const newTime = performance.now();
      diff = (newTime - this.oldTime) / 1000;
      this.oldTime = newTime;
      this.elapsedTime += diff;
    }

    return diff;
  }
}

Object.assign(THREE, { Clock: ClockCompat });
