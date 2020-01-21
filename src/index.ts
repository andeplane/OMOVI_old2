import Visualizer from './rendering/Visualizer';
import DataView from './rendering/DataView';
import SphereRenderer from './datarenderers/SphereRenderer';
import { ParticleDataSource } from './datasources/ParticleDataSource';
import parseXYZ from './parsers/XYZParser';

// export {
//   Visualizer,
//   SphereRenderer,
//   ParticleDataSource,
//   parseXYZ,
//   DataView
// }
console.log("Will start")
const visualizer = new Visualizer();
document.body.appendChild( visualizer._renderer.renderer.domElement );

fetch("https://raw.githubusercontent.com/andeplane/OMOVI/master/example_files/faceted_cylinder.xyz").then(async result => {
  const contents = await result.text();
  const dataSource = parseXYZ(contents);
  console.log("dataSource: ", dataSource);
  const sphereRenderer = new SphereRenderer();
  const dataView = new DataView(dataSource, sphereRenderer);
  visualizer.add(dataView);
})


console.log("Got it")