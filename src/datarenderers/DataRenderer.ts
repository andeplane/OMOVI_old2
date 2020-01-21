import * as THREE from 'three';
import DataSource from '../datasources/DataSource';

export default interface DataRenderer {
  dataSource: DataSource;
  getObject3D(): THREE.Object3D;
}