// Settings Modal Management

export const Settings = {
    modalOpen: false,
    version: '1.2.1',

    init(sound) {
        this.sound = sound;
        const settingsBtn = document.getElementById('settingsBtn');
        const settingsModal = document.getElementById('settingsModal');
        const closeModalBtn = document.getElementById('closeModalBtn');

        // Set version display
        document.getElementById('versionDisplay').textContent = this.version;

        // Hide stats container by default
        const statsContainer = document.querySelector('.stats-container');
        statsContainer.classList.remove('visible');

        // Open modal
        settingsBtn.addEventListener('click', () => {
            this.sound?.playSettingsClick();
            this.openModal();
        });

        // Close modal
        closeModalBtn.addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal when clicking outside
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) {
                this.closeModal();
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modalOpen) {
                this.closeModal();
            }
        });
    },

    openModal() {
        this.modalOpen = true;
        const modal = document.getElementById('settingsModal');
        const statsContainer = document.querySelector('.stats-container');
        
        modal.classList.add('active');
        statsContainer.classList.remove('visible');
    },

    closeModal() {
        this.modalOpen = false;
        const modal = document.getElementById('settingsModal');
        const statsContainer = document.querySelector('.stats-container');
        
        modal.classList.remove('active');
        statsContainer.classList.remove('visible');
    },

    updateStatsInModal(hits, longestHit, playtimeSeconds, blinkersTaken) {
        document.getElementById('modalHitCounter').textContent = hits;
        document.getElementById('modalLongestHit').textContent = longestHit.toFixed(2) + 's';

        const modalPlaytime = document.getElementById('modalPlaytime');
        const modalBlinkers = document.getElementById('modalBlinkers');

        if (modalPlaytime) {
            const hours = Math.floor(playtimeSeconds / 3600);
            const minutes = Math.floor((playtimeSeconds % 3600) / 60);
            modalPlaytime.textContent = `${hours}h ${minutes.toString().padStart(2, '0')}m`;
        }

        if (modalBlinkers) {
            modalBlinkers.textContent = blinkersTaken;
        }
    }
};
