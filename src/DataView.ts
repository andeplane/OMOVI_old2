import DataSource from "./datasources/DataSource";
import DataRenderer from "./renderers/DataRenderer";

export default class DataView {
  _dataSource: DataSource;
  _dataRenderer: DataRenderer;
  getObject3D(): THREE.Object3D {
    return this._dataRenderer.getObject3D(this._dataSource);
  }
}