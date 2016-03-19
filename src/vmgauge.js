import three from 'three';
var basicVert = require("raw!./basic.vert");
var gaugeShader = require("raw!./gaugeShader.frag");

export default function() {
    let geometry = new three.PlaneGeometry(20, 20);
    // let material = new three.MeshBasicMaterial({
    //     color: 0xfb4b4b
    // });
    let material = new three.ShaderMaterial({
        uniforms: {
            "time": { type: "f", value: 0.0 },
            "speed": { type: "f", value: 2.5 },
            "barSize": { type: "f", value: 4.0 }
        },
        vertexShader: basicVert,
        fragmentShader: gaugeShader
    });

    let gauge = new three.Mesh(geometry, material);
    gauge.position.set(0, 0, -5);
    gauge.lookAt(new three.Vector3(0, 0, 0));

    return gauge;
}
