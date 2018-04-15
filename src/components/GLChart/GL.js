import * as THREE from 'three';
import './OrbitControls';
import './QuickHull';
import './ConvexGeometry';

export default class GL {
  constructor() {
    this.renderer = null;
    this.controls = null;
    this.camera = null;
    this.el = null;
    this.scene = null;
    this.light = null;
    this.dimensions = {
      x: 0,
      y: 0,
    };
    this.resizeListener = () => {
      this.resize();
    };

    this.init = this.init.bind(this);
    this.resize = this.resize.bind(this);
    this.render = this.render.bind(this);
  }

  setAutoRotate(autoRotate) {
    this.controls.autoRotate = autoRotate;
  }

  init(canvas, dataSet, baseColor) {
    const color = new THREE.Color(baseColor);
    const luminance = new THREE.Color(baseColor);

    luminance.sub(new THREE.Color(0x333333));


    if (!canvas) {
      return;
    }
    this.el = canvas;

    window.addEventListener('resize', this.resizeListener);

    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0xffffff);
    this.scene.fog = new THREE.Fog(0x00ffffff, 80, 170);

    this.dimensions.x = this.el.offsetWidth;
    this.dimensions.y = this.el.offsetHeight;

    this.camera = new THREE.PerspectiveCamera(
      45,
      this.el.offsetWidth / this.el.offsetHeight,
      0.1,
      1000,
    );
    this.camera.position.set(0, 0, 120);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(this.el.offsetWidth, this.el.offsetHeight);
    // TODO: use stronger antialiasing / higher pixel ratio?
    this.renderer.setPixelRatio(1.5);

    this.controls = new THREE.OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    this.controls.dampingFactor = 0.05;
    this.controls.rotateSpeed = 0.15;
    this.controls.autoRotate = false;
    this.controls.autoRotateSpeed = 0.5;

    const radiusOut = 30;
    // const radiusIn = 24;
    const segments = 64;
    const rings = 32;


    const spheroid = this.constructor.distribute(dataSet.length, false);

    const skillsVertices = spheroid.map(vertex => new THREE.Vector3(...vertex));
    const envelopeVertices = spheroid.map(vertex => new THREE.Vector3(...vertex));

    const labelSprites = dataSet.map(entry => this.constructor.renderText(entry.name));

    // const innerSphereGeometry = new THREE.SphereGeometry(radiusIn, segments, rings);
    const outerSphereGeometry = new THREE.SphereGeometry(radiusOut, segments, rings);

    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00999999,
      depthTest: true,
      depthWrite: false,
      wireframe: true,
      transparent: true,
      opacity: 0.05,
      fog: true,
    });

    const darkWireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x111111,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
      fog: false,
    });

    const flatMaterial = new THREE.MeshLambertMaterial({
      color: color.getHex(),
      emissive: luminance.getHex(),
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
      fog: false,
    });

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xFF0099,
      fog: false,
    });

    const outerSphere = new THREE.Mesh(outerSphereGeometry, wireframeMaterial);
    // const innerSphere = new THREE.Mesh(innerSphereGeometry, wireframeMaterial);

    this.scene.add(outerSphere);
    // this.scene.add(innerSphere);

    if (dataSet.length > 4) {
      const skillsGeometry = new THREE.ConvexGeometry(skillsVertices);
      const envelopeGeometry = new THREE.ConvexGeometry(envelopeVertices);

      skillsGeometry.dynamic = true;
      skillsGeometry.vertices = skillsGeometry
        .vertices
        .map((vertex, index) => vertex.multiplyScalar(dataSet[index].value));
      const skillsCloud = new THREE.Mesh(skillsGeometry, flatMaterial);
      skillsCloud.scale.set(radiusOut, radiusOut, radiusOut);

      const envelope = new THREE.Mesh(envelopeGeometry, darkWireframeMaterial);
      envelope.scale.set(radiusOut, radiusOut, radiusOut);

      const spikesVertices = envelope.geometry.vertices.slice();
      const spikesGeometry = new THREE.Geometry();

      spikesVertices.forEach((vertex, index) => {
        spikesGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
        spikesGeometry.vertices.push(vertex);
        labelSprites[index].position.set(vertex.x * 40, vertex.y * 40, vertex.z * 40);
        labelSprites[index].scale.set(36.0, 36.0, 36.0);
        this.scene.add(labelSprites[index]);
      });

      const spikes = new THREE.LineSegments(spikesGeometry, lineMaterial);
      spikes.scale.set(40, 40, 40);

      this.scene.add(skillsCloud);
      this.scene.add(envelope);
      this.scene.add(spikes);
    }

    this.light = new THREE.DirectionalLight(0xffffff, 1);
    this.scene.add(this.light);
    this.light.position.set(0, 0, 150);

    this.render();
  }

  static distribute(samples, randomize) {
    let rnd = 1.0;
    if (randomize) {
      rnd = Math.random() * samples;
    }

    const points = [];
    const offset = 2.0 / samples;
    const increment = Math.PI * (3.0 - Math.sqrt(5.0));

    let i = 0;
    let r = 0;
    let x = 0;
    let y = 0;
    let z = 0;
    let phi = 0;

    for (; i < samples; i += 1) {
      y = ((i * offset) - 1) + (offset / 2);
      r = Math.sqrt(1 - (y ** 2));

      phi = ((i + rnd) % samples) * increment;

      x = Math.cos(phi) * r;
      z = Math.sin(phi) * r;

      points.push([x, y, z]);
    }

    return points;
  }

  resize() {
    if (this.camera && this.renderer) {
      this.camera.aspect = this.el.offsetWidth / this.el.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.el.offsetWidth, this.el.offsetHeight);
      this.dimensions.x = this.el.offsetWidth;
      this.dimensions.y = this.el.offsetHeight;
    }
  }

  static renderText(text, textureSize = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = textureSize;
    canvas.height = textureSize;

    const context = canvas.getContext('2d');
    context.font = '64px Abel, Arial Narrow, sans-serif';
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillStyle = '#222222';
    context.fillText(text.toUpperCase(), textureSize / 2, textureSize / 2);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      fog: true,
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    return sprite;
  }

  render() {
    if (!this.renderer) {
      return;
    }
    if (this.el.offsetWidth !== this.dimensions.x || this.el.height !== this.dimensions.y) {
      this.resize();
    }

    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
    this.light.position.copy(this.camera.position);
  }

  teardown() {
    if (this.renderer) {
      try {
        this.renderer.forceContextLoss();
      } catch (e) {
        console.debug(e);
      }
      window.removeEventListener('resize', this.resizeListener);
      this.renderer.context = null;
      this.renderer.domElement = null;
      this.renderer = null;
    }
  }
}
