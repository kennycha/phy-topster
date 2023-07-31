uniform float uOrder;

varying vec2 vUv;

void main() {
  vec2 newPosition = vec2(position);
  
  vec4 modelPosition = modelMatrix * vec4(newPosition, position.z, 1.0);
  gl_Position = projectionMatrix * viewMatrix * modelPosition;

  vec2 newUv = vec2(uv.x * 15.0 / 17.0 + 0.0285, uv.y * 15.0 / 17.0 + 0.0285);

  vec2 finalUv = vec2(newUv.x, newUv.y);

  // @TODO Texture Sprite 개선..
  if (uOrder == 0.0) {
    finalUv.x = finalUv.x * 0.2 + 0.0295;
    finalUv.y = finalUv.y * 0.2 + 0.767;
  } else if (uOrder == 1.0) {
    finalUv.x = finalUv.x * 0.2 + 0.2165;
    finalUv.y = finalUv.y * 0.2 + 0.767;
  } else if (uOrder == 2.0) {
    finalUv.x = finalUv.x * 0.2 + 0.4037;
    finalUv.y = finalUv.y * 0.2 + 0.767;
  } else if (uOrder == 3.0) {
    finalUv.x = finalUv.x * 0.2 + 0.5908;
    finalUv.y = finalUv.y * 0.2 + 0.767;
  } else if (uOrder == 4.0) {
    finalUv.x = finalUv.x * 0.2 + 0.7778;
    finalUv.y = finalUv.y * 0.2 + 0.767;
  } else if (uOrder == 5.0) {
    finalUv.x = finalUv.x * 0.2 + 0.0295;
    finalUv.y = finalUv.y * 0.2 + 0.569;
  } else if (uOrder == 6.0) {
    finalUv.x = finalUv.x * 0.2 + 0.2165;
    finalUv.y = finalUv.y * 0.2 + 0.569;
  } else if (uOrder == 7.0) {
    finalUv.x = finalUv.x * 0.2 + 0.4037;
    finalUv.y = finalUv.y * 0.2 + 0.575;
  } else if (uOrder == 8.0) {
    finalUv.x = finalUv.x * 0.2 + 0.5908;
    finalUv.y = finalUv.y * 0.2 + 0.569;
  } else if (uOrder == 9.0) {
    finalUv.x = finalUv.x * 0.2 + 0.7778;
    finalUv.y = finalUv.y * 0.2 + 0.569;
  } else if (uOrder == 10.0) {
    finalUv.x = finalUv.x * 0.16 + 0.036;
    finalUv.y = finalUv.y * 0.16 + 0.41;
  } else if (uOrder == 11.0) {
    finalUv.x = finalUv.x * 0.16 + 0.188;
    finalUv.y = finalUv.y * 0.16 + 0.41;
  } else if (uOrder == 12.0) {
    finalUv.x = finalUv.x * 0.16 + 0.345;
    finalUv.y = finalUv.y * 0.16 + 0.41;
  } else if (uOrder == 13.0) {
    finalUv.x = finalUv.x * 0.16 + 0.4995;
    finalUv.y = finalUv.y * 0.16 + 0.41;
  } else if (uOrder == 14.0) {
    finalUv.x = finalUv.x * 0.16 + 0.658;
    finalUv.y = finalUv.y * 0.16 + 0.41;
  } else if (uOrder == 15.0) {
    finalUv.x = finalUv.x * 0.16 + 0.81;
    finalUv.y = finalUv.y * 0.16 + 0.41;
  } else if (uOrder == 16.0) {
    finalUv.x = finalUv.x * 0.16 + 0.034;
    finalUv.y = finalUv.y * 0.16 + 0.242;
  } else if (uOrder == 17.0) {
    finalUv.x = finalUv.x * 0.16 + 0.188;
    finalUv.y = finalUv.y * 0.16 + 0.238;
  } else if (uOrder == 18.0) {
    finalUv.x = finalUv.x * 0.16 + 0.345;
    finalUv.y = finalUv.y * 0.16 + 0.238;
  } else if (uOrder == 19.0) {
    finalUv.x = finalUv.x * 0.16 + 0.4995;
    finalUv.y = finalUv.y * 0.16 + 0.238;
  } else if (uOrder == 20.0) {
    finalUv.x = finalUv.x * 0.16 + 0.658;
    finalUv.y = finalUv.y * 0.16 + 0.238;
  } else if (uOrder == 21.0) {
    finalUv.x = finalUv.x * 0.16 + 0.81;
    finalUv.y = finalUv.y * 0.16 + 0.238;
  } else if (uOrder == 22.0) {
    finalUv.x = finalUv.x * 0.1 + 0.0325;
    finalUv.y = finalUv.y * 0.1 + 0.139;
  } else if (uOrder == 23.0) {
    finalUv.x = finalUv.x * 0.1 + 0.1254;
    finalUv.y = finalUv.y * 0.1 + 0.139;
  } else if (uOrder == 24.0) {
    finalUv.x = finalUv.x * 0.1 + 0.2184;
    finalUv.y = finalUv.y * 0.1 + 0.139;
  } else if (uOrder == 25.0) {
    finalUv.x = finalUv.x * 0.1 + 0.311;
    finalUv.y = finalUv.y * 0.1 + 0.139;
  } else if (uOrder == 26.0) {
    finalUv.x = finalUv.x * 0.1 + 0.4042;
    finalUv.y = finalUv.y * 0.1 + 0.139;
  } else if (uOrder == 27.0) {
    finalUv.x = finalUv.x * 0.1 + 0.497;
    finalUv.y = finalUv.y * 0.1 + 0.139;
  } else if (uOrder == 28.0) {
    finalUv.x = finalUv.x * 0.1 + 0.5901;
    finalUv.y = finalUv.y * 0.1 + 0.139;
  } else if (uOrder == 29.0) {
    finalUv.x = finalUv.x * 0.1 + 0.6835;
    finalUv.y = finalUv.y * 0.1 + 0.139;
  } else if (uOrder == 30.0) {
    finalUv.x = finalUv.x * 0.1 + 0.7758;
    finalUv.y = finalUv.y * 0.1 + 0.139;
  } else if (uOrder == 31.0) {
    finalUv.x = finalUv.x * 0.1 + 0.8689;
    finalUv.y = finalUv.y * 0.1 + 0.139;
  } else if (uOrder == 32.0) {
    finalUv.x = finalUv.x * 0.1 + 0.0325;
    finalUv.y = finalUv.y * 0.1 + 0.037;
  } else if (uOrder == 33.0) {
    finalUv.x = finalUv.x * 0.1 + 0.1254;
    finalUv.y = finalUv.y * 0.1 + 0.037;
  } else if (uOrder == 34.0) {
    finalUv.x = finalUv.x * 0.1 + 0.2184;
    finalUv.y = finalUv.y * 0.1 + 0.037;
  } else if (uOrder == 35.0) {
    finalUv.x = finalUv.x * 0.1 + 0.311;
    finalUv.y = finalUv.y * 0.1 + 0.037;
  } else if (uOrder == 36.0) {
    finalUv.x = finalUv.x * 0.1 + 0.4042;
    finalUv.y = finalUv.y * 0.1 + 0.037;
  } else if (uOrder == 37.0) {
    finalUv.x = finalUv.x * 0.1 + 0.497;
    finalUv.y = finalUv.y * 0.1 + 0.037;
  } else if (uOrder == 38.0) {
    finalUv.x = finalUv.x * 0.1 + 0.5901;
    finalUv.y = finalUv.y * 0.1 + 0.037;
  } else if (uOrder == 39.0) {
    finalUv.x = finalUv.x * 0.1 + 0.6835;
    finalUv.y = finalUv.y * 0.1 + 0.037;
  } else if (uOrder == 40.0) {
    finalUv.x = finalUv.x * 0.1 + 0.7758;
    finalUv.y = finalUv.y * 0.1 + 0.037;
  } else if (uOrder == 41.0) {
    finalUv.x = finalUv.x * 0.1 + 0.8689;
    finalUv.y = finalUv.y * 0.1 + 0.037;
  }
  
  vUv = finalUv;
}