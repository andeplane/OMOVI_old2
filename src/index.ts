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

fetch("http://folk.uio.no/anderhaf/faceted_cylinder.xyz", {mode: 'no-cors'})
.then(response => response.text())
.then(data=> console.log(data))
.catch(error => console.error(error));

// fetch("http://folk.uio.no/anderhaf/faceted_cylinder.xyz",
// { mode: 'no-cors'}).then(async result => {
//   const contents = await result.text();
//   console.log("contents: ", contents);
// })

const visualizer = new Visualizer();
// const dataSource = parseXYZ("");
// const sphereRenderer = new SphereRenderer();
// const dataView = new DataView(dataSource, sphereRenderer);
// visualizer.add(dataView);
document.body.appendChild( visualizer._renderer.renderer.domElement );

console.log("Got it")