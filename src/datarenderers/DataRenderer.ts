import * as THREE from 'three';
import DataSource from '../datasources/DataSource';

export default abstract class DataRenderer {
  abstract getObject3D(dataSource: DataSource): THREE.Object3D;
}