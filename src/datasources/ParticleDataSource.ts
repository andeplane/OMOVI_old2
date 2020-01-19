import Particles from './Particles';
import DataSource from './DataSource';

export default class ParticleDataSource extends DataSource {
  frames: Particles[] = [];

  addFrame(frame: Particles): void {
    this.frames.push(frame);
  }

  currentFrame(): Particles {
    return this.frames[this._currentFrameIndex];
  }
}