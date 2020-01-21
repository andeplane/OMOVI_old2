import { ParticleDataSource, ParticleFrame } from '../datasources/ParticleDataSource';
import AtomTypes from '../helpers/AtomTypes';
import { Color } from '../types/Color';
import { Position } from '../types/Position';

interface ReadPositionReturnValue {
  id: number;
  position: Position;
  radius: number;
  color: Color;
}

function addParticlesToFrame(lines: string[], numParticles: number, i: number, frame: ParticleFrame) {
  for (let j = 0; j < numParticles; j++) {
    const lineData = lines[i + j].split(/\s+/).filter(Boolean);
    const element = lineData[0];
    
    const atomType = AtomTypes[element];
    const id = j;
    const x = parseFloat(lineData[1]);
    const y = parseFloat(lineData[2]);
    const z = parseFloat(lineData[3]);
    frame.add(id, {x, y, z}, atomType.radius, atomType.color);
  }
}

export default function(data: string): ParticleDataSource {
  const dataSource = new ParticleDataSource();
  const lines = data.split('\n');
  const numLines = lines.length;
  let i = 0;
  let skipNextLine = false;
  let readNumParticles = true;
  let numParticles;
  while (i < numLines) {
    if (skipNextLine) {
      skipNextLine = false;
    } else if (readNumParticles) {
      numParticles = parseInt(lines[i], 10);

      if (isNaN(numParticles)) {
        return;
      }

      readNumParticles = false;
      skipNextLine = true;
    } else {
      const frame = new ParticleFrame(numParticles);
      addParticlesToFrame(
        lines,
        numParticles,
        i,
        frame
      );

      dataSource.addFrame(frame);
      i += numParticles - 1;
      readNumParticles = true;
    }

    i++;
  }


  return dataSource;
}
