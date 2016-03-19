import three from 'three';
import * as autoresize from './autoresize';
import vmgauge from './vmgauge';

var scene = new three.Scene();

var camera = new three.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.z = 10;

var renderer = new three.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

autoresize.register(camera, renderer);

// while (document.body.firstChild) {
//     document.body.removeChild(document.body.firstChild);
// }
document.body.appendChild(renderer.domElement);

var start = performance.now();
var gauge1 = vmgauge();
scene.add(gauge1);

animate();

function animate(now) {
    requestAnimationFrame(animate);
    gauge1.material.uniforms.time.value = now / 1000;
    gauge1.material.uniforms.barSize.value = Math.min(6.282 * ((now - start) / 30000), 6.282);
    renderer.render(scene, camera);
}

if (module.hot) {
  module.hot.accept();
}
