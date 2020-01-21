import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Renderer from './SceneRenderer';
import DataView from './DataView';

interface ObjectMap {
  [key: string]: THREE.Object3D;
}

export default class Visualizer {
  _scene: THREE.Scene = new THREE.Scene();
  _camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1.0, 100);
  _renderer: Renderer = new Renderer();
  _controls: OrbitControls
  _objectMap: ObjectMap = {};
  _animationRequestId?: number;
  _dataViews: DataView[] = [];
  
  constructor() {
    this._renderer.renderer.setSize( window.innerWidth, window.innerHeight );
    
    this._controls = new OrbitControls(this._camera, this._renderer.renderer.domElement);
    this._camera.position.set(0, 0, -50);
    this._scene.add(new THREE.AmbientLight("#fff", 0.5));
    const directionalLight = new THREE.DirectionalLight("#fff", 0.5);
    directionalLight.position.set(10, 10, 10);
    this._scene.add(directionalLight);
    
    window.addEventListener( 'resize', this.onWindowResize, false );
    this._animate(0);
  }

  add(dataView: DataView) {
    this._dataViews.push(dataView);
  }

  onWindowResize = () => {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._renderer.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  _animate(time: number): void {
    this._animationRequestId = requestAnimationFrame(this._animate.bind(this));
    this._controls.update();

    // Add any missing visible objects
    this._dataViews.forEach(dataView => {
      const object = dataView.getObject3D();
      if (this._objectMap[object.uuid] == null) {
        this._scene.add(object);
        this._objectMap[object.uuid] = object;
      }
    });

    // Find visible objects only
    this._scene.children.forEach(child => {
      if (child instanceof THREE.Light) {
        child.visible = true;
        return;
      }

      child.visible = false;
      this._dataViews.forEach(dataView => {
        if (dataView.getObject3D() === child) {
          child.visible = true;
        }
      });
    });

    this._renderer.render(this._scene, this._camera);
  }
}