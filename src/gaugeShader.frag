#ifdef GL_ES
precision mediump float;
#endif

#define M_PI 3.1415926535897932384626433832795

varying vec2 vUv;
uniform float speed;
uniform float barSize;
uniform float time;

void main() {
    // Params
    // float speed = 2.000;
    // float barSize = 4.008;
    vec3 barColor = vec3(0.275,0.389,1.000);
    
    // vec2 st = gl_FragCoord.xy/u_resolution.xy;
    // st.x *= u_resolution.x/u_resolution.y;
    vec2 st = vUv;
    st = st - 0.5;
    
    float len = length(st);
    float ang = atan(st.y, st.x) + M_PI;
    
    // Blurry circle -----------
    // Size and radius of circle
    float innerR = 0.38;
    float outerR = 0.45;
    float blendR = 0.05;
    float circ = smoothstep(innerR - blendR, innerR + blendR, len) - smoothstep(outerR - blendR, outerR + blendR, len);
    
    // Size of circle opening
    float startA = mod(-time * speed, 2.0 * M_PI);
    float endA = mod(-time * speed + barSize, 2.0 * M_PI);
    float blendA = 0.1;
    
    float blendL = smoothstep(startA - blendA, startA + blendA, endA);
    float blendRi = 1.0 - blendL;
    float gap = (blendL * (step(startA, ang) - step(endA, ang))) + (blendRi * (step(-ang, -startA) + step(ang, endA)));
    
    vec3 outerColor = circ * gap * barColor;
    
    // Sharp circle -----------
    float innerRS = 0.4;
    float outerRS = 0.43;
    float circS = step(innerRS, len) - step(outerRS, len);
    
    float startAS = startA + 0.05;
    float endAS = endA - 0.05;
    
    float blendLS = step(startAS, endAS);
    float blendRiS = 1.0 - blendLS;
    float gapS = (blendLS * (step(startAS, ang) - step(endAS, ang))) + (blendRiS * (step(-ang, -startAS) + step(ang, endAS)));
    
    vec3 mainColor = circS * gapS * vec3(0.532,0.622,1.000);
    
    gl_FragColor = vec4(outerColor + mainColor, 1.0);
}
