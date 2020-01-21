import Visualizer from './rendering/Visualizer';
import DataView from './rendering/DataView';
import SphereRenderer from './datarenderers/SphereRenderer';
import { ParticleDataSource } from './datasources/ParticleDataSource';
import parseXYZ from './parsers/XYZParser';
import mixpanel from 'mixpanel-browser';

// eslint-disable-next-line @typescript-eslint/camelcase
mixpanel.init("9c10a22f17662a08120a610f192de07f", {opt_out_tracking_by_default: true});

// export {
//   Visualizer,
//   SphereRenderer,
//   ParticleDataSource,
//   parseXYZ,
//   DataView
// }

const visualizer = new Visualizer();
document.body.appendChild( visualizer._renderer.renderer.domElement );

fetch("https://raw.githubusercontent.com/andeplane/OMOVI/master/example_files/sic.xyz").then(async result => {
  const contents = await result.text();
  const dataSource = parseXYZ(contents);
  
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  window.dataSource = dataSource;
  const sphereRenderer = new SphereRenderer();
  const dataView = new DataView(dataSource, sphereRenderer);
  visualizer.add(dataView);

  const animate = () => {
    dataSource._currentFrameIndex += 1;
    if (dataSource._currentFrameIndex >= dataSource.frames.length) {
      dataSource._currentFrameIndex = 0;
    }
  }
  setInterval(animate, 60);
});