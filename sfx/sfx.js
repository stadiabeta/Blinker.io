
export const SFX = {
    bgMusic: null,
    smokeLoop: null,
    exhale: null,

    clickSound: null,

    init() {
        this.bgMusic = new Audio('sfx/bgm-lowered.mp3');
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.3;

        this.smokeLoop = new Audio('sfx/smoking.mp3');
        this.smokeLoop.loop = true;
        this.smokeLoop.volume = 0.4;

        this.exhale = new Audio('sfx/exhale.mp3');
        this.exhale.volume = 0.5;

        this.clickSound = new Audio('sfx/click.mp3');
        this.clickSound.volume = 0.4;

        this.playBgMusic();
    },

    playBgMusic() {
        if (this.bgMusic && this.bgMusic.paused) {
            this.bgMusic.play().catch(() => {
                console.log('Background music will play on user interaction');
            });
        }
    },

    stopBgMusic() {
        if (this.bgMusic && !this.bgMusic.paused) {
            this.bgMusic.pause();
        }
    },

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

    stopSmokeLoop() {
        if (this.smokeLoop && !this.smokeLoop.paused) {
            this.smokeLoop.pause();
            this.smokeLoop.currentTime = 0;
        }
    },

    playExhale() {
        if (this.exhale) {
            this.exhale.currentTime = 0;
            this.exhale.play().catch(() => {
                console.log('Exhale sound will play on user interaction');
            });
        }
    },

    setBgMusicVolume(volume) {
        if (this.bgMusic) {
            this.bgMusic.volume = Math.max(0, Math.min(1, volume));
        }
    },

    setSmokeSoundVolume(volume) {
        if (this.smokeLoop) {
            this.smokeLoop.volume = Math.max(0, Math.min(1, volume));
        }
    },

    playSettingsClick() {
        if (this.clickSound) {
            this.clickSound.currentTime = 0;
            this.clickSound.play().catch(() => {
                console.log('Settings click sound will play on user interaction');
            });
        }
    }
};
