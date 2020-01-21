import * as THREE from 'three';
import DataSource from '../datasources/DataSource';

export default interface DataRenderer {
  getObject3D(dataSource: DataSource): THREE.Object3D;
}