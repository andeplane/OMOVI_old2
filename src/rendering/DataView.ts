import DataSource from "../datasources/DataSource";
import DataRenderer from "../datarenderers/DataRenderer";

export default class DataView {
  _dataSource: DataSource;
  _dataRenderer: DataRenderer;
  constructor(dataSource: DataSource, dataRenderer: DataRenderer) {
    this._dataSource = dataSource;
    this._dataRenderer = dataRenderer;
  }
  getObject3D(): THREE.Object3D {
    return this._dataRenderer.getObject3D(this._dataSource);
  }
}