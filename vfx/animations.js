
export const Animations = {
    activateOrb(orb) {
        orb.classList.add('active');
    },

    deactivateOrb(orb) {
        orb.classList.remove('active');
    },

    triggerBlink(orb, duration = 0.5) {
        return new Promise((resolve) => {
            const blinkCount = Math.floor(duration * 4);
            let blinksCompleted = 0;

            const blinkInterval = setInterval(() => {
                orb.classList.toggle('blink');
                blinksCompleted++;

                if (blinksCompleted >= blinkCount) {
                    clearInterval(blinkInterval);
                    orb.classList.remove('blink');
                    resolve();
                }
            }, 150);
        });
    },

    popCounter(element) {
        element.classList.add('pop');
        setTimeout(() => element.classList.remove('pop'), 200);
    },

    startGreenFilter() {
        const existingFilter = document.getElementById('green-filter');
        if (existingFilter) existingFilter.remove();
        const existingLeaves = document.getElementById('falling-leaves-container');
        if (existingLeaves) existingLeaves.remove();
        const existingSmoke = document.getElementById('smoke-vfx-container');
        if (existingSmoke) existingSmoke.remove();

        const filter = document.createElement('div');
        filter.id = 'green-filter';
        filter.style.position = 'fixed';
        filter.style.top = 0;
        filter.style.left = 0;
        filter.style.width = '100vw';
        filter.style.height = '100vh';
        filter.style.background = 'rgba(35, 187, 59, 0.2)';
        filter.style.pointerEvents = 'none';
        filter.style.zIndex = 900000;
        document.body.appendChild(filter);

        const leavesContainer = document.createElement('div');
        leavesContainer.id = 'falling-leaves-container';
        leavesContainer.style.position = 'fixed';
        leavesContainer.style.top = 0;
        leavesContainer.style.left = 0;
        leavesContainer.style.width = '100vw';
        leavesContainer.style.height = '100vh';
        leavesContainer.style.pointerEvents = 'none';
        leavesContainer.style.zIndex = 900001;

        const leafImageSrc = 'resources/leaf.png';

        const numLeaves = 14;
        for (let i = 0; i < numLeaves; ++i) {
            const leaf = document.createElement('img');
            leaf.src = leafImageSrc;
            leaf.alt = 'Leaf';
            const size = 24 + Math.random() * 28;
            leaf.style.position = 'absolute';
            leaf.style.left = `${Math.random() * 100}%`;
            leaf.style.top = `${-10 - Math.random() * 10}%`;
            leaf.style.width = `${size}px`;
            leaf.style.height = 'auto';
            leaf.style.opacity = 0.87;
            leaf.style.transform = `rotate(${Math.random() * 360}deg)`;
            leaf.style.transition = 'none';
            leaf.style.userSelect = 'none';
            leaf.style.pointerEvents = 'none';
            const animDuration = 2.6 + Math.random() * 2.4;
            const animDelay = Math.random() * 0.85;
            const startRot = Math.random()*40-20;
            const endRot = Math.random()*70-35;
            const keyframes = [
                { transform: `rotate(${startRot}deg) translateY(0)` },
                { transform: `rotate(${endRot}deg) translateY(93vh)` }
            ];
            leaf.animate(keyframes, {
                duration: animDuration * 1000,
                delay: animDelay * 1000,
                iterations: Infinity,
                direction: 'normal',
                easing: 'ease-in'
            });

            leavesContainer.appendChild(leaf);
        }
        document.body.appendChild(leavesContainer);

        const smokeContainer = document.createElement('div');
        smokeContainer.id = 'smoke-vfx-container';
        smokeContainer.style.position = 'fixed';
        smokeContainer.style.top = 0;
        smokeContainer.style.left = 0;
        smokeContainer.style.width = '100vw';
        smokeContainer.style.height = '100vh';
        smokeContainer.style.pointerEvents = 'none';
        smokeContainer.style.zIndex = 900002;
        smokeContainer.style.mixBlendMode = 'lighter';

        const smokeImages = [
            'resources/vfx/smoke.gif',
            'resources/vfx/smoke.gif',
            'resources/vfx/smoke.gif'
        ];
        const numSmokes = 6;

        for (let i = 0; i < numSmokes; ++i) {
            const smoke = document.createElement('img');
            const smokeImgIdx = Math.floor(Math.random() * smokeImages.length);
            smoke.src = smokeImages[smokeImgIdx];
            smoke.alt = 'Smoke';
            const width = 220 + Math.random() * 180;
            const left = Math.random() * 80;
            const top = 5 + Math.random() * 65;
            smoke.style.position = 'absolute';
            smoke.style.left = `${left}vw`;
            smoke.style.top = `${top}vh`;
            smoke.style.width = `${width}px`;
            smoke.style.height = 'auto';
            smoke.style.opacity = 0.15 + Math.random() * 0.15;
            smoke.style.transition = 'opacity 2.7s linear, transform 10s linear';
            smoke.style.pointerEvents = 'none';
            smoke.style.userSelect = 'none';
            smoke.style.filter = `blur(${1 + Math.random() * 2}px)`;

            const driftDuration = 13 + Math.random() * 7;
            const waveAmount = 20 + Math.random() * 18;
            const startX = left;
            const endX = left + (Math.random() < 0.5 ? -waveAmount : waveAmount);
            const endY = top - 24 - Math.random() * 18;

            const keyframes = [
                { 
                    opacity: smoke.style.opacity,
                    transform: `translateX(0px) translateY(0px) scale(1)`,
                    filter: smoke.style.filter
                },
                { 
                    opacity: smoke.style.opacity,
                    offset: 0.3,
                    transform: `translateX(${endX - startX}px) translateY(${-Math.abs(endY - top)/2}px) scale(1.04)`,
                    filter: smoke.style.filter
                },
                { 
                    opacity: 0,
                    transform: `translateX(${endX - startX}px) translateY(${endY - top}px) scale(1.1)`,
                    filter: smoke.style.filter
                }
            ];
            const animation = smoke.animate(keyframes, {
                duration: driftDuration * 1000,
                delay: Math.random() * 4000,
                iterations: Infinity,
                direction: 'alternate',
                easing: 'ease-in-out'
            });

            smokeContainer.appendChild(smoke);
        }

        document.body.appendChild(smokeContainer);

        return { filter, leavesContainer, smokeContainer };
    },

    stopGreenFilter() {
        const filter = document.getElementById('green-filter');
        if (filter) {
            filter.style.transition = 'opacity 0.45s';
            filter.style.opacity = 0;
            setTimeout(() => filter.remove(), 500);
        }
        const leavesContainer = document.getElementById('falling-leaves-container');
        if (leavesContainer) {
            leavesContainer.style.transition = 'opacity 0.6s';
            leavesContainer.style.opacity = 0;
            setTimeout(() => leavesContainer.remove(), 600);
        }
        const smokeContainer = document.getElementById('smoke-vfx-container');
        if (smokeContainer) {
            smokeContainer.style.transition = 'opacity 1.2s';
            smokeContainer.style.opacity = 0;
            setTimeout(() => smokeContainer.remove(), 1200);
        }
    },

    pulseFeedback(orb) {
        orb.classList.add('pulse-once');
        setTimeout(() => orb.classList.remove('pulse-once'), 500);
    }
};
