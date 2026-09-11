/**
 * ANKIT MAITY — PORTFOLIO JAVASCRIPT ENGINE
 * Features:
 * - Preloader orchestration
 * - Interactive custom cursor & magnetic button physics
 * - Dynamic cycling role rotator
 * - Interactive Hero Ambient Canvas with delicate drifting geometric particles
 * - Skills interactive filtering & dynamic tooltips
 * - LUMBO Realtime 2D stylized racing simulation canvas
 * - Candy Crush Mini interactive playable tile match grid
 * - Interactive Worldbuilding Pipeline state switcher
 * - Interactive Particle & Kinetic Spark Physics sandbox
 * - Realtime local clock
 * - Form client-side validation & feedback
 * - Modal dialog managers with accessible focus traps
 * - Smooth scroll & active navigation spy
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. PRELOADER & INITIAL LOAD
  initPreloader();

  // 2. CUSTOM CURSOR & MAGNETIC BUTTONS
  initCursorAndMagnetic();

  // 3. STICKY NAVBAR & NAVIGATION SCROLL SPY
  initNavigation();

  // 4. HERO CYCLING ROLE ROTATOR
  initRoleRotator();

  // 5. HERO AMBIENT CANVAS BACKGROUND
  initHeroCanvas();

  // 6. 3D CARD TILT EFFECT (Vanilla Math)
  initTiltCards();

  // 7. SKILLS FILTERING
  initSkillsFilter();

  // 8. LUMBO REALTIME RACING CANVAS SIMULATION
  initLumboSimulation();

  // 9. CANDY CRUSH MINI INTERACTIVE BOARD
  initCandyCrushMini();

  // 10. WORLDBUILDING PRODUCTION PIPELINE
  initWorldbuildingPipeline();

  // 11. PARTICLE & GRAVITY SANDBOX
  initParticleSandbox();

  // 12. LOCAL CLOCK
  initLocalClock();

  // 13. CONTACT FORM VALIDATION & HANDLING
  initContactForm();

  // 14. MODAL DIALOGS
  initModals();
});

/* --------------------------------------------------------------------------
   1. PRELOADER
   -------------------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const progressBar = document.getElementById('preloaderProgress');
  if (!preloader || !progressBar) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 25) + 15;
    if (progress > 100) progress = 100;
    progressBar.style.width = `${progress}%`;

    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 350);
    }
  }, 90);
}

/* --------------------------------------------------------------------------
   2. CUSTOM CURSOR & MAGNETIC BUTTONS
   -------------------------------------------------------------------------- */
function initCursorAndMagnetic() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  // Smooth lerp for outer ring
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Hover state detection
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, .skill-pill, .candy-tile, .pipeline-step');
  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // Magnetic button physics for designated buttons
  const magneticButtons = document.querySelectorAll('.magnetic-btn');
  magneticButtons.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* --------------------------------------------------------------------------
   3. NAVIGATION & SCROLL SPY
   -------------------------------------------------------------------------- */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Spy active section tracking
    let currentId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 180;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   4. CYCLING ROLE ROTATOR
   -------------------------------------------------------------------------- */
function initRoleRotator() {
  const roleItems = document.querySelectorAll('.role-item');
  if (roleItems.length === 0) return;

  let currentIndex = 0;
  setInterval(() => {
    const currentEl = roleItems[currentIndex];
    currentEl.classList.remove('active');
    currentEl.classList.add('exit');

    setTimeout(() => {
      currentEl.classList.remove('exit');
    }, 500);

    currentIndex = (currentIndex + 1) % roleItems.length;
    const nextEl = roleItems[currentIndex];
    nextEl.classList.add('active');
  }, 2600);
}

/* --------------------------------------------------------------------------
   5. HERO AMBIENT CANVAS BACKGROUND
   -------------------------------------------------------------------------- */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];
  let mouse = { x: -1000, y: -1000 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  }

  function createParticles() {
    particles = [];
    const count = Math.floor((width * height) / 18000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        alpha: Math.random() * 0.35 + 0.15,
        shape: Math.random() > 0.6 ? 'star' : 'circle'
      });
    }
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  resize();

  function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse gentle repulse
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        const force = (140 - dist) / 140;
        p.x -= (dx / dist) * force * 1.8;
        p.y -= (dy / dist) * force * 1.8;
      }

      ctx.fillStyle = `rgba(194, 109, 83, ${p.alpha})`;

      if (p.shape === 'star') {
        drawStar(p.x, p.y, 4, p.radius * 2.2, p.radius * 1.1);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   6. 3D CARD TILT EFFECT (Vanilla Math)
   -------------------------------------------------------------------------- */
function initTiltCards() {
  const tiltCards = document.querySelectorAll('[data-tilt]');
  if (window.innerWidth < 768) return; // Skip on mobile for performance

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* --------------------------------------------------------------------------
   7. SKILLS FILTERING
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const tabs = document.querySelectorAll('.skill-tab');
  const cards = document.querySelectorAll('.skill-category-card');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      cards.forEach((card) => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   8. LUMBO REALTIME RACING CANVAS SIMULATION
   -------------------------------------------------------------------------- */
function initLumboSimulation() {
  const canvas = document.getElementById('lumboCanvas');
  const turboBtn = document.getElementById('lumboTurboBtn');
  const weatherBtn = document.getElementById('lumboToggleWeather');
  const speedVal = document.getElementById('simSpeedVal');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  let isRaining = false;
  let turboBoost = false;
  let speed = 128;
  let t = 0; // track parametric position

  // Track loop control points (smooth bezier-like oval racetrack)
  function getTrackPoint(progress) {
    const angle = progress * Math.PI * 2;
    const a = w * 0.38;
    const b = h * 0.32;
    // Stylized asymmetric kidney track loop
    const r = (a + Math.sin(angle * 3) * 28);
    const x = w / 2 + Math.cos(angle) * r;
    const y = h / 2 + Math.sin(angle) * (b + Math.cos(angle * 2) * 18);
    return { x, y };
  }

  // Rain particles
  let raindrops = [];
  for (let i = 0; i < 40; i++) {
    raindrops.push({
      x: Math.random() * w,
      y: Math.random() * h,
      length: Math.random() * 12 + 8,
      speed: Math.random() * 8 + 12
    });
  }

  // Tire smoke trails
  let skidMarks = [];

  if (turboBtn) {
    turboBtn.addEventListener('click', () => {
      turboBoost = !turboBoost;
      turboBtn.textContent = turboBoost ? '🔥 Turbo: ACTIVE' : '🚀 Boost Speed';
      turboBtn.style.background = turboBoost ? '#C26D53' : '';
    });
  }

  if (weatherBtn) {
    weatherBtn.addEventListener('click', () => {
      isRaining = !isRaining;
      weatherBtn.textContent = isRaining ? '☀️ Clear Mode' : '🌧️ Weather Mode';
    });
  }

  function renderLumbo() {
    ctx.clearRect(0, 0, w, h);

    // Track asphalt base background
    ctx.fillStyle = '#161412';
    ctx.fillRect(0, 0, w, h);

    // Subtle track grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Draw the racing track road
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
      const pt = getTrackPoint(i / 100);
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    }
    ctx.closePath();

    // Road outer border
    ctx.strokeStyle = '#322D29';
    ctx.lineWidth = 56;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Road surface
    ctx.strokeStyle = '#221F1C';
    ctx.lineWidth = 48;
    ctx.stroke();

    // Center dotted line
    ctx.strokeStyle = '#B48B57';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 12]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Update car position
    const currentSpeed = turboBoost ? 218 : 132;
    if (speedVal) {
      speedVal.textContent = `${currentSpeed + Math.floor(Math.sin(t * 10) * 4)} km/h`;
    }

    const stepSpeed = turboBoost ? 0.006 : 0.0035;
    t = (t + stepSpeed) % 1;

    const carPos = getTrackPoint(t);
    const nextPos = getTrackPoint((t + 0.01) % 1);
    const carAngle = Math.atan2(nextPos.y - carPos.y, nextPos.x - carPos.x);

    // Tire smoke particle emission
    skidMarks.push({
      x: carPos.x - Math.cos(carAngle) * 12,
      y: carPos.y - Math.sin(carAngle) * 12,
      alpha: 0.6
    });

    // Draw tire skid / dust marks
    for (let i = skidMarks.length - 1; i >= 0; i--) {
      const s = skidMarks[i];
      ctx.fillStyle = `rgba(220, 200, 180, ${s.alpha})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, 4, 0, Math.PI * 2);
      ctx.fill();
      s.alpha -= 0.03;
      if (s.alpha <= 0) {
        skidMarks.splice(i, 1);
      }
    }

    // Draw the race car (Stylized geometric chassis)
    ctx.save();
    ctx.translate(carPos.x, carPos.y);
    ctx.rotate(carAngle);

    // Car Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.beginPath();
    ctx.roundRect(-16, -10, 32, 20, 4);
    ctx.fill();

    // Wheels
    ctx.fillStyle = '#1A1A1A';
    ctx.fillRect(-12, -12, 7, 3);
    ctx.fillRect(8, -12, 7, 3);
    ctx.fillRect(-12, 9, 7, 3);
    ctx.fillRect(8, 9, 7, 3);

    // Main Car Body (Warm terracotta red)
    ctx.fillStyle = turboBoost ? '#E05A36' : '#C26D53';
    ctx.beginPath();
    ctx.roundRect(-14, -8, 28, 16, 5);
    ctx.fill();

    // Windshield & Roof
    ctx.fillStyle = '#1E1A17';
    ctx.beginPath();
    ctx.roundRect(-5, -5, 12, 10, 2);
    ctx.fill();

    // Racing stripe
    ctx.fillStyle = '#FAF7F2';
    ctx.fillRect(-14, -1.5, 28, 3);

    // Headlight glow cones
    ctx.fillStyle = 'rgba(255, 240, 200, 0.22)';
    ctx.beginPath();
    ctx.moveTo(14, -6);
    ctx.lineTo(48, -16);
    ctx.lineTo(48, 16);
    ctx.lineTo(14, 6);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    // Weather mode rendering
    if (isRaining) {
      ctx.strokeStyle = 'rgba(160, 200, 240, 0.4)';
      ctx.lineWidth = 1.2;
      raindrops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 4, drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;
        drop.x -= 1.5;
        if (drop.y > h) {
          drop.y = -10;
          drop.x = Math.random() * w;
        }
      });
    }

    requestAnimationFrame(renderLumbo);
  }

  requestAnimationFrame(renderLumbo);
}

/* --------------------------------------------------------------------------
   9. CANDY CRUSH MINI INTERACTIVE BOARD
   -------------------------------------------------------------------------- */
function initCandyCrushMini() {
  const board = document.getElementById('candyBoard');
  const scoreDisplay = document.getElementById('candyScore');
  const matchesDisplay = document.getElementById('candyMatches');
  const resetBtn = document.getElementById('candyResetBtn');
  if (!board) return;

  const rows = 5;
  const cols = 6;
  const candies = ['🍓', '🍋', '🍇', '🍏', '🍬', '🍊'];
  let grid = [];
  let score = 2450;
  let matchesCount = 12;
  let selectedTile = null;

  function generateRandomBoard() {
    grid = [];
    board.innerHTML = '';

    for (let r = 0; r < rows; r++) {
      grid[r] = [];
      for (let c = 0; c < cols; c++) {
        const candy = candies[Math.floor(Math.random() * candies.length)];
        grid[r][c] = candy;

        const tile = document.createElement('button');
        tile.className = 'candy-tile';
        tile.textContent = candy;
        tile.setAttribute('data-row', r);
        tile.setAttribute('data-col', c);
        tile.setAttribute('aria-label', `Tile at row ${r + 1}, column ${c + 1}`);

        tile.addEventListener('click', () => handleTileClick(r, c, tile));
        board.appendChild(tile);
      }
    }
  }

  function handleTileClick(r, c, tileElement) {
    if (!selectedTile) {
      // First selection
      selectedTile = { r, c, el: tileElement };
      tileElement.classList.add('selected');
    } else {
      // Second selection -> check adjacency
      const dr = Math.abs(selectedTile.r - r);
      const dc = Math.abs(selectedTile.c - c);

      if ((dr === 1 && dc === 0) || (dr === 0 && dc === 1)) {
        // Swap candies
        const temp = grid[selectedTile.r][selectedTile.c];
        grid[selectedTile.r][selectedTile.c] = grid[r][c];
        grid[r][c] = temp;

        selectedTile.el.textContent = grid[selectedTile.r][selectedTile.c];
        tileElement.textContent = grid[r][c];

        // Award combo points
        score += 150;
        matchesCount += 1;
        if (scoreDisplay) scoreDisplay.textContent = score.toLocaleString();
        if (matchesDisplay) matchesDisplay.textContent = matchesCount;

        // Feedback bounce animation
        tileElement.style.transform = 'scale(1.3) rotate(-10deg)';
        selectedTile.el.style.transform = 'scale(1.3) rotate(10deg)';
        setTimeout(() => {
          tileElement.style.transform = '';
          if (selectedTile) selectedTile.el.style.transform = '';
        }, 220);
      }

      selectedTile.el.classList.remove('selected');
      selectedTile = null;
    }
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      generateRandomBoard();
      score += 50;
      if (scoreDisplay) scoreDisplay.textContent = score.toLocaleString();
    });
  }

  generateRandomBoard();
}

/* --------------------------------------------------------------------------
   10. WORLDBUILDING PRODUCTION PIPELINE
   -------------------------------------------------------------------------- */
function initWorldbuildingPipeline() {
  const steps = document.querySelectorAll('.pipeline-step');
  const badge = document.getElementById('pipelinePhaseBadge');
  const title = document.getElementById('pipelinePhaseTitle');
  const desc = document.getElementById('pipelinePhaseDesc');
  const deliverables = document.getElementById('pipelineDeliverables');
  if (!steps.length || !title || !desc) return;

  const stageData = [
    {
      badge: 'Stage 01 • Conceptualization',
      title: 'Idea: Identifying Core Emotional Loop',
      desc: "Defining the core spark: Is it high-speed drift tension (LUMBO) or the calming satisfaction of matching geometric colors (Candy Crush Mini)? Establishing what makes the player want to press 'restart'.",
      chips: ['Core Loop Diagrams', 'Emotional Tone Palette', 'Player Motivation Pillars']
    },
    {
      badge: 'Stage 02 • Aesthetics & Architecture',
      title: 'Design: Visual Hierarchy & Spatial Grid',
      desc: 'Translating concepts into clean Figma wireframes, contrast-tested HUD components, pixel scales, and vehicle silhouettes before writing a single line of game engine code.',
      chips: ['HUD Mockups', 'Color Blind Testing', 'Typography Systems', 'Figma Prototyping']
    },
    {
      badge: 'Stage 03 • The Engine',
      title: 'Mechanics: Pure Physics & Matrix Algorithms',
      desc: 'Writing frame-rate independent game loops, steering drift friction curves, collision vectors, and recursive board cascade scanners.',
      chips: ['Vector Physics', 'Matrix Arrays', 'Entity State Machines', 'Collision Math']
    },
    {
      badge: 'Stage 04 • Motion & Emotion',
      title: 'Animation: Breathing Life into Pixels',
      desc: 'Implementing squash-and-stretch on candy impacts, camera follow lag on acceleration, exhaust dust trails, and procedural shaking.',
      chips: ['Cubic Bezier Easing', 'Dynamic Camera Lag', 'Particle Emitters', 'Audio Feedback']
    },
    {
      badge: 'Stage 05 • Hands-on Testing',
      title: 'Play: User Testing & Touch Ergonomics',
      desc: 'Validating control ergonomics across desktop arrow keys and mobile touch gestures. Eliminating frustrating input deadzones and fine-tuning difficulty curves.',
      chips: ['Touch Ergonomics', 'Multi-Viewport Testing', 'Input Latency Profiling', 'Difficulty Tuning']
    },
    {
      badge: 'Stage 06 • The Final 10%',
      title: 'Polish: Micro-Delights & Tactile Texture',
      desc: 'The difference between a tech demo and a memorable game: adding sound synthesis frequencies, subtle surface grain, victory particle bursts, and seamless restart transitions.',
      chips: ['Web Audio API Synthesizers', 'Haptic Micro-Moments', '60 FPS Optimization', 'Final Art Polish']
    }
  ];

  steps.forEach((step) => {
    step.addEventListener('click', () => {
      steps.forEach((s) => s.classList.remove('active'));
      step.classList.add('active');

      const stageIndex = parseInt(step.getAttribute('data-stage'), 10);
      const data = stageData[stageIndex];
      if (!data) return;

      badge.textContent = data.badge;
      title.textContent = data.title;
      desc.textContent = data.desc;

      deliverables.innerHTML = '';
      data.chips.forEach((chipText) => {
        const span = document.createElement('span');
        span.className = 'd-chip';
        span.textContent = chipText;
        deliverables.appendChild(span);
      });
    });
  });
}

/* --------------------------------------------------------------------------
   11. PARTICLE & GRAVITY SANDBOX
   -------------------------------------------------------------------------- */
function initParticleSandbox() {
  const canvas = document.getElementById('sandboxCanvas');
  const clearBtn = document.getElementById('clearParticlesBtn');
  const gravityBtn = document.getElementById('gravityToggleBtn');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let gravity = 0.22;
  let gravityEnabled = true;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = canvas.width = rect.width;
    height = canvas.height = 260;
  }
  resize();
  window.addEventListener('resize', resize);

  function spawnBurst(x, y) {
    const colors = ['#C26D53', '#FAF7F2', '#B48B57', '#607567', '#D9822B'];
    for (let i = 0; i < 18; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: Math.random() * 0.015 + 0.008
      });
    }
  }

  // Mouse interaction
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (Math.random() > 0.4) {
      particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        radius: Math.random() * 3.5 + 1.5,
        color: '#FAF7F2',
        life: 1,
        decay: 0.02
      });
    }
  });

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    spawnBurst(e.clientX - rect.left, e.clientY - rect.top);
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      particles = [];
    });
  }

  if (gravityBtn) {
    gravityBtn.addEventListener('click', () => {
      gravityEnabled = !gravityEnabled;
      gravityBtn.textContent = gravityEnabled ? 'Toggle Gravity: ON' : 'Toggle Gravity: OFF';
    });
  }

  // Initial greeting burst
  setTimeout(() => spawnBurst(width / 2, height / 2), 600);

  function loop() {
    ctx.fillStyle = 'rgba(28, 25, 23, 0.28)';
    ctx.fillRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];

      if (gravityEnabled) {
        p.vy += gravity;
      }

      p.x += p.vx;
      p.y += p.vy;

      // Floor bounce
      if (p.y + p.radius > height) {
        p.y = height - p.radius;
        p.vy *= -0.65;
      }
      // Wall bounce
      if (p.x - p.radius < 0 || p.x + p.radius > width) {
        p.vx *= -0.7;
      }

      p.life -= p.decay;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (p.life <= 0) {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

/* --------------------------------------------------------------------------
   12. LOCAL CLOCK
   -------------------------------------------------------------------------- */
function initLocalClock() {
  const clockVal = document.getElementById('clockVal');
  if (!clockVal) return;

  function update() {
    const now = new Date();
    // Indian Standard Time formatting (or user local)
    const timeString = now.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    clockVal.textContent = `${timeString} IST`;
  }
  update();
  setInterval(update, 1000);
}

/* --------------------------------------------------------------------------
   13. CONTACT FORM VALIDATION & HANDLING
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const messageInput = document.getElementById('userMessage');
  const statusDiv = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;

    // Name check
    const nameError = document.getElementById('nameError');
    if (!nameInput.value.trim()) {
      nameError.textContent = 'Please enter your name.';
      valid = false;
    } else {
      nameError.textContent = '';
    }

    // Email check
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      emailError.textContent = 'Please provide a valid email address.';
      valid = false;
    } else {
      emailError.textContent = '';
    }

    // Message check
    const messageError = document.getElementById('messageError');
    if (!messageInput.value.trim() || messageInput.value.trim().length < 8) {
      messageError.textContent = 'Please write a brief message (minimum 8 characters).';
      valid = false;
    } else {
      messageError.textContent = '';
    }

    if (!valid) return;

    // Simulate sending state
    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Sending Message...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.querySelector('span').textContent = 'Send Message';
      form.reset();

      statusDiv.className = 'form-status success';
      statusDiv.textContent = '✦ Thank you! Your message has been sent. Ankit will get back to you shortly.';
      statusDiv.style.display = 'block';

      setTimeout(() => {
        statusDiv.style.display = 'none';
      }, 6000);
    }, 1200);
  });
}

/* --------------------------------------------------------------------------
   14. MODAL DIALOGS
   -------------------------------------------------------------------------- */
function initModals() {
  const triggers = document.querySelectorAll('.interactive-demo-trigger');
  const closeButtons = document.querySelectorAll('[data-close]');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const targetId = trigger.getAttribute('data-target');
      const modal = document.getElementById(targetId);
      if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-close');
      const modal = document.getElementById(targetId);
      if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.project-modal.active');
      if (activeModal) {
        activeModal.classList.remove('active');
        activeModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    }
  });
}
