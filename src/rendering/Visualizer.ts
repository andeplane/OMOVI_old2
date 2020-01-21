import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Renderer from './SceneRenderer';
import DataRenderer from '../datarenderers/DataRenderer';
import ComboControls from '@cognite/three-combo-controls';

interface ObjectMap {
  [key: string]: THREE.Object3D;
}

export default class Visualizer {
  _scene = new THREE.Scene();
  _camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1.0, 100);
  _renderer = new Renderer();
  _controls: ComboControls
  _objectMap: ObjectMap = {};
  _dataRenderers: DataRenderer[] = [];
  _directionalLight: THREE.DirectionalLight;
  _ambientLight: THREE.AmbientLight;
  _objects = new THREE.Group();
  _clock = new THREE.Clock();
  constructor() {
    this._addLights();
    this._renderer.renderer.setSize( window.innerWidth, window.innerHeight );
    
    this._controls = new ComboControls(this._camera, this._renderer.renderer.domElement);
    this._controls.setState(new THREE.Vector3(0, 0, -50), new THREE.Vector3(0, 0, 0));
    
    this._scene.add(this._objects);
    
    window.addEventListener( 'resize', this.onWindowResize, false );
    this._animate();
  }
  
  _addLights = (): void => {
    this._ambientLight = new THREE.AmbientLight("#fff", 0.5);
    this._scene.add(this._ambientLight);
    this._directionalLight = new THREE.DirectionalLight("#fff", 0.5);
    this._directionalLight.position.set(10, 10, 10);
    this._scene.add(this._directionalLight);
  }

  add = (dataRenderer: DataRenderer): void => {
    this._dataRenderers.push(dataRenderer);
  }

  onWindowResize = (): void => {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._renderer.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  _animate = (): void => {
    requestAnimationFrame(this._animate.bind(this));
    this._controls.update(this._clock.getDelta());
    // Add any missing visible objects
    this._dataRenderers.forEach(dataRenderer => {
      const object = dataRenderer.getObject3D();
      if (this._objectMap[object.uuid] == null) {
        this._objects.add(object);
        this._objectMap[object.uuid] = object;
      }
    });

    // Find visible objects only
    this._objects.children.forEach(child => {
      child.visible = false;
      this._dataRenderers.forEach(dataRenderer => {
        if (dataRenderer.getObject3D() === child) {
          child.visible = true;
        }
      });
    });

    this._renderer.render(this._scene, this._camera);
  }
}