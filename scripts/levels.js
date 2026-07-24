export const Levels = {
    level: 1,
    xp: 0,
    lastHitXpTime: 0,
    BASE_XP: 500,
    XP_GROWTH: 1.18,
    HIT_XP_BASE: 50,
    BLINKER_XP_BASE: 200,
    XP_INCREASE_PER_LEVEL: 6,
    BLINKER_INCREASE_PER_LEVEL: 12,
    HIT_XP_COOLDOWN_MS: 20000,

    init() {
        const savedLevel = localStorage.getItem('blinker-level');
        const savedXp = localStorage.getItem('blinker-xp');
        const savedLastHitXp = localStorage.getItem('blinker-last-hit-xp');

        if (savedLevel !== null) {
            this.level = parseInt(savedLevel, 10) || 1;
        }

        if (savedXp !== null) {
            this.xp = parseInt(savedXp, 10) || 0;
        }

        if (savedLastHitXp !== null) {
            this.lastHitXpTime = parseInt(savedLastHitXp, 10) || 0;
        }

        this.xp = Math.max(0, this.xp);
        this.level = Math.max(1, this.level);
        this.lastHitXpTime = Math.max(0, this.lastHitXpTime);
        this.updateDisplay();
    },

    getXpForCurrentLevel() {
        return Math.floor(this.BASE_XP * Math.pow(this.XP_GROWTH, this.level - 1));
    },

    getHitXp() {
        return this.HIT_XP_BASE + (this.level - 1) * this.XP_INCREASE_PER_LEVEL;
    },

    getRandomHitXp() {
        return 90;
    },

    getBlinkerXp() {
        return this.BLINKER_XP_BASE + (this.level - 1) * this.BLINKER_INCREASE_PER_LEVEL;
    },

    canGainHitXp() {
        return Date.now() - this.lastHitXpTime >= this.HIT_XP_COOLDOWN_MS;
    },

    addHitXp() {
        if (!this.canGainHitXp()) {
            return false;
        }

        this.lastHitXpTime = Date.now();
        this.addXp(this.getHitXp());
        this.save();
        return true;
    },

    addRandomHitXp() {
        this.addXp(this.getRandomHitXp());
    },

    addBlinkerXp() {
        this.addXp(this.getBlinkerXp());
    },

    addXp(amount) {
        this.xp += amount;
        while (this.xp >= this.getXpForCurrentLevel()) {
            this.xp -= this.getXpForCurrentLevel();
            this.level += 1;
        }
        this.save();
    },

    save() {
        localStorage.setItem('blinker-level', this.level);
        localStorage.setItem('blinker-xp', this.xp);
        localStorage.setItem('blinker-last-hit-xp', this.lastHitXpTime);
    },

    updateDisplay(levelValueElement, levelBarFillElement, levelXpTextElement) {
        if (levelValueElement) {
            levelValueElement.textContent = this.level;
        }

        const requiredXp = this.getXpForCurrentLevel();
        const progressPercent = requiredXp > 0 ? Math.min(100, Math.round((this.xp / requiredXp) * 100)) : 0;

        if (levelBarFillElement) {
            levelBarFillElement.style.width = `${progressPercent}%`;
        }

        if (levelXpTextElement) {
            levelXpTextElement.textContent = `${this.xp} / ${requiredXp} XP`;
        }
    }
};
