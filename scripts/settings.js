// Settings Modal Management

export const Settings = {
    modalOpen: false,
    version: '1.0.0',

    init() {
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

    updateStatsInModal(hits, longestHit) {
        document.getElementById('modalHitCounter').textContent = hits;
        document.getElementById('modalLongestHit').textContent = longestHit.toFixed(2) + 's';
    }
};
