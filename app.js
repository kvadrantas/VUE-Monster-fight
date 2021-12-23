function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0
        }
    },
    computed: {
        monsterBarStyles() {
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyles() {
            return {width: this.playerHealth + '%'}
        },
        canUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            const damageValue = getRandomValue(5, 12);
            if(this.monsterHealth - damageValue < 0) {
                this.monsterHealth = 0;
            } else {
                this.monsterHealth -= damageValue;
            }
            this.attackPlayer();
        },
        attackPlayer() {
            const damageValue = getRandomValue(8, 15);
            if(this.playerHealth - damageValue < 0) {
                this.playerHealth = 0
            } else {
                this.playerHealth -= damageValue;
            }
        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandomValue(8, 20);
            if(this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.attackPlayer();
        },
        specialAttackMonster() {
            this.currentRound++;
            this.monsterHealth -= getRandomValue(10, 25);
            this.attackPlayer();
        }
    },
});

app.mount('#game');