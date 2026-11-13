(() => {
  // Dark mode only.
  const root = document.documentElement;
  root.setAttribute('data-theme', 'dark');
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) themeColorMeta.setAttribute('content', '#121214');

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Typing animation in the hero description.
  const typed = document.getElementById('typed');
  const phrases = [
    'what happens under the silicon.',
    'microkernels that don\'t compromise.',
    'firmware that actually behaves.',
    'why it works on my desk but not yours.'
  ];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typed) {
    if (reducedMotion) {
      typed.textContent = phrases[0];
    } else {
      let phraseIndex = 0;
      let charIndex = 0;
      let deleting = false;

      const tick = () => {
        const phrase = phrases[phraseIndex];
        charIndex += deleting ? -1 : 1;
        typed.textContent = phrase.slice(0, charIndex);

        let delay = deleting ? 30 : 65;
        if (!deleting && charIndex === phrase.length) {
          delay = 2200; // pause on full phrase
          deleting = true;
        } else if (deleting && charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          delay = 400;
        }
        setTimeout(tick, delay);
      };
      tick();
    }
  }

  // =========================================================================
  // Mountain Expedition Simulation Stage: Real-Time Cursor Tracking & Physics
  // =========================================================================
  const heroSection = document.getElementById('hero-section');
  const stageCard = document.getElementById('climber-stage-card');
  const stageCanvas = document.getElementById('stage-canvas-wrap');
  const climberGroup = document.getElementById('climber-group');
  const climberHead = document.getElementById('climber-neck-head');

  if (stageCard && stageCanvas) {
    let targetTurn = 0;
    let targetLookX = 0;
    let targetLookY = 0;
    let targetLean = 0;
    let currentTurn = 0;
    let currentLookX = 0;
    let currentLookY = 0;
    let currentLean = 0;
    let animFrame = null;
    let isTracking = false;

    const updateStagePhysics = () => {
      // Smooth damped spring interpolation
      currentTurn += (targetTurn - currentTurn) * 0.18;
      currentLookX += (targetLookX - currentLookX) * 0.22;
      currentLookY += (targetLookY - currentLookY) * 0.22;
      currentLean += (targetLean - currentLean) * 0.14;

      stageCard.style.setProperty('--head-turn', `${currentTurn.toFixed(2)}deg`);
      stageCard.style.setProperty('--look-x', `${currentLookX.toFixed(2)}px`);
      stageCard.style.setProperty('--look-y', `${currentLookY.toFixed(2)}px`);
      stageCard.style.setProperty('--body-lean', `${currentLean.toFixed(2)}deg`);

      const delta = Math.abs(targetTurn - currentTurn) +
                    Math.abs(targetLookX - currentLookX) +
                    Math.abs(targetLookY - currentLookY) +
                    Math.abs(targetLean - currentLean);

      if (isTracking || delta > 0.04) {
        animFrame = requestAnimationFrame(updateStagePhysics);
      } else {
        animFrame = null;
      }
    };

    const scheduleUpdate = () => {
      if (!animFrame) {
        animFrame = requestAnimationFrame(updateStagePhysics);
      }
    };

    const handlePointerMove = (event) => {
      if (event.pointerType === 'touch') return;
      const refElem = climberHead || stageCanvas;
      const rect = refElem.getBoundingClientRect();
      const headCenterX = rect.left + rect.width / 2;
      const headCenterY = rect.top + rect.height / 2;

      const dx = event.clientX - headCenterX;
      const dy = event.clientY - headCenterY;
      const dist = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);

      // Natural bounds for head turn and gaze
      targetTurn = Math.max(-28, Math.min(28, dx / 15));
      const maxGaze = Math.min(2.8, dist / 28);
      targetLookX = Math.cos(angle) * maxGaze;
      targetLookY = Math.sin(angle) * Math.min(2.2, maxGaze);
      targetLean = Math.max(-5, Math.min(5, dx / 60));

      isTracking = true;
      scheduleUpdate();
    };

    const resetPointer = () => {
      targetTurn = 0;
      targetLookX = 0;
      targetLookY = 0;
      targetLean = 0;
      isTracking = false;
      scheduleUpdate();
    };

    // Track across hero section and canvas
    if (heroSection) {
      heroSection.addEventListener('pointermove', handlePointerMove);
      heroSection.addEventListener('pointerleave', resetPointer);
    }
    stageCanvas.addEventListener('pointermove', handlePointerMove);

    // Interactive startle test on click
    let startleTimer;
    stageCard.addEventListener('click', () => {
      if (!reducedMotion) {
        stageCard.classList.remove('is-startled');
        void stageCard.offsetWidth; // reflow
        stageCard.classList.add('is-startled');
        clearTimeout(startleTimer);
        startleTimer = setTimeout(() => {
          stageCard.classList.remove('is-startled');
        }, 900);
      }
    });
  }

  // =========================================================================
  // Project Status Filter Logic
  // =========================================================================
  const projectFilters = document.querySelectorAll('.project-filter');
  const projectCards = document.querySelectorAll('.project-card[data-status]');
  const projectFilterStatus = document.getElementById('project-filter-status');

  if (projectFilters.length && projectCards.length) {
    const counts = { all: projectCards.length, ongoing: 0, completed: 0 };
    projectCards.forEach((card) => {
      if (Object.prototype.hasOwnProperty.call(counts, card.dataset.status)) {
        counts[card.dataset.status] += 1;
      }
    });

    projectFilters.forEach((button) => {
      const count = counts[button.dataset.filter];
      const countNode = button.querySelector('.filter-count');
      if (countNode && typeof count === 'number') countNode.textContent = String(count);
    });

    const applyFilter = (filter, activeButton) => {
      projectFilters.forEach((button) => button.setAttribute('aria-pressed', String(button === activeButton)));
      projectCards.forEach((card) => {
        card.hidden = filter !== 'all' && card.dataset.status !== filter;
      });
      if (projectFilterStatus) {
        const count = counts[filter] || 0;
        projectFilterStatus.textContent = filter === 'all'
          ? `Showing all ${count} projects.`
          : `Showing ${count} ${filter} ${count === 1 ? 'project' : 'projects'}.`;
      }
    };

    projectFilters.forEach((button) => {
      button.addEventListener('click', () => applyFilter(button.dataset.filter, button));
    });
  }

  // =========================================================================
  // Floating Interactive Note
  // =========================================================================
  const note = document.getElementById('floating-note');
  const noteText = document.getElementById('note-text');
  const close = document.getElementById('note-close');
  const messages = [
    'Psst. The details matter.',
    'Built by learning out loud.',
    'Yes, I read the datasheet. Eventually.',
    'Works on my board™.'
  ];
  let messageIndex = 0;
  let dismissed = false;

  if (note && noteText) {
    note.addEventListener('click', (event) => {
      if (event.target === close || dismissed) return;
      messageIndex = (messageIndex + 1) % messages.length;
      noteText.textContent = messages[messageIndex];
    });
  }
  if (close && note) {
    close.addEventListener('click', (event) => {
      event.stopPropagation();
      dismissed = true;
      note.classList.add('hidden');
    });
  }

  // Helper for placeholder links during setup
  document.querySelectorAll('a[href*="YOUR_"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (link.getAttribute('href').includes('YOUR_')) {
        event.preventDefault();
        const label = link.textContent.trim() || 'This link';
        if (noteText && note) {
          noteText.textContent = `Setup needed: replace the placeholder for ${label}.`;
          note.classList.remove('hidden');
          dismissed = false;
        }
      }
    });
  });
})();
