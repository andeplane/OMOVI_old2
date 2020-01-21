import Visualizer from './rendering/Visualizer';
import DataView from './rendering/DataView';
import SphereRenderer from './datarenderers/SphereRenderer';
import { ParticleDataSource } from './datasources/ParticleDataSource';
import parseXYZ from './parsers/XYZParser';
import mixpanel from 'mixpanel-browser';

mixpanel.init("9c10a22f17662a08120a610f192de07f");

// export {
//   Visualizer,
//   SphereRenderer,
//   ParticleDataSource,
//   parseXYZ,
//   DataView
// }

const visualizer = new Visualizer();
document.body.appendChild( visualizer._renderer.renderer.domElement );

fetch("https://raw.githubusercontent.com/andeplane/OMOVI/master/example_files/faceted_cylinder.xyz").then(async result => {
  const contents = await result.text();
  const dataSource = parseXYZ(contents);
  const sphereRenderer = new SphereRenderer();
  const dataView = new DataView(dataSource, sphereRenderer);
  visualizer.add(dataView);
});