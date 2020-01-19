import uuidv4 from 'uuid';

interface Position {
  x: number;
  y: number;
  z: number;
}

interface Color {
  r: number;
  g: number;
  b: number;
}

interface Positions {
  x: Float32Array;
  y: Float32Array;
  z: Float32Array;
}

interface Colors {
  r: Float32Array;
  g: Float32Array;
  b: Float32Array;
}

export default class Particles {
  uuid: string;
  position: Positions;
  radius: Float32Array;
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
      b: new Float32Array(capacity),
    }
  }

  add(
    position: Position, 
    radius = 1.0, 
    color: Color = {r: 1.0, g: 1.0, b: 1.0}
  ): void {
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
