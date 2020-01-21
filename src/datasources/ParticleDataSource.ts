import DataSource from './DataSource';
import uuidv4 from 'uuid';
import { Colors, Color } from '../types/Color';
import { Positions, Position } from '../types/Position';

export class ParticleFrame {
  uuid: string;
  position: Positions;
  radius: Float32Array;
  id: Float32Array;
  color: Colors;
  count = 0;

  constructor(capacity: number) {
    this.uuid = uuidv4();
    this.position = {
      x: new Float32Array(capacity),
      y: new Float32Array(capacity),
      z: new Float32Array(capacity),
    }
    this.radius = new Float32Array(capacity);
    this.color = {
      r: new Float32Array(capacity),
      g: new Float32Array(capacity),
      b: new Float32Array(capacity)
    }
    this.id = new Float32Array(capacity);
  }

  add(
    id: number,
    position: Position, 
    radius = 1.0, 
    color: Color = {r: 1.0, g: 1.0, b: 1.0}
  ): void {
    this.id[this.count] = id;
    this.position.x[this.count] = position.x;
    this.position.y[this.count] = position.y;
    this.position.z[this.count] = position.z;
    this.radius[this.count] = radius;
    this.color.r[this.count] = color.r;
    this.color.g[this.count] = color.g;
    this.color.b[this.count] = color.b;

    this.count += 1;
  }
}

export class ParticleDataSource implements DataSource {
  _currentFrameIndex = 0;
  frames: ParticleFrame[] = [];

  addFrame(frame: ParticleFrame): void {
    this.frames.push(frame);
  }

  currentFrame(): ParticleFrame {
    return this.frames[this._currentFrameIndex];
  }
}