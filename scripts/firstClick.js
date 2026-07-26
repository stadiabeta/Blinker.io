export const FirstClick = {
    initialized: false,

    init(sfx) {
        if (this.initialized || !sfx) return;

        const reloadAudioOnInteraction = () => {
            if (typeof sfx.playBgMusic === 'function') {
                sfx.playBgMusic();
            }

            window.removeEventListener('click', reloadAudioOnInteraction);
            window.removeEventListener('touchstart', reloadAudioOnInteraction);
        };

        window.addEventListener('click', reloadAudioOnInteraction, { once: true, passive: true });
        window.addEventListener('touchstart', reloadAudioOnInteraction, { once: true, passive: true });

        this.initialized = true;
    }
};
