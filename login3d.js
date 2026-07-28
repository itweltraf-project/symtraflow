/* Symtraflow - 3D Weltraf Transformer Login Background Engine (Three.js WebGL) */

(function () {
  let scene, camera, renderer, transformerGroup, particleSystem;
  let mouseX = 0, mouseY = 0;
  let targetRotationX = 0, targetRotationY = 0;
  let container, canvas;

  function createWeltrafPlaqueTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 160;
    const ctx = canvas.getContext('2d');

    // Dark metallic plate background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Border
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 8;
    ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

    // WELTRAF Logo
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 68px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('WELTRAF', canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  function createModelNumberTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#1e293b';
    ctx.font = '900 64px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText('2018-50-H', canvas.width - 20, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  function buildTransformer3D() {
    transformerGroup = new THREE.Group();

    // 1. MAIN TANK BODY
    const tankGeo = new THREE.BoxGeometry(3.4, 2.6, 2.0);
    const tankMat = new THREE.MeshStandardMaterial({
      color: 0x333842,
      metalness: 0.85,
      roughness: 0.25
    });
    const tankMesh = new THREE.Mesh(tankGeo, tankMat);
    tankMesh.castShadow = true;
    tankMesh.receiveShadow = true;
    transformerGroup.add(tankMesh);

    // 2. CORRUGATED RADIATOR FINS (Front & Back)
    const finMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.8,
      roughness: 0.3
    });
    const numFins = 18;
    const finWidth = 0.08;
    const finHeight = 2.2;
    const finDepth = 0.35;
    const startX = -1.45;
    const stepX = (2.9) / (numFins - 1);

    for (let i = 0; i < numFins; i++) {
      const x = startX + i * stepX;
      // Front fin
      const finFront = new THREE.Mesh(new THREE.BoxGeometry(finWidth, finHeight, finDepth), finMat);
      finFront.position.set(x, 0, 1.05);
      transformerGroup.add(finFront);

      // Back fin
      const finBack = new THREE.Mesh(new THREE.BoxGeometry(finWidth, finHeight, finDepth), finMat);
      finBack.position.set(x, 0, -1.05);
      transformerGroup.add(finBack);
    }

    // 3. TANK TOP COVER & BASE RAILS
    const topCover = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 0.15, 2.2),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2 })
    );
    topCover.position.y = 1.375;
    transformerGroup.add(topCover);

    const baseRailMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9 });
    const baseRail1 = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.25, 2.4), baseRailMat);
    baseRail1.position.set(-1.0, -1.425, 0);
    const baseRail2 = baseRail1.clone();
    baseRail2.position.x = 1.0;
    transformerGroup.add(baseRail1);
    transformerGroup.add(baseRail2);

    // 4. WELTRAF PLAQUE
    const plaqueMat = new THREE.MeshStandardMaterial({
      map: createWeltrafPlaqueTexture(),
      metalness: 0.5,
      roughness: 0.3
    });
    const plaqueMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.5), plaqueMat);
    plaqueMesh.position.set(0, 0.5, 1.24);
    transformerGroup.add(plaqueMesh);

    // MODEL CODE TEXT (2018-50-H)
    const modelTextMat = new THREE.MeshBasicMaterial({
      map: createModelNumberTexture(),
      transparent: true,
      opacity: 0.85
    });
    const modelTextMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.4), modelTextMat);
    modelTextMesh.position.set(0.7, -0.85, 1.24);
    transformerGroup.add(modelTextMesh);

    // 5. HIGH VOLTAGE BUSHINGS (3 Red Ceramic Insulators on Top)
    const ceramicMat = new THREE.MeshStandardMaterial({
      color: 0x991b1b,
      metalness: 0.15,
      roughness: 0.1, // Glossy ceramic
    });
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.9,
      roughness: 0.2
    });
    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.1
    });

    const bushingPositions = [-1.0, 0, 1.0];

    bushingPositions.forEach(xPos => {
      const bushingGroup = new THREE.Group();
      bushingGroup.position.set(xPos, 1.45, 0);

      // Base Flange
      const baseFlange = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.18, 16), brassMat);
      baseFlange.position.y = 0.09;
      bushingGroup.add(baseFlange);

      // Stacked Ceramic Conical Sheds (Rings)
      const numSheds = 6;
      for (let s = 0; s < numSheds; s++) {
        const shedY = 0.25 + s * 0.18;
        const radiusBottom = 0.24 - s * 0.015;
        const radiusTop = 0.14 - s * 0.01;
        const shed = new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, 0.14, 16), ceramicMat);
        shed.position.y = shedY;
        bushingGroup.add(shed);

        // Skirt lip ring
        const skirt = new THREE.Mesh(new THREE.TorusGeometry(radiusBottom, 0.03, 8, 16), ceramicMat);
        skirt.rotation.x = Math.PI / 2;
        skirt.position.y = shedY - 0.04;
        bushingGroup.add(skirt);
      }

      // Top Brass Cap & Copper Terminal Rod
      const topCap = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.15, 16), brassMat);
      topCap.position.y = 1.35;
      bushingGroup.add(topCap);

      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.4, 8), copperMat);
      rod.position.y = 1.55;
      bushingGroup.add(rod);

      transformerGroup.add(bushingGroup);
    });

    // 6. OIL CONSERVATOR TANK (Top-Left)
    const conservatorMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.3 });
    const conservator = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 1.4, 16), conservatorMat);
    conservator.rotation.z = Math.PI / 2;
    conservator.position.set(-1.1, 1.85, -0.6);
    transformerGroup.add(conservator);

    // Support pipes
    const pipe1 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.4), brassMat);
    pipe1.position.set(-1.4, 1.6, -0.6);
    const pipe2 = pipe1.clone();
    pipe2.position.x = -0.8;
    transformerGroup.add(pipe1);
    transformerGroup.add(pipe2);

    scene.add(transformerGroup);
  }

  function buildParticleSystem() {
    const particleCount = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorChoices = [
      new THREE.Color('#f87171'), // Red spark
      new THREE.Color('#fbbf24'), // Amber spark
      new THREE.Color('#60a5fa'), // Blue arc
      new THREE.Color('#ffffff')  // White glow
    ];

    for (let i = 0; i < particleCount; i++) {
      // Position around top bushings
      positions[i * 3] = (Math.random() - 0.5) * 3.5;
      positions[i * 3 + 1] = 1.2 + Math.random() * 2.0;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2.0;

      const col = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    particleSystem = new THREE.Points(geometry, particleMat);
    scene.add(particleSystem);
  }

  function init3DScene() {
    container = document.getElementById('loginRightPanel');
    canvas = document.getElementById('login3dCanvas');

    if (!container || !canvas || typeof THREE === 'undefined') return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 600;

    // SCENE
    scene = new THREE.Scene();

    // CAMERA
    camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 7.8);

    // RENDERER
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0x334155, 1.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.5);
    mainLight.position.set(5, 8, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    // Red Rim Accent Light (Matching Crimson Weltraf Theme)
    const redLight = new THREE.PointLight(0xef4444, 4.0, 10);
    redLight.position.set(2, 3, 2);
    scene.add(redLight);

    // Blue Counter Rim Light
    const blueLight = new THREE.PointLight(0x3b82f6, 2.5, 10);
    blueLight.position.set(-3, -1, 2);
    scene.add(blueLight);

    // BUILD OBJECTS
    buildTransformer3D();
    buildParticleSystem();

    // MOUSE PARALLAX LISTENERS
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);

    // ANIMATION LOOP
    animate();
  }

  function onMouseMove(e) {
    const halfW = window.innerWidth / 2;
    const halfH = window.innerHeight / 2;
    mouseX = (e.clientX - halfW) / halfW;
    mouseY = (e.clientY - halfH) / halfH;
  }

  function onWindowResize() {
    if (!container || !camera || !renderer) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.001;

    if (transformerGroup) {
      // Smooth lerp rotation based on mouse
      targetRotationY = mouseX * 0.4 + Math.sin(time * 0.4) * 0.08;
      targetRotationX = mouseY * 0.25;

      transformerGroup.rotation.y += (targetRotationY - transformerGroup.rotation.y) * 0.05;
      transformerGroup.rotation.x += (targetRotationX - transformerGroup.rotation.x) * 0.05;
      
      // Floating Y oscillation
      transformerGroup.position.y = Math.sin(time * 1.2) * 0.08 - 0.2;
    }

    if (particleSystem) {
      particleSystem.rotation.y = time * 0.1;
      const positions = particleSystem.geometry.attributes.position.array;
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3 + 1] += Math.sin(time + i) * 0.003;
        if (positions[i * 3 + 1] > 3.5) {
          positions[i * 3 + 1] = 1.2;
        }
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3DScene);
  } else {
    init3DScene();
  }
})();
