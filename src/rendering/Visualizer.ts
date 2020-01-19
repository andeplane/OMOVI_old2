import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Renderer from './Renderer';
import DataView from './DataView';

interface ObjectMap {
  [key: string]: THREE.Object3D;
}

export default class Visualizer {
  _scene: THREE.Scene = new THREE.Scene();
  _camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(65, null, 1.0, 100);
  _renderer: Renderer = new Renderer();
  _controller: OrbitControls
  _animationRequestId?: number;
  _dataViews: DataView[];
  constructor() {
    this._animate(0);
    this._controller = new OrbitControls(this._camera, this._renderer.renderer.domElement);
  }

  _animate(time: number): void {
    this._animationRequestId = requestAnimationFrame(this._animate.bind(this));

    this._dataViews.forEach(dataView => {
      const object3D = dataView.getObject3D();
    });

    // Find visible frames only
    this._scene.traverse(object => {
      object.visible = false;
      this._dataViews.forEach(dataView => {
        object.visible = dataView.getObject3D() === object;
      })
    });

    this._renderer.render(this._scene, this._camera);
  }
}