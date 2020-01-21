import { ParticleDataSource, ParticleFrame } from '../datasources/ParticleDataSource';
import AtomTypes from '../helpers/AtomTypes';
import { Color } from '../types/Color';
import { Position } from '../types/Position';
import mixpanel from 'mixpanel-browser';

interface ReadPositionReturnValue {
  id: number;
  position: Position;
  radius: number;
  color: Color;
}

function addParticlesToFrame(lines: string[], numParticles: number, i: number, frame: ParticleFrame): void {
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
  mixpanel.time_event("XYZParser.parse");
  const dataSource = new ParticleDataSource();
  const lines = data.split('\n');
  const numLines = lines.length;
  let i = 0;
  let skipNextLine = false;
  let readNumParticles = true;
  let numParticles;
  let differentParticleCount = false;
  
  while (i < numLines) {
    if (lines[i] === "") {
      i += 1;
      continue;
    }
    if (skipNextLine) {
      skipNextLine = false;
    } else if (readNumParticles) {
      const numParticlesThisFrame = parseInt(lines[i], 10);
      if (numParticles != null && numParticles !== numParticlesThisFrame) {
        differentParticleCount = true;
      }
      numParticles = numParticlesThisFrame;

      if (isNaN(numParticles)) {
        console.log("Warning, got NaN as numParticles");
        return null;
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

  mixpanel.track("XYZParser.parse", {
    bytes: data.length,
    differentParticleCount,
    numFrames: dataSource.frames.length
  });

  return dataSource;
}
