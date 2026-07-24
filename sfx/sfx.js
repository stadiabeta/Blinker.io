// Sound Effects Management Module

export const SFX = {
    // Audio elements
    bgMusic: null,
    smokeLoop: null,
    exhale: null,

    clickSound: null,

    // Initialize all audio
    init() {
        // Background music
        this.bgMusic = new Audio('sfx/bgm-lowered.mp3');
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.3;

        // Smoking sound effect
        this.smokeLoop = new Audio('sfx/smoking.mp3');
        this.smokeLoop.loop = true;
        this.smokeLoop.volume = 0.4;

        // Exhale sound effect
        this.exhale = new Audio('sfx/exhale.mp3');
        this.exhale.volume = 0.5;

        // Settings click sound effect
        this.clickSound = new Audio('sfx/click.mp3');
        this.clickSound.volume = 0.4;

        // Auto-play background music
        this.playBgMusic();
    },

    // Play background music
    playBgMusic() {
        if (this.bgMusic && this.bgMusic.paused) {
            this.bgMusic.play().catch(() => {
                // Browser may require user interaction before audio plays
                console.log('Background music will play on user interaction');
            });
        }
    },

    // Stop background music
    stopBgMusic() {
        if (this.bgMusic && !this.bgMusic.paused) {
            this.bgMusic.pause();
        }
    },

    // Start smoking sound loop
    startSmokeLoop() {
        if (this.smokeLoop) {
            if (this.smokeLoop.paused) {
                this.smokeLoop.currentTime = 0;
                this.smokeLoop.play().catch(() => {
                    console.log('Smoke loop will play on user interaction');
                });
            }
        }
    },

    // Stop smoking sound loop
    stopSmokeLoop() {
        if (this.smokeLoop && !this.smokeLoop.paused) {
            this.smokeLoop.pause();
            this.smokeLoop.currentTime = 0;
        }
    },

    // Play exhale sound effect
    playExhale() {
        if (this.exhale) {
            this.exhale.currentTime = 0;
            this.exhale.play().catch(() => {
                console.log('Exhale sound will play on user interaction');
            });
        }
    },

    // Set background music volume
    setBgMusicVolume(volume) {
        if (this.bgMusic) {
            this.bgMusic.volume = Math.max(0, Math.min(1, volume));
        }
    },

    // Set smoke loop volume
    setSmokeSoundVolume(volume) {
        if (this.smokeLoop) {
            this.smokeLoop.volume = Math.max(0, Math.min(1, volume));
        }
    },

    // Play settings button click sound effect
    playSettingsClick() {
        if (this.clickSound) {
            this.clickSound.currentTime = 0;
            this.clickSound.play().catch(() => {
                console.log('Settings click sound will play on user interaction');
            });
        }
    }
};
