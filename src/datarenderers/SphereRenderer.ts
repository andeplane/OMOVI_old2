import * as THREE from 'three';
import ParticleDataSource from "../datasources/ParticleDataSource";
import Particles from '../datasources/Particles';
import DataRenderer from './DataRenderer';

interface ObjectMap {
  [key: string]: THREE.Object3D;
} 

function constructObject3D(frame: Particles): THREE.Object3D {
  const object = new THREE.Object3D();

  for (let i = 0; i < frame.count; i++) {
    const geometry = new THREE.SphereGeometry( 5, 32, 32 );
    const material = new THREE.MeshPhongMaterial( {color: 0xffff00} );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(frame.position.x[i], frame.position.y[i], frame.position.z[i]);
    object.add(mesh);
  }

  return object;
}

export default class SphereRenderer extends DataRenderer {
  _objectMap: ObjectMap = {};
  
  getObject3D(dataSource: ParticleDataSource): THREE.Object3D {
    const frame = dataSource.currentFrame();
    if (!this._objectMap[frame.uuid]) {
      this._objectMap[frame.uuid] = constructObject3D(frame);
    }
    return this._objectMap[frame.uuid];
  }
}