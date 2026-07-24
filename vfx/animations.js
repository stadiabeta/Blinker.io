// Animation Management Module

export const Animations = {
    // Apply active state animation to orb
    activateOrb(orb) {
        orb.classList.add('active');
    },

    // Remove active state animation from orb
    deactivateOrb(orb) {
        orb.classList.remove('active');
    },

    // Trigger blink animation sequence
    triggerBlink(orb, duration = 0.5) {
        return new Promise((resolve) => {
            // Quick blink sequence
            const blinkCount = Math.floor(duration * 4); // Multiple blinks
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

    // Pop animation for hit counter
    popCounter(element) {
        element.classList.add('pop');
        setTimeout(() => element.classList.remove('pop'), 200);
    },

    // Start green smoky filter effect (persists until stopped)
    startGreenFilter() {
        // Remove any existing filter first
        const existing = document.getElementById('green-filter');
        if (existing) existing.remove();

        const filter = document.createElement('div');
        filter.id = 'green-filter';
        filter.className = 'green-filter active';
        document.body.appendChild(filter);
        return filter;
    },

    // Stop green smoky filter effect
    stopGreenFilter() {
        const filter = document.getElementById('green-filter');
        if (filter) {
            filter.classList.remove('active');
            setTimeout(() => filter.remove(), 500);
        }
    },

    // Pulse orb once for visual feedback
    pulseFeedback(orb) {
        orb.classList.add('pulse-once');
        setTimeout(() => orb.classList.remove('pulse-once'), 500);
    }
};
