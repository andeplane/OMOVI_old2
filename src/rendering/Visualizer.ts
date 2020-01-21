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
  _dataViews: DataView[] = [];
  _directionalLight: THREE.DirectionalLight;
  _ambientLight: THREE.AmbientLight;
  _objects: THREE.Group = new THREE.Group();
  
  constructor() {
    this.addLights();
    this._renderer.renderer.setSize( window.innerWidth, window.innerHeight );
    
    this._controls = new OrbitControls(this._camera, this._renderer.renderer.domElement);
    this._camera.position.set(0, 0, -50);

    this._scene.add(this._objects);
    
    window.addEventListener( 'resize', this.onWindowResize, false );
    this._animate();
  }
  
  addLights = (): void => {
    this._ambientLight = new THREE.AmbientLight("#fff", 0.5);
    this._scene.add(this._ambientLight);
    this._directionalLight = new THREE.DirectionalLight("#fff", 0.5);
    this._directionalLight.position.set(10, 10, 10);
    this._scene.add(this._directionalLight);
  }

  add = (dataView: DataView): void => {
    this._dataViews.push(dataView);
  }

  onWindowResize = (): void => {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._renderer.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  _animate = (): void => {
    requestAnimationFrame(this._animate.bind(this));
    // this._controls.update();

    // Add any missing visible objects
    this._dataViews.forEach(dataView => {
      const object = dataView.getObject3D();
      if (this._objectMap[object.uuid] == null) {
        this._scene.add(object);
        this._objectMap[object.uuid] = object;
      }
    });

    // Find visible objects only
    this._objects.children.forEach(child => {
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