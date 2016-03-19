export function register(camera, renderer) {
    window.addEventListener('resize', () => onWindowResize(camera, renderer), false);
}

function onWindowResize(camera, renderer) {
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}
