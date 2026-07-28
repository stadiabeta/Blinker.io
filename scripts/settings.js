
export const Settings = {
    modalOpen: false,
    version: '1.3.1',

    init(sound) {
        this.sound = sound;
        const settingsBtn = document.getElementById('settingsBtn');
        const settingsModal = document.getElementById('settingsModal');
        const closeModalBtn = document.getElementById('closeModalBtn');

        document.getElementById('versionDisplay').textContent = this.version;

        const statsContainer = document.querySelector('.stats-container');
        statsContainer.classList.remove('visible');

        this.addFooterLinks();

        settingsBtn.addEventListener('click', () => {
            this.sound?.playSettingsClick();
            this.openModal();
        });

        closeModalBtn.addEventListener('click', () => {
            this.closeModal();
        });

        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) {
                this.closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modalOpen) {
                this.closeModal();
            }
        });
    },

    footerButtons: [
        {
            id: 'changelogBtn',
            label: 'Changelog',
            href: 'changelog.txt',
            color: 'var(--accent-green, #22c55e)',
            colorHover: '#222'
        },
        {
            id: 'tosBtn',
            label: 'TOS',
            href: 'credits.txt',
            color: 'var(--accent-lime, #84cc16)',
            colorHover: '#222'
        }
    ],

    addFooterLinks() {
        const settingsModal = document.getElementById('settingsModal');
        const modalContent = settingsModal 
            ? settingsModal.querySelector('.modal-content')
            : null;

        if (!modalContent) return;

        let footer = modalContent.querySelector('.modal-footer');
        if (!footer) {
            footer = document.createElement('div');
            footer.className = 'modal-footer';
            Object.assign(footer.style, {
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                marginTop: '28px'
            });
            modalContent.appendChild(footer);
        }

        this.footerButtons.forEach(btnCfg => {
            if (!footer.querySelector(`#${btnCfg.id}`)) {
                const btn = document.createElement('a');
                btn.id = btnCfg.id;
                btn.textContent = btnCfg.label;
                btn.href = btnCfg.href;
                btn.target = '_blank';
                btn.rel = 'noopener noreferrer';
                btn.className = 'modal-link-btn';
                Object.assign(btn.style, {
                    padding: '8px 18px',
                    borderRadius: '24px',
                    background: btnCfg.color,
                    color: '#000',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '1rem',
                    transition: 'background 0.2s, color 0.2s'
                });
                btn.addEventListener('mouseover', () => { 
                    btn.style.background = btnCfg.colorHover; 
                    btn.style.color = '#fff';
                });
                btn.addEventListener('mouseout', () => { 
                    btn.style.background = btnCfg.color; 
                    btn.style.color = '#000';
                });

                footer.appendChild(btn);
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
