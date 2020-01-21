import * as THREE from 'three';
import {ParticleDataSource, ParticleFrame} from "../datasources/ParticleDataSource";
import DataRenderer from './DataRenderer';

interface ObjectMap {
  [key: string]: THREE.Object3D;
} 

function constructObject3D(frame: ParticleFrame): THREE.Object3D {
  const object = new THREE.Object3D();

  for (let i = 0; i < frame.count; i++) {
    const color = `rgb(${frame.color.r[i]}, ${frame.color.g[i]}, ${frame.color.b[i]})`;

    const geometry = new THREE.SphereGeometry( 1, 4, 4 );
    const material = new THREE.MeshPhongMaterial( {color} );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(frame.position.x[i], frame.position.y[i], frame.position.z[i]);
    object.add(mesh);
  }

  return object;
}

export default class SphereRenderer implements DataRenderer {
  _objectMap: ObjectMap = {};
  dataSource: ParticleDataSource;
  constructor(dataSource: ParticleDataSource) {
    this.dataSource = dataSource;
  }
  
  getObject3D(): THREE.Object3D {
    const frame = this.dataSource.currentFrame();
    if (!this._objectMap[frame.uuid]) {
      this._objectMap[frame.uuid] = constructObject3D(frame);
    }
    return this._objectMap[frame.uuid];
  }
}